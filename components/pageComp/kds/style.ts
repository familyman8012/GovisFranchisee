import styled from "@emotion/styled";

export const KdsWrap = styled.div`
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  margin: 24px auto 0;
  padding: 0 20px 50px;

  .box {
    margin: 16px 0;
    padding: 15px;
    border-radius: 0.25rem;
    background-color: rgb(255, 255, 255);
    border: 1px solid #e0e0e0;
  }
  .wrap_info {
    margin-bottom: 24px;
    .box {
      margin-top: 0;
    }
    .box_sales {
      li {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        font-weight: bold;

        &:first-of-type {
          margin-top: 0px;
        }
      }
    }
    .wrap_chart {
      border-radius: 0.25rem;
      background: #fff;
      border: 1px solid #e0e0e0;

      .head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 47px;
        padding-left: 0.75rem;
        border-bottom: 1px solid #e0e0e0;

        .title {
          margin-bottom: 0;
        }
      }
    }
    .recharts-responsive-container {
      overflow: hidden;
      background: #fff;
    }
  }
  .box_receipt {
    .box {
      padding: 0;
    }
    .item_receipt {
      font-size: 13px;
      .head_item {
        border-bottom: 1px solid #e0e0e0;
        padding: 15px;
      }
      .cont_item {
        padding: 15px;
      }
      .box_status_info {
        display: flex;
        font-weight: bold;
        font-size: 13px;

        /* .num_order {
          margin-left: auto;
        } */

        .txt_info {
          margin-left: auto;
        }

        .current_status {
          margin-top: 10px;
        }
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e0e0e0;
        th,
        td {
          text-align: center;
          border: 1px solid #e0e0e0;
          border-left: none;
          border-right: none;
        }
        th,
        td {
          padding: 7px 0;
          &:first-of-type {
            padding-left: 20px;
            text-align: left;
          }
        }
      }
    }
  }
`;
