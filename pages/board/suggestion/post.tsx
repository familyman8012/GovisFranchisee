import { SuggestionBoardTitlePost } from "ApiFarm/suggestion";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { iSuggestionTitlePostRequest } from "InterfaceFarm/SuggestionBoard";
import { toClasses } from "LibFarm/toClasses";
import { useRouter } from "next/router";
import { useState } from "react";
import { authStore } from "src/mobx/store";

export default function SuggestionBoardPost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(0);

  const handlerNavBarMenuClick = () => {
    router.push("/board/suggestion");
  };

  const handlerOnClickPost = async () => {
    const userId = Number(authStore.user_info?.user_idx);
    const data: iSuggestionTitlePostRequest = {
      title,
      category,
      user_id: userId,
    };

    const result = await SuggestionBoardTitlePost(data);
    router.push(`/board/suggestion/view/${result.sbq_idx}`);
  };

  return (
    <Layout
      menuIconType="back"
      handlerMenuIcon={handlerNavBarMenuClick}
      className="fullWidth"
    >
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
            {/* 사항선택 문의 / 건의 */}
            <div className="suggestion-category-title">사항선택</div>
            <div className="suggestion-category">
              <label
                className={toClasses([
                  `suggestion-checkbox`,
                  category === 0 ? "suggestion-checkbox--checked" : "",
                  undefined,
                ])}
              >
                <input
                  name="category"
                  type={"radio"}
                  checked={category === 0}
                  onChange={() => setCategory(0)}
                />
                문의
              </label>
              <label
                className={`suggestion-checkbox ${
                  category === 1 ? "suggestion-checkbox--checked" : ""
                }`}
              >
                <input
                  name="category"
                  type={"radio"}
                  checked={category === 1}
                  onChange={() => setCategory(1)}
                />
                건의
              </label>
            </div>
            <input
              placeholder={"문의/건의 할 사항의 글제목을 입력하세요."}
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
