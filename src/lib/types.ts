export type ProjectCategory = 'Wedding' | 'Commercial' | 'Documentary';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  youtube_url: string;
  thumbnail_url: string;
  created_at: string;
};

export type AnalyticsEvent = {
  eventType: 'page_view' | 'video_play';
  url?: string;
  videoId?: string;
};
