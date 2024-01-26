import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fetchReportMailSendList } from "ApiFarm/aistt";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import Pagination from "@ComponentFarm/modules/Paginate/Pagination";
import { getTableWidthPercentage } from "@UtilFarm/calcSize";

const MailSendListPopupWrap = styled.div`
  padding-bottom: 1.5rem;
  border-radius: 0.4rem;
  border: 1px solid var(--color-neutral90);

  .head {
    padding: 2rem;
    color: var(--color-neutral10);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 110%;
  }

  table {
    width: 100%;
    th,
    td {
      padding: 1.6rem 1rem;
      text-align: left;
    }
    tr:nth-of-type(1) td {
      padding-top: 3.1rem;
    }
    th {
      color: var(--color-gray500);
      font-size: 1.4rem;
      font-weight: 500;
      border-top: 1px solid var(--color-neutral90);
      border-bottom: 1px solid var(--color-neutral90);
      background: #f9fafd;
    }
  }
`;

const MailSendListPopup = ({
  isOpen,
  onClose,
  fqs_reports_idx,
}: {
  isOpen: boolean;
  onClose: () => void;
  fqs_reports_idx: string;
}) => {
  const [current_num, setCurrent_num] = useState(1);
  const { data } = useQuery(
    ["reportMailSendList", fqs_reports_idx, current_num],
    () =>
      fetchReportMailSendList({
        fqs_reports_idx,
        params: { current_num },
      }),
    { enabled: fqs_reports_idx !== "undefined" }
  );

  return (
    <Modal
      title="레포트  메일 발송 내역"
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
      showButtons={false}
      addStyles={css`
        width: 46.6rem;
        button {
          height: 5.5rem;
        }
      `}
    >
      <MailSendListPopupWrap>
        <div className="head">내역</div>
        <table>
          <colgroup>
            {[46, 180, 240].map((el, i) => (
              <col key={i} width={getTableWidthPercentage(el, 466)} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th>
                <span className="hiddenZoneV">No.</span>
              </th>
              <th scope="col">메일 발송일</th>
              <th scope="col">발송 메일 주소</th>
            </tr>
          </thead>
          <tbody>
            {data?.list.map((el, i) => (
              <tr key={i}>
                <td>
                  <span className="hiddenZoneV">{i + 1}</span>
                </td>
                <td>{dayjs(el.send_dt).format("YYYY-MM-DD")}</td>
                <td>{el.recv_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </MailSendListPopupWrap>
      <Pagination
        pageInfo={[current_num, 10]}
        totalCount={Number(data?.total_count)}
        handlePageChange={(pageNumber: number) => setCurrent_num(pageNumber)}
      />
    </Modal>
  );
};

export default MailSendListPopup;
