import { PlusLg } from "@emotion-icons/bootstrap";
import { MachineBoardList } from "ApiFarm/machine";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { MachineBoardContentsInfo } from "ComponentsFarm/pageComp/machine/MachineBoardContentsInfo";
import {
  iMachineListItem,
  iMachineListRequest,
} from "InterfaceFarm/MachineBoard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MachineBoard() {
  const [listCount, setCount] = useState<number>(-1);
  const [listContents, setlistContents] = useState<Array<iMachineListItem>>([]);
  const [listRequestParams, setListRequestParams] =
    useState<iMachineListRequest>({
      current_num: 1,
      per_num: 10,
    });
  const router = useRouter();
  const handlerBtnMore = () => {
    listRequestParams.current_num = listRequestParams.current_num + 1;
    setListRequestParams(listRequestParams);
    getList();
  };

  const handlerBtnPost = () => {
    router.push("/board/machine/post");
  };

  const handlerClickView = (row: iMachineListItem) => {
    router.push(`/board/machine/confirm/${row.sbm_idx}`);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const result = await MachineBoardList(listRequestParams);

    let viewList: iMachineListItem[] = [];
    if (listRequestParams.current_num > 1) {
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
            {listCount === 0 && (
              <EmptyView>데이터 조회 결과가 존재하지 않습니다.</EmptyView>
            )}
            {listContents?.map((item, idx) => {
              return (
                <li key={idx} className={"box"}>
                  <MachineBoardContentsInfo
                    dataItem={item}
                    onClick={(row) => {
                      handlerClickView(row);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {listCount > 0 && listCount > listContents.length && (
            <ListMoreButton handler={handlerBtnMore} />
          )}
        </Container>
        <button className={"btn-post"} onClick={handlerBtnPost}>
          <PlusLg width={16} height={16} />
        </button>
      </FeedBackContents>
    </Layout>
  );
}
