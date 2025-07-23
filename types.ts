export interface Photo {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  photos: Photo[];
}