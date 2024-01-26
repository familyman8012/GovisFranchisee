import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from '@ComponentFarm/atom/Button/Button';
import { Search } from '@ComponentFarm/atom/icons';

export type checkedItemType = {
  idx: string;
  name: string;
};

interface ISearchKeyword {
  placeholder?: string;
  handler: (keyword: {
    search_target?: string;
    search_keyword: string;
  }) => void;
  keyword: {
    search_target: string;
    search_keyword: string;
  };
  setKeyword: Dispatch<
    SetStateAction<{
      search_target: string;
      search_keyword: string;
    }>
  >;
}
export const SearchKeywordWrap = styled.div`
  display: flex;
  width: fit-content;
  height: 4rem;
  border: 1px solid var(--color-neutral90);
  border-radius: 0.4rem;

  /* &:focus {
    border: red;
  } */

  &:focus-within {
    border: 1px solid var(--color-neutral10);
  }

  .select_library_control,
  .inp {
    min-height: auto;
    height: 100%;
    border: none !important;
    border-radius: 0;
  }

  button {
    height: 100%;
    padding: 0 1.2rem;
    border-radius: 0;
    border: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  & > div:nth-of-type(1),
  & > .inp {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  & > div:nth-of-type(1) + .inp {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .select_library_control {
    border-radius: inherit;
    border-right: 0 !important;
  }

  .inp {
    width: auto;
  }
`;

export type SearchkeywordType = {
  search_target?: string;
  search_keyword: string;
};

const SearchKeyword = ({
  placeholder,
  handler,
  keyword,
  setKeyword,
}: ISearchKeyword) => {
  const handleSearch = () => {
    handler({ search_keyword: keyword.search_keyword }); // selOption이 없을 경우 이렇게 호출
  };

  useEffect(() => {
    if (keyword.search_keyword === '') {
      handler({ search_keyword: '' });
    }
  }, [keyword.search_keyword]);

  // console.log('filters', filters);

  const searchKeywordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const inputs = searchKeywordRef.current?.querySelectorAll('input');
    const handleFocus = () => {
      if (searchKeywordRef.current) {
        searchKeywordRef.current.style.border =
          '1px solid var(--color-neutral10)';
      }
    };
    const handleBlur = () => {
      if (searchKeywordRef.current) {
        searchKeywordRef.current.style.border = '';
      }
    };
    inputs?.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });
    // Cleanup 함수: 이펙트가 끝날 때 (언마운트나 리렌더링 될 때) 이벤트 리스너를 제거합니다.
    return () => {
      inputs?.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  return (
    <SearchKeywordWrap ref={searchKeywordRef} className="box_searchkeyword">
      <input
        type="text"
        className="inp"
        placeholder={placeholder}
        value={keyword.search_keyword}
        onChange={e =>
          setKeyword({ ...keyword, search_keyword: e.target.value })
        }
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <Button
        type="button"
        variant="transparent"
        IconOnly={<Search />}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSearch();
        }}
      >
        <span className="hiddenZoneV">검색</span>
      </Button>
    </SearchKeywordWrap>
  );
};

export default SearchKeyword;
