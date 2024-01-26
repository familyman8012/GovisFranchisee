import React, { useEffect, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import { fetchUser } from "ApiFarm/store";
import StoryLayout from "@ComponentFarm/modules/story_layout/StoryLayout";
import { Button } from "@ComponentFarm/atom/Button/Button";
import StoreList from "./StoreList";
import StorePopup, { StorePopupProps } from "./StorePopup";

const meta: Meta = {
  title: "Modal/StorePopup",
  tags: ["autodocs"],
  args: {
    TotalProps: {
      props: ``,
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

interface Props extends StorePopupProps {
  darkMode: boolean;
}

const StoryStorePopup: Story<Props> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listStore, setListStore] = useState<{ id: number; name: string }[]>(
    []
  );

  const { data } = useQuery<any, any>([`user-detail`, "325"], () =>
    fetchUser(325)
  );

  useEffect(() => {
    if (data) {
      setListStore(data.store_list);
    }
  }, [data]);

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
      <div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Store Modal
        </Button>
      </div>
      <StorePopup
        // singleSelect
        listStore={listStore}
        setListStore={setListStore}
        isOpen={isOpen}
        onClose={handlerClose}
      />
      <StoreList listStore={listStore} setListStore={setListStore} />
    </StoryLayout>
  );
};
export const Default = StoryStorePopup.bind({});
