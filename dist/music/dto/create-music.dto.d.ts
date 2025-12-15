export declare class CreateMusicDto {
    title: string;
    artist: string;
    description: string;
    duration: number;
    categories: string[];
    audioUrl: string;
    imageUrl: string;
    plays?: number;
    isPremium?: boolean;
    order?: number;
    active?: boolean;
}
