import type { Project } from '@/lib/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getLatestProjects(supabase: SupabaseClient): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest projects:', error);
    return [];
  }
  return data as Project[];
};

export async function getAllProjects(supabase: SupabaseClient): Promise<Project[]> {
  return getProjects(supabase);
};

export async function getProjects(supabase: SupabaseClient): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data as Project[];
}

export async function getAnalytics(supabase: SupabaseClient) {
  const [
    { count: pageViews, error: pageViewsError },
    { count: videoPlays, error: videoPlaysError }
  ] = await Promise.all([
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_name', 'page_view'),
    supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event_name', 'video_play')
  ]);

  if (pageViewsError) console.error('Error fetching page views:', pageViewsError)
  if (videoPlaysError) console.error('Error fetching video plays:', videoPlaysError)

  return {
    pageViews: pageViews ?? 0,
    videoPlays: videoPlays ?? 0
  }
}
