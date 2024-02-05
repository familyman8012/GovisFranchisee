import { Badge } from "@ComponentFarm/atom/Badge/Badge";
import styled from "@emotion/styled";
import { IFqsInspectionInfo } from "InterfaceFarm/ai-fqs";
import { useMemo } from "react";
import { toJSON } from "@UtilFarm/json";
import {
  Table,
  TableWrap,
  breakpoints,
  mqMaxWidth,
} from "@ComponentFarm/common";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";
import { BadIcon, GoodIcon } from "./AnalysisIcons";

const InspectionStepDescriptionStyle = styled.div`
  display: flex;
  align-items: stretch;
  padding: 3.2rem;
  background: var(--color-blue_gray10);
  color: var(--color-gray10);
  gap: 2.4rem;

  .summary,
  .description {
    flex: 0.5;
  }

  .score {
    font-weight: bold !important;
    color: var(--color-neutral10) !important;
  }

  .nagative {
    color: var(--color-red50) !important;
  }

  h3 {
    color: var(--color-gray10);
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
    line-height: 1.15;
  }

  .summary {
    .card {
      display: flex;
      flex-direction: column;
      padding: 3.2rem;
      border-radius: 0.8rem;
      border: 1px solid var(--color-neutral90);
      background-color: var(--color-gray1);
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    h2 {
      margin-top: 1.6rem;
      margin-bottom: 0;
    }

    p {
      margin-top: 0.4rem;
      color: var(--color-neutral10);
    }

    .images {
      border-top: 2px solid var(--color-neutral95);
      display: flex;
      align-items: stretch;
      text-align: left;
      padding-top: 3.2rem;
      margin-top: 3.2rem;
      gap: 2.4rem;

      li {
        flex: 1;
        display: flex;
        flex-direction: column;

        img {
          flex: 1;
          object-fit: contain;
        }
      }
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .result {
    display: flex;
    margin-top: 1.6rem;
    border: 1px solid var(--color-neutral90);
    background: var(--color-gray1);
    border-radius: 0.8rem;

    .label {
      font-weight: 600;
      margin-bottom: 0.8rem;
    }

    .score {
      font-size: 2.4rem;
      font-weight: bold;
      color: var(--color-neutral10);
    }

    .nagative {
      color: var(--color-red50);
    }

    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.4rem 0;

      .label {
        color: var(--color-gray10);
        font-weight: 600;
      }
    }

    li + li {
      border-left: 1px solid var(--color-neutral90);
    }
  }

  td {
    line-height: 1.25;
  }

  tr {
    cursor: default !important;
  }

  ${mqMaxWidth(breakpoints[1] - 1)} {
    padding: 2.4rem 1.6rem;
    flex-direction: column;

    .summary,
    .description {
      flex: 1;
    }

    h3 {
      margin-bottom: 1.6rem;
    }

    .summary .card {
      padding: 2.4rem 1.6rem;
    }

    .summary .images {
      padding-top: 2.4rem;
      margin-top: 2.4rem;
      gap: 1.6rem;
    }

    .description table colgroup > col:nth-of-type(5),
    .description table tr > th:nth-of-type(5),
    .description table tr > td:nth-of-type(5) {
      display: none;
    }
  }
`;

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      color={status === "우수" ? "blue" : status === "미흡" ? "yellow" : "red"}
      size="sm"
    >
      {status}
    </Badge>
  );
};

type StepDescriptionType = {
  [key: string]: string;
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "0_상태": string;
  "1_상태": string;
  "2_상태": string;
  "3_상태": string;
  "4_상태": string;
  "5_상태": string;
  "0_점수": string;
  "1_점수": string;
  "2_점수": string;
  "3_점수": string;
  "4_점수": string;
  "5_점수": string;
  "0_감점": string;
  "1_감점": string;
  "2_감점": string;
  "3_감점": string;
  "4_감점": string;
  "5_감점": string;
  전체검사: string;
  전체검사_상태: string;
  전체검사_점수: string;
  전체검사_감점: string;
  개선사항: string;
};

interface Props {
  inspectionStep: IFqsInspectionInfo["step_list"][number];
}

