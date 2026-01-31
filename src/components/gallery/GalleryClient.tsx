'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import type { Project, ProjectCategory } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import VideoLightbox from './VideoLightbox';
import { logEvent } from '@/app/admin/actions';

type GalleryClientProps = {
  projects: Project[];
};

const categories: ['All', ProjectCategory, ProjectCategory, ProjectCategory] = ['All', 'Wedding', 'Commercial', 'Documentary'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function GalleryClient({ projects }: GalleryClientProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.category === filter);
  }, [filter, projects]);

  const openLightbox = (project: Project) => {
    logEvent({ eventType: 'video_play', videoId: project.id });
    setSelectedProject(project);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <Tabs defaultValue="All" onValueChange={(value) => setFilter(value as ProjectCategory | 'All')}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div
          key={filter} // Re-trigger animation on filter change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              // Simple bento effect: make first item larger
              className={index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}
              onClick={() => openLightbox(project)}
            >
              <Card className="overflow-hidden group cursor-pointer h-full">
                <CardContent className="relative flex items-center justify-center p-0 h-full">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    data-ai-hint={project.thumbnailHint}
                    width={project.thumbnailWidth}
                    height={project.thumbnailHeight}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <PlayCircle className="h-16 w-16" />
                    <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                    <p className="text-sm">{project.category}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <VideoLightbox 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onOpenChange={(open) => !open && closeLightbox()}
      />
    </>
  );
}
