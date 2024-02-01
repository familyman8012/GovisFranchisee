import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Menu from "@ComponentFarm/atom/icons/Menu";

const SortableItem = ({
  id,
  children,
  disabled,
}: React.PropsWithChildren<{ id: number | string; disabled?: boolean }>) => {
  const { attributes, setNodeRef, transform, isDragging, listeners } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? "1" : "auto",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {!disabled && (
        <td aria-label="sort-icon">
          <Menu customCss="path {fill: var(--color-gray500);}" />
        </td>
      )}
      {children}
    </tr>
  );
};

export default SortableItem;
