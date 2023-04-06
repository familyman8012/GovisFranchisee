import { useMemo } from "react";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import { IProductFilter, IProductListItem } from "InterfaceFarm/Product";

import { PRODUCT_CATEGORIES } from "./constants";

import { ProductSalesListContainer } from "./styles";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";

interface ProductSalesListProps {
  filterParams: IProductFilter;
  loading?: boolean;
  list: IProductListItem[];
}

const ProductSalesList = ({ filterParams, loading, list }: ProductSalesListProps) => {
  const filteredList = useMemo(() => {
    const filterCategories = filterParams.search_product_category?.split(",").filter((is) => !!is) ?? [];

    return (
      list?.filter(
        (item) =>
          (!filterParams.search_product_name || item.product_name.includes(filterParams.search_product_name)) &&
          (filterCategories.length === 0 || filterCategories.includes(`${item.product_category}`))
      ) ?? []
    );
  }, [list, filterParams]);

  if (loading) {
    return (
      <ProductSalesListContainer>
        <ListLoading />
      </ProductSalesListContainer>
    );
  }

  if (filteredList.length === 0) {
    return (
      <ProductSalesListContainer>
        <EmptyView>조회된 결과가 없습니다.</EmptyView>
      </ProductSalesListContainer>
    );
  }

  return (
    <ProductSalesListContainer>
      <ul className="product-list">
        {filteredList.map((item, i) => (
          <li className="product-item" key={i}>
            <div className="product-item-top">
              <h3 className="product-item-name">{item.product_name}</h3>
              <span className="product-item-order-count">주문 수 : {item.total_order_count}</span>
            </div>
            <div className="product-item-bottom">
              <span className="product-item-category">분류: {PRODUCT_CATEGORIES[item.product_category]?.label}</span>
              <span className="product-item-order-detail">
                (주 제품: {item.main_order_count} / 선택 제품: {item.select_order_count} / 추가 제품:{" "}
                {item.add_order_count})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </ProductSalesListContainer>
  );
};

export default ProductSalesList;
