import React from 'react';
import { DndContext, closestCenter, DndContextProps } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { Table, TableWrap } from '@ComponentFarm/common';

type UniqueIdentifier = string | number;

interface Props
  extends Pick<
    DndContextProps,
    'onDragCancel' | 'onDragEnd' | 'onDragMove' | 'onDragOver' | 'onDragStart'
  > {
  caption?: React.ReactNode;
  cols?: React.ReactNode;
  thead?: React.ReactNode;
  disabled?: boolean;
  ids?: UniqueIdentifier[];
}

const Sortable = ({
  caption,
  cols,
  thead,
  ids,
  disabled,
  children,
  ...listeners
}: React.PropsWithChildren<Props>) => {
  return (
    <DndContext
      modifiers={[
        restrictToVerticalAxis,
        restrictToFirstScrollableAncestor,
        restrictToParentElement,
      ]}
      collisionDetection={closestCenter}
      {...listeners}
    >
      <TableWrap>
        <Table className="basic">
          {caption && <caption>{caption}</caption>}
          {cols && <colgroup>{cols}</colgroup>}
          {thead && <thead>{thead}</thead>}
          <tbody>
            <SortableContext items={ids ?? []} disabled={disabled}>
              {children}
            </SortableContext>
          </tbody>
        </Table>
      </TableWrap>
    </DndContext>
  );
};

export default Sortable;
