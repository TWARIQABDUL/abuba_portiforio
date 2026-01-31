import Image from 'next/image';
import { Camera, Film, HardDrive, Laptop } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const gear = [
  { name: 'Sony FX3 & A7S III', icon: Camera },
  { name: 'DJI Mavic 3 Pro & FPV', icon: Film },
  { name: 'Davinci Resolve Studio', icon: Laptop },
  { name: 'High-Performance Storage', icon: HardDrive },
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-me');

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            About Rwanda Visuals
          </h1>
          <Separator className="my-6" />
          <div className="space-y-6 text-lg text-foreground/80">
            <h2 className="font-headline text-3xl font-bold">My Journey</h2>
            <p>
              With over five years of dedicated experience in the art of cinematic storytelling, I founded Rwanda Visuals to bring a unique and high-end perspective to videography. My journey began in the vibrant markets of Rwanda, where I honed my skills capturing the nation's rich culture, breathtaking landscapes, and compelling human stories.
            </p>
            <p>
              This foundation has since expanded to global projects, allowing me to work with a diverse range of clients and narratives. From intimate wedding films to large-scale commercials and impactful documentaries, my passion lies in creating visually stunning and emotionally resonant content that stands the test of time.
            </p>
            <p>
              At Rwanda Visuals, we believe every project is a collaboration. We work closely with our clients to understand their vision and bring it to life with technical excellence and creative flair.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-headline text-3xl font-bold mb-6">Gear &amp; Tech</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gear.map((item) => (
                <Card key={item.name} className="bg-secondary/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <item.icon className="h-8 w-8 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {aboutImage && (
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl md:h-full">
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                data-ai-hint={aboutImage.imageHint}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
