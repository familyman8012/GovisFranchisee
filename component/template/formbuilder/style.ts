import styled from '@emotion/styled';

export const FormBuilderWrap = styled.div`
  padding: 0 30px;
  .form_control_box {
    display: flex;

    .box_form_handling {
      width: 70%;
    }

    .form_history {
      width: 30%;
      border: 1px solid #ddd;

      .form_save {
        display: flex;
      }

      .wrap_form_list {
        overflow-y: auto;
        max-height: 500px;
      }
      .form_list {
        margin-top: 10px;
        padding: 0 20px;
        font-size: 14px;

        .box_tit {
          display: flex;
          aling-items: center;

          h2 {
            padding-top: 2px;
          }
          button {
            margin-left: auto;
          }
        }

        h2 {
          font-size: 14px;
        }
        ul {
          margin-top: 10px;
          li {
            display: flex;
            align-items: center;
            padding: 10px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;

            .form_name {
              margin-right: 10px;
            }

            .btn_box {
              display: flex;

              button:first-of-type {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
  .box_form_handling {
    padding: 10px;
    border: 1px solid #ddd;
    margin-right: 50px;
  }

  .btn_line {
    margin-bottom: 30px;
  }

  pre {
    padding: 30px 20px;
    font-size: 14px;
    color: #fff;
    background: #000;
  }

  .box_code {
    position: relative;
    margin-top: 20px;
    button {
      position: absolute;
      top: 50px;
      right: 20px;
    }
  }
`;
