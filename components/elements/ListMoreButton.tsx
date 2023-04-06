import { ArrowDown } from "@emotion-icons/bootstrap/ArrowDown";
import { ListMoreBtn } from "./ComponentsSty";

interface Props {
  handler: Function;
}

export default function ListMoreButton(props: Props) {
  const handlerBtnClick = () => {
    props.handler();
  };

  return (
    <ListMoreBtn onClick={handlerBtnClick}>
      <ArrowDown width={15} height={18} />
    </ListMoreBtn>
  );
}
