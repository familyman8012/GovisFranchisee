import SearchInput from "ComponentsFarm/elements/SearchInput";
import style from "StyleFarm/scss/modules/Notice.module.scss";
import { toClasses } from "LibFarm/toClasses";
import { useEffect, useState, useRef } from "react";

interface NoticeListHeadeProps {
  initialKeyword: string;
  callbackSearch: Function;
}

const NoticeListHeader = ({ callbackSearch, initialKeyword }: NoticeListHeadeProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const handlerOnChange = () => {
    callbackSearch(searchKeyword);
  };

  useEffect(() => {
    if (ref.current && initialKeyword) ref.current.value = initialKeyword;
  }, []);

  return (
    <div className={toClasses([style["notice__header"]])}>
      <SearchInput
        ref={ref}
        placeholder={"제목 + 내용"}
        reverse
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handlerOnChange();
          }
        }}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        callbackSearch={handlerOnChange}
      />
    </div>
  );
};

export default NoticeListHeader;
