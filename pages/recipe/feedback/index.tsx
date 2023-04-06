import { PlusLg } from "@emotion-icons/bootstrap";
import { useEffect, useState } from "react";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import ListMoreButton from "ComponentsFarm/elements/ListMoreButton";
import { IRecipeFeedbackItem } from "InterfaceFarm/ProductFeedback";
import { useRouter } from "next/router";
import { RecipeFeedbackList } from "ApiFarm/productFeedback";
import { EmptyView } from "ComponentsFarm/elements/EmptyView";
import { RecipeFeedbackContentsInfo } from "ComponentsFarm/pageComp/feedback/RecipeFeedbackContentsInfo";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";

export default function RecipeFeedback() {
  const [listCount, setCount] = useState<number>(-1);
  const [listContents, setListContents] = useState<Array<IRecipeFeedbackItem>>([]);
  const [listRequestParams, setListRequestParams] = useState({
    size: 10,
    page: 1,
  });
  const router = useRouter();
  const handlerBtnMore = () => {
    listRequestParams.page = listRequestParams.page + 1;
    setListRequestParams(listRequestParams);
    getList();
  };

  const handlerBtnPost = () => {
    router.push("/recipe/feedback/post");
  };

  const handlerClickView = (row: IRecipeFeedbackItem) => {
    router.push(`/recipe/feedback/view/${row.sbf_idx}`);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const result = await RecipeFeedbackList(listRequestParams);

    let viewList: IRecipeFeedbackItem[] = [];
    if (listRequestParams.page > 1) {
      viewList = [...listContents, ...result.list];
    } else {
      viewList = result.list;
    }

    setListContents(viewList);
    setCount(result.count);
  };

  return (
    <Layout>
      <FeedBackContents>
        <Container className={"contents recipe-feedback-list"}>
          {listCount === -1 && <div></div>}
          <ul>
            {listCount === 0 && <EmptyView>데이터 조회결과가 존재하지 않습니다.</EmptyView>}
            {listContents?.map((item, idx) => {
              return (
                <li className={"box"} key={idx}>
                  <RecipeFeedbackContentsInfo
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
