export interface Episode {
  id: number;
  title: string;
  videoEmbedUrl: string;
  thumbnail?: string;
  duration?: string;
  season_id?: number;
  views_count?: number;
}

export interface Producer {
  name: string;
  logo: string;
  website?: string;
}

export interface Crew {
  producer?: Producer;
  writer?: number | string;
  director?: number | string;
  presenter?: number;
  cast?: number[];
}

export interface Show {
  uuid: string; // ✅ جديد، من API
  producer?: Producer;
  id: number;
  title: string;
  description: string;
  rating: number;
  genre: string;
  year: number;
  type: string;
  image?: string;   // poster_image من API
  cardimg?: string; // card_image من API
  crew?: Crew;
  episodes?: Episode[];
  videoEmbedUrl?: string; // للفيلم
  seasons?: number;
}
