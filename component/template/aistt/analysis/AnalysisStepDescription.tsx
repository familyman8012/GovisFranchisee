import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Badge } from '@ComponentFarm/atom/Badge/Badge';
import { Table, TableWrap } from '@ComponentFarm/common';
import { getTableWidthPercentage } from '@UtilFarm/calcSize';
import { toJSON } from '@UtilFarm/json';

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      color={status === '우수' ? 'blue' : status === '미흡' ? 'yellow' : 'red'}
      size="sm"
    >
      {status}
    </Badge>
  );
};

const StepDescriptionStyle = styled.div`
  margin-right: 3rem;
  font-weight: normal;

  td {
    line-height: 1.25;
  }

  tr {
    cursor: default !important;
  }
`;

type StepDescriptionType = {
  [key: string]: string;
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '0_상태': string;
  '1_상태': string;
  '2_상태': string;
  '3_상태': string;
  '4_상태': string;
  '5_상태': string;
  '0_점수': string;
  '1_점수': string;
  '2_점수': string;
  '3_점수': string;
  '4_점수': string;
  '5_점수': string;
  '0_감점': string;
  '1_감점': string;
  '2_감점': string;
  '3_감점': string;
  '4_감점': string;
  '5_감점': string;
  전체검사: string;
  전체검사_상태: string;
  전체검사_점수: string;
  전체검사_감점: string;
  개선사항: string;
};

interface Props {
  description: string;
}

const AnalysisStepDescription = ({ description }: Props) => {
  const descriptionObj = useMemo(
    () => toJSON<StepDescriptionType>(description),
    [description]
  );

  if (descriptionObj === null) return <></>;

  return (
    <StepDescriptionStyle>
      <TableWrap>
        <Table className="basic">
          <colgroup>
            <col width={getTableWidthPercentage(120, 1000)} />
            <col width={getTableWidthPercentage(120, 1000)} />
            <col width={getTableWidthPercentage(120, 1000)} />
            <col width={getTableWidthPercentage(120, 1000)} />
            <col width={getTableWidthPercentage(760, 1000)} />
          </colgroup>
          <thead>
            <tr>
              <th>평가항목</th>
              <th className="center">결과</th>
              <th className="center">평가 점수</th>
              <th className="center">감점</th>
              <th className="center">설명</th>
            </tr>
          </thead>
          <tbody>
            {descriptionObj['전체검사'] && (
              <tr className="empty">
                <td>전체</td>
                <td className="center">
                  <StatusBadge status={descriptionObj['전체검사_상태']} />
                </td>
                <td className="center">
                  {typeof descriptionObj['전체검사_점수'] !== 'undefined'
                    ? `${descriptionObj['전체검사_점수']}`
                    : '-'}
                </td>
                <td className="center">
                  {typeof descriptionObj['전체검사_감점'] !== 'undefined'
                    ? `${descriptionObj['전체검사_감점']}`
                    : '-'}
                </td>
                <td>{descriptionObj['전체검사']}</td>
              </tr>
            )}
            {[0, 1, 2, 3, 4, 5].map(step => {
              const data =
                descriptionObj[`${step}` as keyof StepDescriptionType];
              const status =
                descriptionObj[`${step}_상태` as keyof StepDescriptionType];
              const score =
                descriptionObj[`${step}_점수` as keyof StepDescriptionType];
              const subtractScore =
                descriptionObj[`${step}_감점` as keyof StepDescriptionType];
              if (!data) return null;

              return (
                <tr key={step} className="empty">
                  <td>{step + 1}번 조각</td>
                  <td className="center">
                    <StatusBadge status={status} />
                  </td>
                  <td className="center">
                    {typeof score !== 'undefined' ? `${score}` : '-'}
                  </td>
                  <td className="center">
                    {typeof subtractScore !== 'undefined'
                      ? `${subtractScore}`
                      : '-'}
                  </td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>{data}</td>
                </tr>
              );
            })}
            {descriptionObj['개선사항'] && (
              <tr className="empty">
                <td>개선사항</td>
                <td colSpan={4}>{descriptionObj['개선사항']}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrap>
    </StepDescriptionStyle>
  );
};

export default AnalysisStepDescription;
