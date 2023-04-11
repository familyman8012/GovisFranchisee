import styled from "@emotion/styled";

export const KdsWrap = styled.div`
  .box {
    margin: 16px 0;
    padding: 24px;
    border-radius: 0.25rem;
    background-color: rgb(255, 255, 255);
  }
  .wrap_info {
    background: #fff;
    padding-bottom: 20px;
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
    .recharts-responsive-container {
      overflow: hidden;
    }
  }
  .box_receipt {
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

    .item_receipt {
      .box_status_info {
        display: flex;

        font-weight: bold;

        .num_order {
          margin-left: auto;
        }

        .current_status {
          margin-top: 10px;
        }
      }

      table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        th,
        td {
          text-align: center;
          border: 1px solid #e0e0e0;
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
