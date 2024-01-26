import React from 'react';

type StoreListProps = {
  listStore: { id: number; name: string }[];
  setListStore: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
};

const StoreList = ({ listStore, setListStore }: StoreListProps) => {
  const handleRemove = (id: number) => {
    setListStore(listStore.filter(store => store.id !== id));
  };

  return (
    <ul style={{ marginTop: '100px' }}>
      {listStore.map(el => (
        <span key={el.id} style={{ marginRight: '100px' }}>
          {el.name}
          <button type="button" onClick={() => handleRemove(el.id)}>
            제거
          </button>
        </span>
      ))}
    </ul>
  );
};

export default StoreList;
