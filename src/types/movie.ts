export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    popularity:number;
    tagline?: string;
    vote_count:number;
    genre_ids: number[];
    runtime?: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }