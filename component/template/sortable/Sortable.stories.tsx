//@ts-nocheck
import React, { useMemo, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { css } from "@emotion/react";
import StoryLayout from "@ComponentFarm/modules/story_layout/StoryLayout";
import Sortable from "./Sortable";
import SortableItem from "./SortableItem";

const meta: Meta = {
  title: "TEMPLATE/Sortable",
  tags: ["autodocs"],
  args: {
    disabled: false,
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
  disabled?: boolean;
}

const swap = (items: any[], sourceIndex: number, destinationIndex: number) => {
  const newItems = [...items];
  const [removed] = newItems.splice(sourceIndex, 1);
  newItems.splice(destinationIndex, 0, removed);
  return newItems;
};

export const Default: Story<Props> = ({ darkMode, disabled }) => {
  const [sortableItems, setSortableItems] = useState([
    {
      id: 1,
      name: "도우",
    },
    {
      id: 2,
      name: "토마토 소스",
    },
    {
      id: 3,
      name: "페퍼로니",
    },
  ]);

  const ids = useMemo(
    () => sortableItems.map((item) => item.id),
    [sortableItems]
  );

  return (
    <StoryLayout
      darkMode={darkMode}
      customCss={css`
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        align-items: flex-start;
      `}
    >
      {JSON.stringify(sortableItems)}
      <Sortable
        disabled={disabled}
        cols={
          <>
            <col width={50} />
            <col />
          </>
        }
        thead={
          <tr>
            <th aria-label="sort" />
            <th>단계명</th>
          </tr>
        }
        ids={ids}
        onDragEnd={(event: any) => {
          const { active, over } = event;
          if (!over?.id) return;

          if (active.id !== over.id) {
            setSortableItems((items) =>
              swap(
                items,
                items.findIndex((item) => item.id === active.id),
                items.findIndex((item) => item.id === over.id)
              )
            );
          }
        }}
      >
        {sortableItems.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <td>{item.name}</td>
          </SortableItem>
        ))}
      </Sortable>
    </StoryLayout>
  );
};
