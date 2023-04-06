
export const OrderType = [
    {
        key : "TAKEOUT"
        , name : "포장"
    }
    , {
        key : "VISIT"
        , name : "방문"
    }
    , {
        key : "DELIVERY"
        , name : "배달"
    }
];

interface iOrderTypeName {
    [key: string]: number | string
}

export const getOrderTypeName = () => {

    let reVal : iOrderTypeName = {};

    OrderType.map((row) => {
        reVal[row.key] = row.name;
    });

    return reVal;
}