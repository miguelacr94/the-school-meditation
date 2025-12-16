export interface VideoItem {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    type: string;
    position: number;
    isPremium: boolean;
    isActive: boolean;
    views: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface VideoPage {
    videoList: VideoItem[];
    isPremium: boolean;
    totalCount: number;
    currentPage: number;
    totalPages: number;
}
