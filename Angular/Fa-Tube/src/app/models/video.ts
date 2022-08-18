export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
  madeForKids: boolean;
  embeddable: boolean;

}


export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
export interface InfoImage {
  url: string;
  width: number;
  height: number;

}
export interface Thumbnail {
  default: InfoImage;
  medium: InfoImage;
  high: InfoImage;

}
export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnail;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;

}

export interface IdInforBrieftVideoInList {
  kind: string;
  videoId: string;
}

export interface InforBrieftVideoInList {
  kind: string;
  etag: string;
  id: IdInforBrieftVideoInList;
  snippet: Snippet;

}



export interface ResponseDataSearch {
  error?: Error;
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: InforBrieftVideoInList[];
}


export interface DetailError {
  message: string;
  reason: string;
}
export interface Error {
  code: number;
  message: string;
  errors: DetailError[];
  status: string;
}
