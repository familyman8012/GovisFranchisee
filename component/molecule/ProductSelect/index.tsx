import React, { HTMLAttributes, useState } from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";

import { ProductInfo } from "InterfaceFarm/product-bo";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { RadioBoxWrap } from "@ComponentFarm/atom/PlainRadio/style";
import { InnerTable } from "@ComponentFarm/common";
import useSyncedRef from "HookFarm/useSyncedRef";
import SearchKeyword, {
  SearchkeywordType,
} from "../SearchKeyword/SearchKeyword";
import { fetchMenuProductList } from "ApiFarm/menu";

interface ProductSelectProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onSelect"> {
  className?: string;
  value?: string;
  disabled?: boolean;
  onSelect?: (product: ProductInfo) => void;
}

const ProductSelectField = styled.div`
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  height: 4.4rem;

  input {
    height: 100%;
  }

  button {
    min-width: auto;
    margin-left: 0.8rem;
  }
`;

const ProductSelectContent = styled.div`
  .search-field {
    display: flex;
    align-items: center;
    margin: 0 0 1.5rem;

    .box_searchkeyword {
      width: 100%;
      height: 5rem;

      > div:first-of-type {
        width: 11.9rem;
      }

      .inp {
        width: 100%;
      }
    }
  }

  section {
    border: 1px solid var(--color-neutral90);
    border-radius: 0.4rem;
    width: 100%;
    overflow: auto;
  }

  .btn-wrap {
    display: flex;
    gap: 1.2rem;
    padding: 2.4rem 2.4rem 0;
    margin: 2.4rem -2.4rem 0;
    border-top: 1px solid var(--color-neutral90);

    button {
      flex: 1;
    }
  }

  table {
    td,
    th {
      vertical-align: middle;
      font-weight: 400;
      text-align: left;
    }

    tr > *:nth-of-type(1) {
      padding: 0;
      text-align: center;
    }

    thead {
      position: sticky;
      top: 0;
    }
  }

  .data-wrap {
    overflow: auto;
    max-height: 40rem;
  }
`;

export const ProductSelect = React.forwardRef<
  HTMLInputElement,
  Omit<ProductSelectProps, "readOnly">
>(({ className, children, disabled, onSelect, ...formControlProps }, ref) => {
  const refs = useSyncedRef<HTMLInputElement>(ref);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [params, setParams] = useState<SearchkeywordType>({
    search_target: "product_name_ko",
    search_keyword: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(
    null
  );

  const { data, isIdle, isFetching } = useQuery(
    ["products", params],
    () =>
      fetchMenuProductList({
        search_target: params.search_target,
        search_keyword: params.search_keyword,
        current_num: 1,
        per_num: 9999,
      }),
    {
      enabled: showSelectModal && !!params.search_keyword,
    }
  );

  const handleOpen = React.useCallback(() => setShowSelectModal(true), []);
  const handleClose = React.useCallback(() => {
    setShowSelectModal(false);
    setSelectedProduct(null);
  }, []);

  return (
    <ProductSelectField>
      <input
        ref={refs}
        className={`inp ${className ?? ""}`}
        readOnly
        disabled={disabled}
        {...formControlProps}
        onClick={handleOpen}
      />
      <Button
        type="button"
        disabled={disabled}
        variant="gostSecondary"
        onClick={handleOpen}
      >
        검색
      </Button>
      <Modal
        isOpen={showSelectModal}
        showCancelButton={false}
        showCloseButton
        title="제품 선택"
        onClose={handleClose}
        disabledFormSubmit={!selectedProduct}
        onFormSubmit={() => {
          if (!selectedProduct) return;
          onSelect?.(selectedProduct);
          handleClose();
        }}
      >
        <ProductSelectContent>
          <div className="search-field">
            <SearchKeyword
              selOption={[
                {
                  label: "제품명",
                  value: "product_name_ko",
                },
                {
                  label: "제품코드",
                  value: "product_code",
                },
              ]}
              params={params}
              handler={setParams}
            />
          </div>
          <section className="data-wrap">
            <InnerTable>
              <colgroup>
                <col width={46} />
                <col width={160} />
                <col />
                <col width={160} />
                <col width={120} />
              </colgroup>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>제품코드</th>
                  <th>제품명</th>
                  <th>제품분류</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {isIdle || isFetching ? (
                  <tr>
                    <td colSpan={5}>
                      <Empty>
                        {isFetching
                          ? "불러오는중입니다..."
                          : "제품명 또는 제품코드를 검색해주세요."}
                      </Empty>
                    </td>
                  </tr>
                ) : data?.list.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <Empty>조회된 결과가 없습니다.</Empty>
                    </td>
                  </tr>
                ) : (
                  data?.list.map((item) => (
                    <tr
                      key={item.product_info_idx}
                      onClick={() => {
                        setSelectedProduct(item);
                        // onSelect?.(item);
                        // handleClose();
                      }}
                    >
                      <td>
                        <RadioBoxWrap
                          type="radio"
                          checked={item === selectedProduct}
                          readOnly
                        />
                      </td>
                      <td>{item.product_code}</td>
                      <td>{item.product_name_ko}</td>
                      <td>{item.evi_product_category_str}</td>
                      <td>{item.created_date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </InnerTable>
          </section>
        </ProductSelectContent>
      </Modal>
    </ProductSelectField>
  );
});

ProductSelect.displayName = "ProductSelect";
