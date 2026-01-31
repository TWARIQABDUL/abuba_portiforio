'use client'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logEvent } from '@/app/admin/actions';

export function EventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only log event if pathname is defined and it's not an admin route
    if (pathname && !pathname.startsWith('/admin')) {
      logEvent({ eventType: 'page_view', url: pathname });
    }
  }, [pathname]);

  return null;
}
