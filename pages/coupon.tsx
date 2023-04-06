import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { ICoupon } from "InterfaceFarm/Coupon";
import { toast } from "react-toastify";

import Layout from "ComponentsFarm/layouts";
import CouponForm from "ComponentsFarm/pageComp/coupon/CouponForm";
import CouponUsedList from "ComponentsFarm/pageComp/coupon/CouponUsedList";
import { fetchUsedCouponList, updateCoupon } from "ApiFarm/coupon";
import BoardPager from "ComponentsFarm/pageComp/coupon/BoardPager";
import { CouponWrap } from "ComponentsFarm/pageComp/coupon/style";

const Coupon = () => {
  const queryClient = useQueryClient();

  const [invalid, setInvalid] = useState<Error>();
  const [reset, setReset] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    size: 6,
    search: "",
  });

  const queryKey = useMemo(() => ["used-coupons", params], [params]);

  const { data, isLoading: isListLoading } = useQuery(queryKey, () => fetchUsedCouponList(params));

  const { mutate, isLoading } = useMutation((couponCode: string) => updateCoupon(couponCode), {
    onSuccess: () => {
      toast("쿠폰이 등록되었습니다.");
      setReset(true);
      setInvalid(undefined);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (e: Error) => {
      setInvalid(e);
    },
  });

  const handleSubmit = useCallback((couponCode: string) => mutate(couponCode), []);
  const handleSearch = useCallback((search: string) => setParams({ ...params, search, page: 1 }), [params]);
  const handleChangePage = useCallback((page: number) => setParams({ ...params, page }), [params]);

  return (
    <Layout className="fullWidth">
      <CouponWrap className="m-0">
        <CouponForm
          disabled={isLoading}
          onSubmit={handleSubmit}
          reset={reset}
          onReset={() => setReset(false)}
          invalid={invalid}
        />
        <CouponUsedList
          loading={isListLoading}
          searched={!!params.search}
          coupons={data?.list ?? []}
          onSearch={handleSearch}
        />
        <BoardPager mini page={params.page} size={params.size} count={data?.count ?? 1} onChange={handleChangePage} />
      </CouponWrap>
    </Layout>
  );
};

export default Coupon;
