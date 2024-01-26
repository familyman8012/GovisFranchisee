import styled from '@emotion/styled';
import { InnerTable } from '@ComponentFarm/common';

export const FqsInfoTable = styled(InnerTable)`
  flex: 0 0 100%;

  th {
    background-color: var(--color-gray2);
    text-align: left;
  }

  th,
  td {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    height: 4.4rem;
    vertical-align: middle;
  }

  .info-text {
    color: var(--color-neutral60);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .cnt-text {
    font-size: 1.6rem;
    font-weight: 600;
    vertical-align: baseline;
    color: var(--color-neutral10);

    &.red {
      color: var(--color-red50);
    }
    &.yellow {
      color: var(--color-yellow50);
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem 0;
    margin: 0.4rem 0 0.4rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      /* list-style: inside; */

      &.empty {
        list-style: none;
        color: var(--color-neutral60);
        font-size: 1.4rem;
      }
    }
  }

  .tooltip-button {
    appearance: none;
    background: none;
    display: inline-flex;
    align-items: center;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    svg {
      margin-left: 0.4rem;
    }
    path {
      fill: currentColor !important;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      li {
        list-style: none;
        display: flex;
        align-items: flex-start;
        gap: 0.6rem;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.2;
        line-height: 1.7;
      }
    }
  }
`;

export const SectionStyle = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  min-height: 4rem;
  margin: 3.2rem 0;

  .title {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.5;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .count {
    font-size: 1.4rem;
    line-height: 1.2;
    font-weight: normal;
    .number {
      font-size: 1.6rem;
      font-weight: 600;
      color: var(--color-blue60);
    }
  }

  .select_library_control {
    min-width: 23.8rem;
  }

  .content {
    margin-top: 3.2rem;
  }
`;

export const FqsAnalysisDataStyle = styled.div`
  position: relative;
  margin-left: 3.2%;
  padding-top: 1.5rem;
  display: flex;

  > ul:nth-of-type(1) {
    flex: none;
    display: inline-flex;
    flex-direction: column;
  }

  > ul:nth-of-type(2) {
    flex: 1;
    margin-bottom: 3rem;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: calc(100% + 1.2rem - 0.1rem);
    height: 1rem;
    width: 0.2rem;

    background-size: 0.2rem 0.6rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='10' viewBox='0 0 2 10' fill='none'%3E%3Cpath d='M1 1V9' stroke='%23D5DBE5' stroke-width='2' stroke-linecap='round' stroke-dasharray='4 4'/%3E%3C/svg%3E");
  }

  .ico {
    position: absolute;
    right: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-blue70);
    background-color: var(--color-blue80);
    border-radius: 50%;

    svg {
      width: 1.6rem;
      height: 1.6rem;

      path {
        fill: currentColor;
      }
    }
  }

  .cont {
    display: flex;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    padding-bottom: 5.6rem;
  }

  li {
    position: relative;
    padding-left: 2.9rem;
    width: 100%;

    &:not(.hide-line)::before {
      content: '';
      position: absolute;
      right: calc(100% + 1.2rem - 0.1rem);
      top: 3.2rem;
      width: 0.2rem;
      height: calc(100% - 4rem);
      background-color: var(--color-gray100);
      border-radius: 0.2rem;
    }
  }

  .inspection-img {
    h3 {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.4rem;
      margin-bottom: 1.8rem;
    }

    img {
      width: 32.9rem;
      height: 20.8rem;
      object-fit: cover;
    }

    & + .inspection-img {
      margin-left: 7rem;
    }
  }

  .inspection {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: inherit;
      font-weight: inherit;
      line-height: 2.4rem;
    }

    .effect {
      margin-top: 1.4rem;
      display: flex;
      align-items: center;

      p {
        color: var(--color-neutral50);
        margin-left: 1.1rem;
      }

      /* &::before {
        content: '';
        width: 0.2rem;
        height: 2.6rem;
        border-radius: 0.2rem;
        margin-right: 1rem;
        background-color: var(--color-gray100);
      } */
    }
  }
`;
