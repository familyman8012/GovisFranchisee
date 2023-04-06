import React from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { numberStore } from "src/mobx/store";

function Index() {
  const addNumber = () => {
    runInAction(() => {
      numberStore.number += 1;
    });
  };
  const minusNumber = () => {
    runInAction(() => {
      numberStore.number -= 1;
    });
  };
  return (
    <div>
      {numberStore.name}
      <button onClick={addNumber}>+1</button>
      <button onClick={minusNumber}>+1</button>
      <button onClick={() => numberStore.reset()}>Reset</button>
    </div>
  );
}

export default observer(Index);
