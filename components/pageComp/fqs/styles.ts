import styled from "@emotion/styled";
import { Common } from "StyleFarm/common";

export const FqsListPageStyle = styled.div`
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    width: 100%;
    height: 72px;
    padding: 16px 20px;
    background-color: ${Common.color.$white};
    color: ${Common.color.$typo1};
    .header-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      & + .header-item {
        border-left: 1px solid ${Common.color.$typo5};
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 20px;
  }

  .list {
    width: 100%;
  }

  .sort {
    width: 100%;
    display: flex;
    margin-bottom: 16px;
    border-radius: 20px;
    background: ${Common.color.$white};

    .gv-checkbox {
      height: 40px;
      box-shadow: none;
      border: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      font-size: 15px;
      width: 50%;
      color: ${Common.color.$typo3};
      height: 40px;
      border-radius: 20px;
      .gv-checkbox__icon {
        display: none;
      }

      margin-left: 0 !important;
    }

    .gv-checkbox__label {
      text-align: center;
      margin: 0;
    }

    .gv-checkbox--checked {
      color: ${Common.color.$primary3};
      border: 1px solid ${Common.color.$primary3};
      background: ${Common.color.$white};
    }
  }

  .filter-datepicker {
    border: 0;
    width: 100%;
    height: auto;
    min-height: 40px;

    & > svg {
      display: none;
    }

    svg {
      position: static !important;
    }

    .gv-datepicker__origin {
      display: inline-flex;
      padding: 0;
      white-space: pre;
      font-weight: 500;
      justify-content: center;
      * {
        line-height: 1.25;
      }
      * + * {
        margin-left: 1.25rem;
      }
    }
  }

  .gv-loading {
    margin-top: 16px;
  }
`;

export const FqsCategorySelectStyle = styled.div`
  .filter-button {
    height: auto;
    min-height: 40px;

    &::before {
      content: "";
      display: inline-flex;
      width: 24px;
      height: 12px;
      background: ${Common.color.$primary2};
      margin-right: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 0 1px ${Common.color.$white},
        0 0 0 2px ${Common.color.$primary2};
    }
  }

  .category-select-modal {
    .modal-dialog {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
`;

export const FqsListItemStyle = styled.div`
  margin-top: 16px;

  .image {
    width: 100%;
    border-radius: 4px 4px 0px 0px;
  }

  .item-content {
    padding: 15px 16px 16px 16px;
    border-radius: 0px 0px 4px 4px;
    background-color: ${Common.color.$white};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item-date {
    font-weight: 400;
    font-size: 14px;
    color: ${Common.color.$typo3};
  }

  .item-name {
    margin-top: 4px;
    font-weight: 400;
    font-size: 14px;
    color: ${Common.color.$black};
    line-height: 17px;
  }

  .item-score {
    font-weight: 400;
    font-size: 32px;
    color: ${Common.color.$primary3};
  }
`;

export const NoImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Common.color.$typo5};

  svg {
    color: ${Common.color.$white};
  }
`;

export const FqsDetailPageStyle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .detail-info {
    background: ${Common.color.$white};
    border-radius: 4px;

    .data {
      padding: 17px 20px 18px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .date {
      font-weight: 400;
      font-size: 14px;
      color: ${Common.color.$typo3};
      margin: 0;
    }

    .category {
      font-weight: 400;
      font-size: 14px;
      color: ${Common.color.$black};
      margin-top: 4px;
      line-height: 20px;
    }

    .score {
      font-weight: 400;
      font-size: 32px;
      color: ${Common.color.$primary3};
    }
  }

  .image-wrapper {
    display: block;
    position: relative;
    padding-bottom: 56.25%;
    .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .video-wrapper {
    display: block;
    position: relative;
    padding-bottom: 56.25%;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .section-info {
    margin-top: 8px;
    padding: 20px;
    background: ${Common.color.$white};
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 12px;
    }
  }

  .section-info__wrapper {
    margin: 0 -4px;
  }
`;

export const DetailSectionStyle = styled.div`
  display: inline-flex;
  flex-direction: column;

  position: relative;
  width: calc(50% - 8px);
  margin: 4px;
  border: 1px solid ${Common.color.$typo5};
  border-radius: 4px;
  overflow: hidden;

  .image-wrapper {
    display: block;
    position: relative;
    padding-bottom: 56.25%;
    width: 100%;
    .image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: row;

    li {
      position: relative;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      line-height: 1.5;
    }

    li:nth-of-type(2) {
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-1px, -50%);
        height: 50%;
        width: 1px;
        background-color: ${Common.color.$typo5};
      }
    }

    .label {
      font-size: 12px;
      color: ${Common.color.$typo3};

      text-transform: capitalize;
    }

    .value {
      font-size: 16px;
      color: ${Common.color.$primary3};
      font-weight: 500;
    }
  }
`;
