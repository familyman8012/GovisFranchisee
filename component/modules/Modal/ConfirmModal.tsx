import { useEffect } from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { confirmModalStore } from "MobxFarm/store";
import Modal from "./Modal";

const ConfirmModal = () => {
  useEffect(() => {
    if (confirmModalStore.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, []);

  const onClose = () => {
    if (typeof confirmModalStore.onClose === "function") {
      confirmModalStore.onClose();
    } else {
      runInAction(() => {
        confirmModalStore.closeModal();
      });
    }
  };

  const onCancel = () => {
    if (typeof confirmModalStore.onCancel === "function") {
      confirmModalStore.onCancel();
    } else {
      runInAction(() => {
        confirmModalStore.closeModal();
      });
    }
  };

  return (
    <Modal
      isOpen={confirmModalStore.isOpen}
      title={confirmModalStore.title}
      onClose={onClose}
      onCancel={onCancel}
      onFormSubmit={confirmModalStore.onFormSubmit}
      submitButtonText={confirmModalStore.submitButtonText}
      cancelButtonText={confirmModalStore.cancelButtonText}
      showCloseButton={confirmModalStore.showCloseButton}
      showCancelButton={confirmModalStore.showCancelButton}
      showButtons={confirmModalStore.showButtons}
    >
      {confirmModalStore.content}
    </Modal>
  );
};

export default observer(ConfirmModal);
