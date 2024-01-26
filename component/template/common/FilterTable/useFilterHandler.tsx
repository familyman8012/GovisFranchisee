import { useMemo, useState } from 'react';
import { checkedItemType } from '@ComponentFarm/modal/SearchPopup/SearchPopup';

function useSelectItems(
  search_target: string,
  initial: checkedItemType[] = []
) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectItems, setSelectItems] = useState<checkedItemType[]>(initial);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<{
    [key: string]: string | null;
  }>({ search_target });

  const initialValues = useMemo(
    () => selectItems.map(item => item.idx),
    [selectItems]
  );

  const handleDeleteItem = (itemIdx: string) => {
    const updatedItems = selectItems.filter(item => item.idx !== itemIdx);
    setSelectItems(updatedItems);
  };

  return {
    isFirstLoad,
    setIsFirstLoad,
    selectItems,
    setSelectItems,
    isOpen,
    setIsOpen,
    filters,
    setFilters,
    initialValues,
    handleDeleteItem,
  };
}

export default useSelectItems;
