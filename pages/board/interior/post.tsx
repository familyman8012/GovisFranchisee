import { InteriorBoardTitlePost } from "ApiFarm/InteriorModul";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { iInteriorTitlePostRequest } from "InterfaceFarm/InteriorBoard";

import { useRouter } from "next/router";
import { useState } from "react";
import { authStore } from "src/mobx/store";

export default function InteriorBoardPost() {
  const router = useRouter();
  const { loading, session } = authStore;
  const [title, setTitle] = useState("");

  const handlerNavBarMenuClick = () => {
    router.push("/board/interior");
  };

  const handlerOnClickPost = async () => {
    const userId = Number(session?.info?.user_id);
    const data: iInteriorTitlePostRequest = {
      title,
      user_id: userId,
    };

    const result = await InteriorBoardTitlePost(data);
    router.push(`/board/interior/view/${result.sbi_idx}`);
  };

  return (
    <Layout menuIconType="back" handlerMenuIcon={handlerNavBarMenuClick} className="fullWidth">
      <FeedBackContents>
        <div className={"contents-prefix-box height-full"}>
          <Container className={"contents recipe-feedback-post"}>
            <pre>
              <h6>[알려드립니다.]</h6>
              <p>
                글 등록 후 확인이 되는대로 답변 받으실 수 있습니다.
                <br />
                아래 양식에 맞춰 내용을 기입해주시면
                <br />
                더욱 정확한 피드백을 받으실 수 있습니다.
              </p>
            </pre>
            <input
              placeholder={"인테리어 AS 사항의 글제목을 입력하세요."}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <button
              className={"btn-contents"}
              disabled={!title}
              onClick={() => {
                handlerOnClickPost();
              }}
            >
              상세내용 쓰기 &gt;{" "}
            </button>
          </Container>
        </div>
      </FeedBackContents>
    </Layout>
  );
}
