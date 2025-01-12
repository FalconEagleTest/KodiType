export interface MediaItem {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    largeImageUrl: string;
    releaseDate: string;
    category: string;
    type: string;
    relatedListId?: number;
  }