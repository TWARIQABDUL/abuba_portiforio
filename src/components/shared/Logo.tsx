import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold tracking-tighter text-primary transition-colors hover:text-primary/80">
      Rwanda Visuals
    </Link>
  );
}
