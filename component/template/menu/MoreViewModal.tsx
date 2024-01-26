import styled from '@emotion/styled';
import Modal from '@ComponentFarm/modules/Modal/Modal';
import { Table } from '@ComponentFarm/common';

interface Props {
  open?: boolean;
  title?: string;
  data?: string[];
  onClose?: () => void;
}

const ModalContent = styled.div`
  max-width: 31.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScrollTableWrap = styled.div`
  overflow-y: auto;
  max-height: 29.2rem;
  /* margin: 0 -2.4rem -2.4rem; */

  & > div {
    width: 100%;
    border-radius: 0;
    border: 0;
  }
  tr {
    cursor: default !important;
  }

  tr td,
  tr th {
    padding: 1rem !important;
  }
`;

export const MoreViewModal = ({
  open,
  title,
  data,
  onClose = () => {},
}: Props) => {
  return (
    <Modal
      isOpen={!!open}
      onClose={onClose}
      onCancel={onClose}
      showButtons={false}
      title={title}
      showCloseButton
    >
      <ModalContent>
        <ScrollTableWrap>
          <Table className="basic">
            <tbody>
              {data?.map((item, i) => (
                <tr key={i}>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollTableWrap>
      </ModalContent>
    </Modal>
  );
};
