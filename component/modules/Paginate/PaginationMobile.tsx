import React, { useState } from "react";
import { PaginationMobileWrap } from "./style";

import { ArrowDownFilled } from "@ComponentFarm/atom/icons";
import ArrowPagination from "@ComponentFarm/atom/icons/ArrowPagination";
import ArrowDouble from "@ComponentFarm/atom/icons/ArrowDouble";

export interface PaginationProps {
  pageInfo: number[];
  totalCount: number;
  handlePageChange: (pageNumber: number) => void;
}

const PaginationMobile: React.FC<PaginationProps> = ({
  pageInfo,
  totalCount,
  handlePageChange,
}) => {
  const [inputValue, setInputValue] = useState(pageInfo[0].toString());
  const currentPage = pageInfo[0];
  const maxPage = Math.ceil(totalCount / pageInfo[1]);

  const handleMobilePageChange = (newPage: number) => {
    const validatedPage = Math.max(1, Math.min(newPage, maxPage));
    handlePageChange(validatedPage);
    setInputValue(validatedPage.toString());
    window.scrollTo(0, 0);
  };

  const handleInputChange = (value: string) => {
    const filteredValue = value.replace(/[^\d]/g, "");
    setInputValue(filteredValue);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(inputValue, 10);
      if (!isNaN(pageNumber)) {
        handleMobilePageChange(pageNumber);
      }
    }
  };

  return (
    <PaginationMobileWrap>
      <button
        onClick={() => handleMobilePageChange(1)}
        disabled={currentPage === 1}
        className="btn_first"
      >
        <ArrowDouble />
      </button>
      <button
        onClick={() => handleMobilePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn_prev"
      >
        <ArrowPagination />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleInputEnter}
      />
      <span className="txt_total">/ {maxPage}</span>
      <button
        onClick={() => handleMobilePageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
        className="btn_next"
      >
        <ArrowPagination />
      </button>
      <button
        onClick={() => handleMobilePageChange(maxPage)}
        disabled={currentPage === maxPage}
        className="btn_last"
      >
        <ArrowDouble />
      </button>
    </PaginationMobileWrap>
  );
};

export default PaginationMobile;
