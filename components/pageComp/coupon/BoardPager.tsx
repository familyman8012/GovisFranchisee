import React from "react";
import style from "StyleFarm/scss/modules/Pager.module.scss";
import { ArrowIosBackOutline } from "@emotion-icons/evaicons-outline/ArrowIosBackOutline";
import { ArrowheadLeftOutline } from "@emotion-icons/evaicons-outline/ArrowheadLeftOutline";
import { Pagination } from "ComponentsFarm/layouts/styles";

export interface BoardPagerProps {
  page: number;
  size: number;
  count: number;
  disabled?: boolean;
  mini?: boolean;
  className?: string;
  onChange: (page: number) => any;
}

const renderPagerItems = (
  active: number,
  pagerLength: number,
  mini: boolean,
  onClick: (val: number) => any
) => {
  const items = [];
  const range = mini ? 2 : 4;
  let first = Math.max(active - range / 2, 1),
    last = Math.min(active + (range - (active - first)), pagerLength);

  if (last - first < range) {
    first = Math.max(first - (range - (last - first)), 1);
  }

  for (let i = first; i <= last; i++) {
    items.push(
      <li
        className={`page-item ${active === i ? "active" : ""}`}
        key={i}
        onClick={() => onClick(i)}
      >
        <a className="page-link" role="button" href="#">
          {i}
        </a>
      </li>
    );
  }

  return items;
};

function BoardPager({
  page,
  size,
  disabled,
  count,
  className,
  mini,
  onChange,
}: BoardPagerProps) {
  const handleChange = (value: number) => {
    if (disabled) {
      return;
    }

    if (page !== value) {
      onChange(value);
    }
  };

  const pagerLength = Math.ceil((count || 1) / size);

  return (
    <div className={`${style.pagination} ${className}`}>
      <Pagination>
        {!mini && (
          <li className="page-item" onClick={() => handleChange(1)}>
            <a className="page-link" role="button" href="#">
              <span>
                <ArrowheadLeftOutline className={style.pagination__icon} />
                <span className="">Previous</span>
              </span>
            </a>
          </li>
        )}
        <li
          className="page-item"
          onClick={() => handleChange(Math.max(page - 1, 1))}
        >
          <a className="page-link" role="button" href="#">
            <span>
              <ArrowIosBackOutline className={style.pagination__icon} />
            </span>
          </a>
        </li>
        {renderPagerItems(page, pagerLength, mini || false, (val) =>
          handleChange(val)
        )}
        <li
          className="page-item"
          onClick={() => handleChange(Math.min(page + 1, pagerLength))}
        >
          <a className="page-link" role="button" href="#">
            <span>
              <ArrowIosBackOutline
                className={`${style.pagination__icon} ${style["pagination__icon--rotate"]}`}
              />
            </span>
          </a>
        </li>

        {!mini && (
          <li className="page-item" onClick={() => handleChange(pagerLength)}>
            <a className="page-link" role="button" href="#">
              <span>
                <ArrowIosBackOutline
                  className={`${style.pagination__icon} ${style["pagination__icon--rotate"]}`}
                />
              </span>
            </a>
          </li>
        )}
      </Pagination>

      {/* <Pagination className={style.pagination__list}>
                {!mini && (
                    <Pagination.First onClick={() => handleChange(1)}>
                        <ArrowheadLeftOutline className={style.pagination__icon} />
                    </Pagination.First>
                )}
                <Pagination.Prev onClick={() => handleChange(Math.max(page - 1, 1))}>
                    <ArrowIosBackOutline className={style.pagination__icon} />
                </Pagination.Prev>
                {renderPagerItems(page, pagerLength, mini || false, (val) => handleChange(val))}
                <Pagination.Next onClick={() => handleChange(Math.min(page + 1, pagerLength))}>
                    <ArrowIosBackOutline className={`${style.pagination__icon} ${style["pagination__icon--rotate"]}`} />
                </Pagination.Next>
                {!mini && (
                    <Pagination.Last onClick={() => handleChange(pagerLength)}>
                        <ArrowheadLeftOutline
                            className={`${style.pagination__icon} ${style["pagination__icon--rotate"]}`}
                        />
                    </Pagination.Last>
                )}
            </Pagination> */}
    </div>
  );
}

export default BoardPager;
