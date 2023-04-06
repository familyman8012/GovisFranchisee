import React from "react";
import dayjs from "dayjs";

import style from "StyleFarm/scss/modules/Coupon.module.scss";

import { ICoupon } from "InterfaceFarm/Coupon";
import SearchInput from "ComponentsFarm/elements/SearchInput";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { Container } from "ComponentsFarm/layouts/styles";
import { ListLoading } from "ComponentsFarm/elements/Loading";

interface CouponUsedListProps {
  searched?: boolean;
  loading?: boolean;
  coupons: ICoupon[];
  onSearch: (keyword: string) => void;
}

const CouponUsedList: React.FC<CouponUsedListProps> = ({ searched, loading, coupons, onSearch }) => {
  const empty = coupons.length === 0 && !loading;
  const canRenderList = !empty && !loading;

  return (
    <Container className="coupon-list">
      <label className={`${style["coupon__label"]} weight-normal`}>쿠폰 사용 리스트</label>
      <SearchInput
        className={style["coupon-list__search"]}
        onEnter={onSearch}
        placeholder={"쿠폰명을 입력하세요."}
        reverse
      />
      <ul className={style["coupon-list__wrapper"]}>
        {empty && (
          <li className={style["coupon-list__item"]}>
            <EmptyView>조회결과가 존재하지 않습니다.</EmptyView>
          </li>
        )}
        {loading && (
          <li className={style["coupon-list__item"]}>
            <ListLoading />
          </li>
        )}
        {canRenderList &&
          coupons.map((coupon) => (
            <li className={style["coupon-list__item"]} key={coupon.coupon_number}>
              <span className={style["coupon-list__date"]}>{dayjs(coupon.used_at).format("YYYY-MM-DD HH:mm:ss")}</span>
              <h4 className={style["coupon-list__name"]}>{coupon.coupon_name}</h4>
              <span className={style["coupon-list__code"]}>{coupon.coupon_number}</span>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default CouponUsedList;
