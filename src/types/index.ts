export type PostImage ={
  date?: string;
  explanation?: string;
  hdurl?: string;
  media_type?: string;
  service_version?: string;
  title?: string;
  url?: string;
  render?: boolean;
  routeHome?: boolean;
};

export type RootStackParams = {
  Home: PostImage;
  Detail: PostImage;
  Search: PostImage;
  Favorites: PostImage;
  ImageFullScreen: PostImage;
}