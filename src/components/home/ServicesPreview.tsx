'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    title: 'Wedding Films',
    image: PlaceHolderImages.find(img => img.id === 'service-weddings'),
  },
  {
    title: 'Commercials',
    image: PlaceHolderImages.find(img => img.id === 'service-commercials'),
  },
  {
    title: 'Documentaries',
    image: PlaceHolderImages.find(img => img.id === 'service-documentaries'),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function ServicesPreview() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-screen-2xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20">
                {service.image && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      data-ai-hint={service.image.imageHint}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Crafting beautiful narratives that resonate and inspire.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
