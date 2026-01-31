import type { Project, ProjectCategory } from '@/lib/types';

const allProjects: Project[] = [
  {
    id: '1',
    title: 'Kigali Dreams',
    category: 'Commercial',
    youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    thumbnailUrl: 'https://picsum.photos/seed/project1/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'cinematic landscape',
    description: 'A visual journey through the vibrant streets of Kigali.',
  },
  {
    id: '2',
    title: 'Eternal Vows',
    category: 'Wedding',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    thumbnailUrl: 'https://picsum.photos/seed/project4/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'wedding film',
    description: 'Capturing a timeless love story in the heart of Rwanda.',
  },
  {
    id: '3',
    title: 'The Gorilla Guardians',
    category: 'Documentary',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    thumbnailUrl: 'https://picsum.photos/seed/project6/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'nature documentary',
    description: 'A documentary on the conservation efforts in the Virunga mountains.',
  },
  {
    id: '4',
    title: 'Nyungwe Mist',
    category: 'Documentary',
    youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    thumbnailUrl: 'https://picsum.photos/seed/project5/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'corporate video',
    description: 'Exploring the rich biodiversity of Nyungwe National Park.',
  },
  {
    id: '5',
    title: 'Innovate Rwanda',
    category: 'Commercial',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    thumbnailUrl: 'https://picsum.photos/seed/project2/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'drone shot',
    description: 'Showcasing the burgeoning tech scene in Rwanda.',
  },
  {
    id: '6',
    title: 'A Day to Remember',
    category: 'Wedding',
    youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    thumbnailUrl: 'https://picsum.photos/seed/project3/640/360',
    thumbnailWidth: 640,
    thumbnailHeight: 360,
    thumbnailHint: 'city night',
    description: 'A cinematic highlight of a beautiful wedding celebration.',
  },
];

// Mock function to simulate fetching the 3 latest projects
export const getLatestProjects = async (): Promise<Project[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(allProjects.slice(0, 3));
    }, 500);
  });
};

// Mock function to simulate fetching all projects
export const getAllProjects = async (): Promise<Project[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(allProjects);
    }, 500);
  });
};
