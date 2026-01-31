'use client';

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Project } from '@/lib/types';

interface VideoLightboxProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoLightbox({ project, isOpen, onOpenChange }: VideoLightboxProps) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="aspect-video">
          {hasWindow && (
            <ReactPlayer
              url={project.youtube_url}
              width="100%"
              height="100%"
              controls
              playing
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    autoplay: 1,
                  }
                }
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