const InspectionStepDescription = ({ inspectionStep }: Props) => {
  const descriptionObj = useMemo(
    () => toJSON<StepDescriptionType>(inspectionStep.section_description ?? ""),
    [inspectionStep]
  );

  return (
    <InspectionStepDescriptionStyle>
      <section className="summary">
        <h3>개선 요청 결과</h3>
        <div className="card">
          <Badge color="gray">개선 사항</Badge>
          {[2, 3].includes(inspectionStep.rating_scale_idx_1) ? (
            <BadIcon text={descriptionObj?.["개선사항"]} />
          ) : (
            <GoodIcon text={descriptionObj?.["개선사항"]} />
          )}

          <ul className="images">
            <li>
              {inspectionStep.ground_truth_image_url && (
                <>
                  <h3>레시피 기준</h3>
                  <img src={inspectionStep.ground_truth_image_url} alt="" />
                </>
              )}
            </li>

            <li>
              <h3>제조 결과</h3>
              <img src={inspectionStep.step_color_image_url} alt="" />
            </li>
          </ul>
        </div>
      </section>
      <div className="description">
        <section>
          <h3>전체 기준 결과</h3>
          <ul className="result">
            <li>
              <span className="label">결과</span>
              <span className="value">
                <StatusBadge status={descriptionObj?.["전체검사_상태"] ?? ""} />
              </span>
            </li>
            <li>
              <span className="label">평가 점수</span>
              <span className="score">
                {descriptionObj?.["전체검사_점수"]
                  ? `${descriptionObj?.["전체검사_점수"]}`
                  : ""}
              </span>
            </li>
            <li>
              <span className="label">감점</span>
              <span className="score nagative">
                {descriptionObj?.["전체검사_감점"]
                  ? `${
                      descriptionObj?.["전체검사_감점"] === "0.0"
                        ? descriptionObj?.["전체검사_감점"]
                        : `-${descriptionObj?.["전체검사_감점"]}`
                    }`
                  : ""}
              </span>
            </li>
          </ul>
        </section>
        <section>
          <h3>조각별 기준 및 평가점수</h3>
          <TableWrap>
            <Table className="basic">
              <colgroup>
                <col width={getTableWidthPercentage(106, 1000)} />
                <col width={getTableWidthPercentage(106, 1000)} />
                <col width={getTableWidthPercentage(106, 1000)} />
                <col width={getTableWidthPercentage(106, 1000)} />
                <col width={getTableWidthPercentage(430, 1000)} />
              </colgroup>
              <thead>
                <tr>
                  <th className="center">NO.</th>
                  <th className="center">결과</th>
                  <th className="center">평가 점수</th>
                  <th className="center">감점</th>
                  <th className="center">설명</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map((step) => {
                  const data =
                    descriptionObj?.[`${step}` as keyof StepDescriptionType];
                  const status =
                    descriptionObj?.[
                      `${step}_상태` as keyof StepDescriptionType
                    ];
                  const score =
                    descriptionObj?.[
                      `${step}_점수` as keyof StepDescriptionType
                    ];
                  const subtractScore =
                    descriptionObj?.[
                      `${step}_감점` as keyof StepDescriptionType
                    ];

                  if (!data) return null;

                  return (
                    <tr key={step} className="empty">
                      <td className="center">
                        {step + 1 > 9 ? step + 1 : `0${step + 1}`}
                      </td>
                      <td className="center">
                        <StatusBadge status={status ?? ""} />
                      </td>
                      <td className="center score">
                        {typeof score !== "undefined" ? `${score}` : "-"}
                      </td>
                      <td className="center score nagative">
                        {typeof subtractScore !== "undefined"
                          ? `${
                              subtractScore === "0.0"
                                ? `${subtractScore}`
                                : `-${subtractScore}`
                            }`
                          : "-"}
                      </td>
                      <td
                        style={{ whiteSpace: "pre-wrap", fontSize: "1.2rem" }}
                      >
                        {data}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableWrap>
        </section>
      </div>
    </InspectionStepDescriptionStyle>
  );
};

export default InspectionStepDescription;
