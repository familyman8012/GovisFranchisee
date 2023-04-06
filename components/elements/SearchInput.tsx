import React, { useEffect, useState, RefObject, useCallback } from "react";
// import { FormGroup, Form, InputGroup } from "react-bootstrap";
import { Search } from "@emotion-icons/bootstrap/Search";
import { toClasses } from "LibFarm/toClasses";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: any;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  reverse?: boolean;
  callbackSearch?: Function;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnter?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ readOnly, disabled, className, placeholder, reverse, callbackSearch, onChange, onKeyDown, onEnter }, ref) => {
    const [focus, setFocus] = useState<boolean>(false);
    const refs = ref as RefObject<HTMLInputElement>;

    useEffect(() => {
      if (refs && refs.current) {
        setFocus(document.activeElement === refs.current);
      }
    }, []);

    const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        const $target = e.target as HTMLInputElement;
        onEnter && onEnter($target.value);
      }
    }, []);

    return (
      <div className={toClasses(["gv-search", focus ? "gv-search--focus" : "", className])}>
        {!reverse && (
          <span className="gv-search-icon">
            <Search size={20} />
          </span>
        )}
        <input
          className="gv-search__input"
          ref={ref}
          type="text"
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyPress={handleEnter}
        />
        {reverse && (
          <span className="gv-search-icon">
            <Search
              size={20}
              onClick={() => {
                callbackSearch && callbackSearch();
              }}
            />
          </span>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
