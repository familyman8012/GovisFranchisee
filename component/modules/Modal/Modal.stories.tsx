import React, { useEffect, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { runInAction } from "mobx";
import { css } from "@emotion/react";
import StoryLayout from "@ComponentFarm/modules/story_layout/StoryLayout";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { confirmModalStore } from "MobxFarm/store";
import ConfirmModal from "./ConfirmModal";
import Modal from "./Modal";

const meta: Meta = {
  title: "MODULES/Modal",
  tags: ["autodocs"],
  args: {
    Desc: {
      usages: `confirmModal 사용시 content 내용에 커스텀 테그 사용하려면, 따로 컴포넌트화해서, 
      예를 들어 <List /> 컴포넌트안에서 confirmModal 사용시 <List /> 바깥에서 <ListContent /> 작성해서, 
      content:<ListContent /> 로 사용해야됨

      const ListItem = () => {
        어쩌고 저쩌고.
      }

      const List = () => {
        const confirmModal = () => {
          runInAction(() => {
            confirmModalStore.openModal({
              title: '제품 이미지 등록 완료',
              content: <ListItem />,
              onFormSubmit: () => {
                console.log('Form submitted!');
              },
              onCancel: () => {
                alert('aaa');
              },
              showCancelButton: false,
            });
          });
        };
      }
      
      `,
    },
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: { type: "code" }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export default meta;

type ModalButtonProps = {
  children: React.ReactNode;
};

interface Props extends ModalButtonProps {
  darkMode: boolean;
}

const StoryModal: Story<Props> = (args, children) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handlerClose = () => {
    setIsOpen(false);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal title="제목" isOpen={isOpen} onClose={handlerClose}>
        <p>This is my modal content.</p>
      </Modal>
    </StoryLayout>
  );
};
export const Default = StoryModal.bind({});

const StoryModal2: Story<Props> = (args, children) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handlerClose = () => {
    setIsOpen(false);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        title="제목"
        isOpen={isOpen}
        onClose={handlerClose}
        showCancelButton={false}
      >
        <p>This is my modal content.</p>
      </Modal>
    </StoryLayout>
  );
};
export const notCancelButton = StoryModal2.bind({});

const StoryModal3: Story<Props> = (args, children) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handlerClose = () => {
    setIsOpen(false);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        title="제목"
        isOpen={isOpen}
        onClose={handlerClose}
        showCloseButton
      >
        <div style={{ width: 600 }}>This is my modal content.</div>
      </Modal>
    </StoryLayout>
  );
};
export const showCloseButton = StoryModal3.bind({});

const StoryModal4: Story<Props> = (args, children) => {
  const confirmModal = () => {
    runInAction(() => {
      confirmModalStore.openModal({
        title: "제목",
        content: <div>모달 내용</div>,
      });
    });
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Button type="button" onClick={confirmModal}>
        등록
      </Button>
      <ConfirmModal />
    </StoryLayout>
  );
};
export const confirmModal = StoryModal4.bind({});

const StoryModal5: Story<Props> = (args, children) => {
  const confirmModal2 = () => {
    runInAction(() => {
      confirmModalStore.openModal({
        title: "제목",
        content: <div>모달 내용</div>,
        onFormSubmit: () => {
          console.log("Form submitted!");
        },
        onCancel: () => {
          alert("aaa");
        },
        showCloseButton: true,
        submitButtonText: "등록",
        cancelButtonText: "취소텍스트",
      });
    });
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Button type="button" onClick={confirmModal2}>
        등록
      </Button>
      <ConfirmModal />
    </StoryLayout>
  );
};
export const confirmModalButton = StoryModal5.bind({});
