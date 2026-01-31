import GalleryClient from '@/components/gallery/GalleryClient';
import { getAllProjects } from '@/lib/data';

export default async function GalleryPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:py-20">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Our Portfolio
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore a collection of our cinematic work.
        </p>
      </div>

      <div className="mt-12">
        <GalleryClient projects={projects} />
      </div>
    </div>
  );
}
