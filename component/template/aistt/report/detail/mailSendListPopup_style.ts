import styled from '@emotion/styled';

export const MailSendContentWrap = styled.div`
  width: 82.6rem;
  border-bottom: 1px solid #eaecf0;

  /* .input_mail_send__menu {
    display: none;
  } */
  .input_mail_send__multi-value__label,
  input[type='text'],
  textarea {
    font-size: 1.4rem;
  }

  .box_inp.error {
    label + div,
    input {
      border: none;
      border-bottom: 1px solid red;
    }
  }

  .box_inp {
    &:last-of-type .field {
      align-items: normal;
    }
  }

  .field {
    display: flex;
    align-items: center;
    padding: 1.2rem 0;

    label {
      width: 10.7rem;
      color: var(--color-gray500);
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.8rem;
      letter-spacing: 0.042rem;

      + div,
      + input {
        width: 100%;
        border-bottom: 1px solid var(--color-neutral90);
        margin-bottom: 0.8rem;
      }
    }

    .input_mail_send {
      &__multi-value {
        display: flex;
        padding: 0.2rem 0.8rem;
        justify-content: center;
        align-items: center;
        border-radius: 1.6rem;
        border: 1px solid #eaecf0;
        background: #f9fafb;
        color: #5a6376;
      }
      &__control {
        border: none;

        border-radius: 0;

        box-shadow: none;
        &--is-focused {
          border-bottom: 1px solid #2a31de;
        }
      }
      &__indicators {
        display: none;
      }
      &__option--is-focused {
        background-color: var(--color-gray2);
        color: var(--color-neutral10);
      }
      &__multi-value__remove:hover {
        color: unset;
        background: unset;
      }
    }
  }

  textarea {
    height: 24.1rem;
    margin-bottom: 3.6rem;
  }

  p {
    margin-top: 0 !important;
    margin-left: 9.3rem;
  }
`;
