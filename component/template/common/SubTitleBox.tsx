import React, { FC } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import styled from "@emotion/styled";
import { mq } from "@ComponentFarm/common";

export const SubTitleBoxWrap = styled.div<{
  hideUnderline?: boolean;
  type?: string;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 6.4rem 0 3.2rem;

  ${(props) => `${props.type === "fst" && "margin-top: 3.2rem;"}`};

  h2 {
    margin-bottom: 0;
    padding: 0;
    font-size: 1.8rem;
    font-weight: bold;
    border-bottom: 0;
  }

  ${mq[0]} {
    margin: 6.4rem 0 2.4rem;
    ${(props) => `${props.type === "fst" && "margin-top: 3.2rem;"}`};

    h2 {
      color: var(--color-neutral10);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: 110%;
    }
  }

  .desc {
    margin-left: 1.6rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-neutral50);
  }

  .descBottom {
    display: flex;
    align-items: center;
    margin-top: 1.15rem;
    line-height: 120%;
    dt {
      margin: 0 1.6rem;
      color: var(--color-blue_gray50);
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;

      &:first-of-type {
        margin-left: 0;
      }
    }
    dd {
      min-width: 3rem;
      color: var(--color-neutral10);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 700;
    }
  }

  a {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 1.6rem;
    color: var(--color-neutral10);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;

    &:after {
      display: block;
      content: "";
      width: 1.6rem;
      height: 1.6rem;
      background: url("/images/common/arrow_right.svg") no-repeat left center /
        1.6rem;
    }
  }

  dl.add_text {
    display: flex;
    align-items: center;
    margin-left: auto;
    dt,
    dd {
      font-size: 1.6rem;
      font-weight: 700;
    }
    dt {
      color: var(--color-gray9);
    }
    dd {
      min-width: 3.7rem;
      margin-left: 1.6rem;
      color: var(--color-orange60);
    }
  }
`;

type SubTitleType = "fst";

interface ISubTitleBoxProps {
  type?: SubTitleType;
  title?: string;
  desc?: string;
  moreLink?: string;
  hideUnderline?: boolean;
  descBottom?: { label: string; value: string }[];
  addText?: React.ReactElement;
}

const SubTitleBox: FC<ISubTitleBoxProps> = ({
  type,
  title,
  desc,
  moreLink,
  hideUnderline,
  descBottom,
  addText,
}) => {
  return (
    <SubTitleBoxWrap hideUnderline={hideUnderline} type={type}>
      <div>
        {title && <h2>{title}</h2>}
        {descBottom && (
          <dl className="descBottom">
            {descBottom.map((el, idx) => (
              <React.Fragment key={idx}>
                <dt>{el.label}</dt>
                <dd>
                  {el.value !== "undefined" ? el.value : <Skeleton count={1} />}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        )}
      </div>
      <em className="desc">{desc}</em>
      {addText}
      {moreLink && <Link href="/">더보기</Link>}
    </SubTitleBoxWrap>
  );
};

export default SubTitleBox;
