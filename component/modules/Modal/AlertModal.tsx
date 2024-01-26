import Modal from '@ComponentFarm/modules/Modal/Modal';
import { AlertContentStyle } from './style';

/**
 * @TODO storybook
 */
interface AlertModalProps {
  isOpen?: boolean;
  title?: string;
  content?: string;
  onClose?: () => void;
}

const AlertModal = ({ isOpen, title, content, onClose }: AlertModalProps) => {
  return (
    <Modal
      isOpen={!!isOpen}
      onClose={() => onClose?.()}
      onFormSubmit={() => onClose?.()}
      showCancelButton={false}
      showCloseButton={false}
    >
      <AlertContentStyle>
        {title && <h4 className="title">{title}</h4>}
        {content && <p className="content">{content}</p>}
      </AlertContentStyle>
    </Modal>
  );
};

export default AlertModal;
