import { ArrowDown } from "@emotion-icons/bootstrap/ArrowDown";
import { ListMoreBtn } from "./ComponentsSty";

interface Props {
  loading?: boolean;
  handler: Function;
}

export default function ListMoreButton(props: Props) {
  const handlerBtnClick = () => {
    props.handler();
  };

  return (
    <ListMoreBtn onClick={handlerBtnClick} disabled={props.loading}>
      <ArrowDown width={15} height={18} />
    </ListMoreBtn>
  );
}
