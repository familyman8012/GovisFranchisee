import styled from "@emotion/styled";
import { InnerTable } from "@ComponentFarm/common";

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
    font-size: 1.6rem;
    font-weight: 600;
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
