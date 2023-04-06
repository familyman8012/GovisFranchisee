export interface IProductRecipe {
  title: string; // 제목
  content: string; // 내용
  thumbnail: string; // 썸네일 (AWS S3 경로)
  product_category: number; // 제품 분류 (0=피자, 1=파스타)
  type_category: number; // 유형 분류 (0=일반, 1=신메뉴, 2=개선, 3=콜라보)
  prev_recipe: {
    prev_idx: number;
    prev_title: string;
  };
  next_recipe: {
    next_idx: number;
    next_title: string;
  };
  created_at: string;
}

export interface IProduceRecipeListItem {
  sbr_idx: number; // 글 고유식별 번호
  thumbnail: string; // 썸네일 (AWS S3 경로)
  title: string; //제목
  type_category: number; //	유형 분류 (0=일반, 1=신메뉴, 2=개선, 3=콜라보)
  created_at: string; // 등록시간 (Y-m-d H:M:S)
  read_store_count: number;
}

export interface IProductRecipeListRequest {
  search_product_category: number;
}

export interface IProductRecipeListResponse {
  count: number;
  list: IProduceRecipeListItem[];
}
