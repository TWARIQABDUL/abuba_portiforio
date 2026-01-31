# **App Name**: Rwanda Visuals

## Core Features:

- Immersive Hero Video: A looping hero video on the home page to immediately engage visitors. A placeholder video will be used initially.
- Service Cards: Display services (Wedding Films, Commercials, Documentaries) through clean, visually appealing cards.
- Latest Work Showcase: A horizontal scrolling section to showcase the 3 most recent video projects.
- Responsive Video Gallery: A bento/masonry grid layout for the video gallery, adapting to different screen sizes. Filter videos by category.
- Lightbox Video Modal: Open videos in a responsive lightbox modal for an enhanced viewing experience using react-player.
- Admin Dashboard: A password-protected admin route (/admin) with Supabase Auth, to allow CRUD operations.
- Analytics Tool: The LLM acts as a tool which determines if a page_view or a video_play qualifies as an important event, which it logs in a Supabase table. The Admin dashboard provides 'Quick Stats': Total Site Views vs. Total Video Plays

## Style Guidelines:

- Primary color: Deep indigo (#4B0082), evocative of creative, visionary work and twilight.
- Background color: Light gray (#E0E0E0), providing a neutral canvas.
- Accent color: Muted violet (#8A2BE2), offering subtle contrast for interactive elements.
- Body text and headline font: 'Inter', a sans-serif with a modern and neutral appearance that will give the site a professional appearance
- Code font: 'Source Code Pro' for displaying code snippets.
- Use simple, minimalist icons for navigation and social media links.
- Implement a mobile-first, single-column flow that transitions to a 3 or 4-column grid on larger screens, with a maximum width of 1440px.
- Employ subtle, staggered reveal animations powered by Framer Motion for a polished feel.