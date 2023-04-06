export interface IUseCouponResponse {
    code: string;
    message: string;
}

export interface ICoupon {
    used_at: string;
    coupon_name: string;
    coupon_number: string;
}

export interface IUsedCopons {
    count: number;
    list: ICoupon[];
}
