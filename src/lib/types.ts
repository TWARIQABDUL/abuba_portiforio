export type ProjectCategory = 'Wedding' | 'Commercial' | 'Documentary';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  youtubeUrl: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailHint: string;
  description: string;
};
