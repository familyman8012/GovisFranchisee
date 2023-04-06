import { PlusLg } from "@emotion-icons/bootstrap/PlusLg";
import { InteriorBoardList } from "ApiFarm/InteriorModul";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { InteriorBoardContentsInfo } from "ComponentsFarm/pageComp/interior/InteriorBoardContentsInfo";
import { iInteriorListItem, iInteriorListRequest } from "InterfaceFarm/InteriorBoard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InteriorBoard() {
  const [listCount, setCount] = useState<number>(-1);
  const [listContents, setlistContents] = useState<Array<iInteriorListItem>>([]);
  const [listRequestParams, setListRequestParams] = useState<iInteriorListRequest>({
    page: 1,
    size: 10,
  });
  const router = useRouter();
  const handlerBtnMore = () => {
    listRequestParams.page = listRequestParams.page + 1;
    setListRequestParams(listRequestParams);
    getList();
  };

  const handlerBtnPost = () => {
    router.push("/board/interior/post");
  };

  const handlerClickView = (row: iInteriorListItem) => {
    router.push(`/board/interior/view/${row.sbi_idx}`);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const result = await InteriorBoardList(listRequestParams);

    let viewList: iInteriorListItem[] = [];
    if (listRequestParams.page > 1) {
      viewList = [...listContents, ...result.list];
    } else {
      viewList = result.list;
    }

    setlistContents(viewList);
    setCount(result.count);
  };

  return (
    <Layout>
      <FeedBackContents>
        <Container className={"contents recipe-feedback-list"}>
          {listCount === -1 && <div></div>}
          <ul>
            {listCount === 0 && <EmptyView>데이터 조회 결과가 존재하지 않습니다.</EmptyView>}
            {listContents?.map((item, idx) => {
              return (
                <li key={idx} className={"box"}>
                  <InteriorBoardContentsInfo
                    dataItem={item}
                    onClick={(row) => {
                      handlerClickView(row);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {listCount > 0 && listCount > listContents.length && <ListMoreButton handler={handlerBtnMore} />}
        </Container>
        <button className={"btn-post"} onClick={handlerBtnPost}>
          <PlusLg width={16} height={16} />
        </button>
      </FeedBackContents>
    </Layout>
  );
}
