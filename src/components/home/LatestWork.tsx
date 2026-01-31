import Image from 'next/image';
import Link from 'next/link';

import { getLatestProjects } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { createClient } from '@/lib/supabase/server';

export default async function LatestWork() {
  const supabase = createClient();
  const latestProjects = await getLatestProjects(supabase);

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Our Latest Work
          </h2>
          <Button asChild variant="link" className="text-primary">
            <Link href="/gallery">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {latestProjects.map(project => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden group">
                      <CardContent className="relative flex aspect-video items-center justify-center p-0">
                        <Image
                          src={project.thumbnail_url}
                          alt={project.title}
                          data-ai-hint="youtube video"
                          fill
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                           <h3 className="text-lg font-bold text-white">{project.title}</h3>
                           <p className="text-sm text-white/80">{project.category}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
