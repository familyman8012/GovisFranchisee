export interface iSuggestion {
    status: number;
    created_at: string;
    category?: number;
    title: string;
    content: iSuggestionListContent[];
}

export interface iSuggestionListContent {
    sbqc_idx: number;
    created_at: string;
    user_type: number;
    content_type: number;
    content_value: string;
    is_read: number;
}

export interface iSuggestionListItem extends Omit<iSuggestion, "content"> {
    sbq_idx: number;
    unread_content_count: number;
    delete_possible: string;
}

export interface iSuggestionListRequest {
    page: number;
    size: number;
}

export interface iSuggestionListResponse {
    count: number;
    list: iSuggestionListItem[];
}

export interface iSuggestionTitlePostRequest {
    category: number;
    title: string;
    user_id?: number;
}

export interface iSuggestionTitlePostResponse {
    sbq_idx: number;
}

export interface iSuggestionViewInfoRequest {
    sbq_idx: number;
}

export interface iSuggestionViewInfoResponse {
    status: number;
    created_at: string;
    category: number;
    title: string;
    content: iSuggestionViewContent[];
}

export interface iSuggestionViewContent {
    sbqc_idx: number;
    created_at: string;
    user_type: number;
    content_type: number;
    content_value: string;
    is_read: number;
}

export interface iSuggestionBoardReplyPostRequest {
    [key: string]: number | string | File;
    sbq_idx: number;
    content_type: number;
    content_value: string | File;
    user_id: number;
}

export interface iSuggestionBoardReplyPostResponse {
    sbqc_idx: number;
    content_value: string;
}

export interface iSuggestionBoardReplyDeleteRequest {
    sbqc_idx: number;
}

export interface iSuggestionBoardReplyDeleteResponse {
    sbqc_idx: number;
}