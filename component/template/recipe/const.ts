export const searchOption = [
  {
    label: '제품명',
    value: 'product_name_ko',
  },
  {
    label: '제품코드',
    value: 'product_code',
  },
];

export const selectConfig = [
  {
    label: '제품그룹',
    field: 'evi_product_group',
    options: [
      {
        label: '전체',
        value: '',
      },
    ],
  },
  {
    label: '제품분류',
    field: 'evi_product_category',
    options: [
      {
        label: '전체',
        value: '',
      },
    ],
  },
  {
    label: '제품상태',
    field: 'evi_product_status',
    options: [
      {
        label: '전체',
        value: '',
      },
    ],
  },
  {
    label: '레시피 상태',
    field: 'is_recipe_registration',
    options: [
      {
        label: '전체',
        value: '',
      },
      {
        label: '등록',
        value: '1',
      },
      {
        label: '미등록',
        value: '0',
      },
    ],
  },
];

export const dateConfig = [
  {
    field: 'recipe_created_date',
    placeholder: '등록일',
  },
  {
    field: 'recipe_updated_date',
    placeholder: '수정일',
  },
];

export const recipeInfoDetailLayoutConfig = {
  id: 'recipeDetailLayout',
  title: '레시피 관리',
  tabs: [
    {
      title: '제품 상세',
      path: '/product-recipes/[product_info_idx]',
    },
    {
      title: '레시피 정보',
      path: '/product-recipes/[product_info_idx]/recipe-info/[recipe_info_idx]',
    },
    {
      title: '변경내역',
      path: '/product-recipes/[product_info_idx]/recipe-info/[recipe_info_idx]/history',
    },
  ],
};

export const recipeInfoListLayoutConfig = {
  id: 'recipeDetailLayout',
  title: '레시피 관리',
  tabs: [
    {
      title: '제품 상세',
      path: '/product-recipes/[product_info_idx]',
    },
    {
      title: '원재료 정보',
      path: '/product-recipes/[product_info_idx]/material-info',
    },
    {
      title: '레시피 정보',
      path: '/product-recipes/[product_info_idx]/recipe-info',
    },
  ],
};

export const recipeAddLayoutConfig = {
  id: 'recipeDetailLayout',
  title: '레시피 관리',
  tabs: [
    {
      title: '제품 상세',
      path: '/product-recipes/[product_info_idx]',
    },
    {
      title: '레시피 정보',
      path: '/product-recipes/[product_info_idx]/recipe-info/add',
    },
  ],
};
