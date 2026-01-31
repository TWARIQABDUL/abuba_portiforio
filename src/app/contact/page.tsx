import { Mail, MapPin, Phone } from 'lucide-react';
import { Instagram, Youtube, Vimeo } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? Let&apos;s create something beautiful together.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">Kigali, Rwanda</p>
                <Badge variant="secondary" className="mt-2">Available for worldwide travel</Badge>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <a href="mailto:hello@rwandavisuals.com" className="text-muted-foreground hover:text-primary">
                  hello@rwandavisuals.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">+250 788 123 456</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex items-center gap-1 pt-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Vimeo">
                    <Vimeo className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
