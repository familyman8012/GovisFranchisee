import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { updateRecipeStepOrder } from "ApiFarm/product-recipe";
import {
  IRecipeFormFields,
  IRecipeStepFormFields,
} from "InterfaceFarm/product-recipe";
import Modal from "@ComponentFarm/modules/Modal/Modal";
import { Button } from "@ComponentFarm/atom/Button/Button";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import Sortable from "../sortable/Sortable";
import SortableItem from "../sortable/SortableItem";

interface Props {
  recipeSteps: IRecipeStepFormFields[];
  onChangeOrder: () => void;
}

const RecipeStepOrderStyle = styled.div`
  display: inline-flex;
  margin-left: 1.2rem;
`;

const RecipeStepModalContent = styled.div`
  max-width: 51.2rem;
  display: flex;
  flex-direction: column;
`;

const RecipeStepOrder = ({ recipeSteps, onChangeOrder }: Props) => {
  const { watch } = useFormContext<IRecipeFormFields>();
  const [showOrder, setShowOrder] = useState(false);
  const [sortableItems, setSortableItems] = useState(
    recipeSteps.map((item) => ({
      id: item.recipe_step_idx ?? 0,
      name: item.recipe_step_name,
    }))
  );

  const orderMutate = useMutation(updateRecipeStepOrder, {
    onSuccess: () => {
      toast.info("레시피 단계 순서가 변경되었습니다.");
      setShowOrder(false);
      onChangeOrder();
    },
  });

  // reipceSteps 변화시 갱신
  useEffect(() => {
    setSortableItems(
      recipeSteps.map((item) => ({
        id: item.recipe_step_idx ?? 0,
        name: item.recipe_step_name,
      }))
    );
  }, [recipeSteps]);

  const stepIds = useMemo(
    () => sortableItems.map((item) => item.id ?? 0),
    [sortableItems]
  );

  const swap = useCallback(
    (items: typeof sortableItems, current: number, changed: number) => {
      const newItems = [...items];
      const [removed] = newItems.splice(current, 1);
      newItems.splice(changed, 0, removed);
      return newItems;
    },
    []
  );

  return (
    <RecipeStepOrderStyle>
      <Button
        variant="gostPrimary"
        size="md"
        onClick={() => setShowOrder(true)}
      >
        단계 순서 변경
      </Button>
      <Modal
        isOpen={showOrder}
        showCancelButton={false}
        showCloseButton
        title="레시피 단계 순서 변경"
        submitButtonText="저장"
        onClose={() => setShowOrder(false)}
        disabledFormSubmit={orderMutate.isLoading}
        onFormSubmit={() => {
          orderMutate.mutate({
            product_info_idx: watch("product_info_idx") ?? -1,
            recipe_info_idx: watch("recipe_info_idx") ?? -1,
            change_info_list: sortableItems.map((item, idx) => ({
              recipe_step_idx: item.id,
              sort_number: idx,
            })),
          });
        }}
      >
        <RecipeStepModalContent>
          <Sortable
            cols={
              <>
                <col width={50} />
                <col />
              </>
            }
            thead={
              <tr>
                <th aria-label="sort-field" />
                <th>단계명</th>
              </tr>
            }
            ids={stepIds}
            onDragEnd={(event) => {
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
            {sortableItems.length === 0 && (
              <tr>
                <td colSpan={2}>
                  <Empty>데이터가 없습니다.</Empty>
                </td>
              </tr>
            )}
            {sortableItems.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <td>{item.name}</td>
              </SortableItem>
            ))}
          </Sortable>
        </RecipeStepModalContent>
      </Modal>
    </RecipeStepOrderStyle>
  );
};

export default RecipeStepOrder;
