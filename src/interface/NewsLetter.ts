// export interface iNewsListRequest {
//     search_year_category: string;
//     page?: number;
//     size?: number;
// }
// export interface iNewsListResponse {
//     count: number;
//     list: iNewsListItem[];
// }
// export interface iNewsListItem {
//     sbnl_idx: number;
//     thumbnail: string;
//     title: string;
//     created_at: string;
// }
// export interface iNewsinquiryRequest {
//     sbnl_idx: number;
// }
// export interface iNewsinquiryResponse {
//     title: string;
//     created_at: string;
//     content: string;
//     thumbnail: string;
//     prev_newsletter: iNewsPrev;
//     next_newsletter: iNewsNext;
// }

// export interface iNewsPrev {
//     prev_idx: number;
//     prev_title: string;
// }
// export interface iNewsNext {
//     next_idx: number;
//     next_title: string;
// }

export interface INews {
    title: string;
    created_at: string;
    content: string;
    year_category: string;
    thumbnail: string;
    prev_newsletter: {
        prev_idx: number;
        prev_title: string;
    };
    next_newsletter: {
        next_idx: number;
        next_title: string;
    };
}

export interface INewsListItem {
    sbnl_idx: number;
    thumbnail: string;
    title: string;
    year_category: string;
    created_at: string;
    read_store_count: number;
}

export interface INewsListRequest {
    search_year_category: string;
}

export interface INewsListResponse {
    count: number;
    list: INewsListItem[];
}
