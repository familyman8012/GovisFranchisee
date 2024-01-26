/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Meta, Story } from "@storybook/react";
import { css } from "@emotion/react";
import StoryLayout from "@ComponentFarm/modules/story_layout/StoryLayout";
import { keywordType } from "@ComponentFarm/template/fc/coupons/ListHandler";
import useQueryParams from "HookFarm/useQueryParams";
import SearchKeyword from "./SearchKeyword";

// Create a client

const meta: Meta = {
  title: "molecule/SearchKeyword",
  tags: ["autodocs"],
  args: {
    Desc: `기본 라브리 사용, 실사용시 totalItemsCount에는 data?.count 등 count값`,
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

interface Props {
  darkMode: boolean;
}

const StoryPagination: Story<Props> = (args) => {
  const [params] = useQueryParams({
    page: 1,
    size: 10,
    search_type: 0,
  });

  const searchOption = [
    {
      label: "쿠폰명",
      value: "0",
    },
    {
      label: "태그",
      value: "1",
    },
  ];

  const handlerKeyword = (keyword: keywordType) => {
    console.log("keyword", keyword);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <SearchKeyword
        params={params}
        selOption={searchOption}
        handler={handlerKeyword}
      />
    </StoryLayout>
  );
};
export const Default = StoryPagination.bind({});

const StoryPagination2: Story<Props> = (args) => {
  const searchOption = [
    {
      label: "쿠폰명",
      value: "0",
    },
    {
      label: "태그",
      value: "1",
    },
  ];

  const handlerKeyword = (keyword: keywordType) => {
    console.log("keyword", keyword);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <SearchKeyword selOption={searchOption} handler={handlerKeyword} />
    </StoryLayout>
  );
};
export const NotParams = StoryPagination2.bind({});

const StoryPagination3: Story<Props> = (args) => {
  const handlerKeyword = (keyword: keywordType) => {
    console.log("keyword", keyword);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <SearchKeyword handler={handlerKeyword} />
    </StoryLayout>
  );
};
export const HasNotSelect = StoryPagination3.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["setPageNumber"] },
};
