import { useState } from 'react';

function useSortable(updateParams: any) {
  const [sortState, setSortState] = useState<{
    field?: string;
    type?: 'asc' | 'desc';
  }>({});

  const toggleSort = (field: string) => {
    if (sortState.field === field) {
      if (sortState.type === 'asc') {
        updateParams({ sort_target: field, sort_type: 'desc' });
        setSortState({ field, type: 'desc' });
      } else {
        updateParams({ sort_target: field, sort_type: 'asc' });
        setSortState({ field, type: 'asc' });
      }
    } else {
      updateParams({ sort_target: field, sort_type: 'asc' });
      setSortState({ field, type: 'asc' });
    }
  };

  return { sortState, setSortState, toggleSort };
}

export default useSortable;
