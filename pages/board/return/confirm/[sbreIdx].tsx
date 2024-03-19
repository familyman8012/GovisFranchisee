import { ChatRight } from "@emotion-icons/bootstrap";
import { EditOutline } from "@emotion-icons/evaicons-outline";
import { ReturnApplyViewinfo } from "ApiFarm/return";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { ReturnBoardContentsInfo } from "ComponentsFarm/pageComp/return/ReturnBoardContentsInfo";
import {
  RegisterFormView,
  ReturnApplyView,
} from "ComponentsFarm/pageComp/return/style";
import { useRouter } from "next/router";
import React from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";

export default function ReturnBoardView() {
  const router = useRouter();
  const { sbreIdx } = router.query;

  const handlerNavBarMenuClick = () => {
    router.push("/board/return");
  };

  const { data } = useQuery(
    ["return-apply-view"],
    () => ReturnApplyViewinfo(String(sbreIdx)),
    {
      enabled: !!sbreIdx,
    }
  );

  // 클레임 분류
  const occur_type_text = useMemo(
    () =>
      data?.occur_type
        .map(
          (el: number) =>
            (el === 0 && "이물 혼입") ||
            (el === 1 && "배송 불량") ||
            (el === 2 && "품질 불량") ||
            (el === 3 && "입수 부족") ||
            (el === 9 && "기타")
        )
        .join(" / "),
    [data?.occur_type]
  );

  // 요청 사항
  const processRequest = useMemo(
    () =>
      data?.process_request === 0
        ? "반품"
        : data?.process_request === 1
        ? "교환"
        : "개선요청",
    [data?.process_request]
  );

  return (
    <Layout
      menuIconType="back"
      className="fullWidth"
      handlerMenuIcon={handlerNavBarMenuClick}
    >
      <FeedBackContents>
        <div className={"recipe-feedback"}>
          <ReturnApplyView className="view">
            {data && (
              <>
                <div className="content_area">
                  <div className={"contents-prefix-box"}>
                    <Container className={"recipe-feedback-view "}>
                      {data && (
                        <ReturnBoardContentsInfo
                          dataItem={{
                            status: data.status,
                            created_at: data.created_at,
                            product_name: data.product_name,
                            sbre_idx: Number(sbreIdx),
                            unread_content_count: 0,
                            delete_possible: "",
                          }}
                        />
                      )}
                    </Container>
                  </div>
                  <Container className={"contents "}>
                    <RegisterFormView>
                      <div className="box">
                        <div className="tit">제품 유형</div>
                        <p>
                          {data.product_type === 0
                            ? "알 수 없음"
                            : data.product_type === 1
                            ? "전용"
                            : data.product_type === 2
                            ? "범용"
                            : data.product_type === 3
                            ? "도우"
                            : "-"}
                        </p>
                      </div>
                      <div className="box">
                        <div className="tit">입고일자</div>
                        <p>{data.receiving_date}</p>
                      </div>
                      <div className="box">
                        <div className="tit">유통기한/제조일자</div>
                        <p>{data.expiration_date}</p>
                      </div>
                      <div className="box">
                        <div className="tit">클레임 제품수량</div>
                        <p>{data.product_quantity}</p>
                      </div>
                      <div className="box">
                        <div className="tit">클레임 분류</div>
                        <p>{occur_type_text}</p>
                      </div>
                      <div className="box">
                        <div className="tit">요청사항</div>
                        <p>{processRequest}</p>
                      </div>
                      <div className="box">
                        <div className="tit">이미지</div>
                        <ul className="area_img_view">
                          {Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <React.Fragment key={i}>
                                {data[`attached_image_${i + 1}`] === null ? (
                                  <li className="blank"></li>
                                ) : (
                                  <li>
                                    <img
                                      src={data[`attached_image_${i + 1}`]}
                                      alt={`반품이미지${i + 1}`}
                                    />
                                  </li>
                                )}
                              </React.Fragment>
                            ))}
                        </ul>
                      </div>
                      <div className="box">
                        <div className="tit">상세 내용</div>
                        <p>
                          {data?.detail_content
                            ?.split("\n")
                            .map((line: string, i: number) => {
                              return (
                                <React.Fragment key={`line${i}`}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              );
                            })}
                        </p>
                      </div>
                    </RegisterFormView>
                  </Container>
                </div>
                <div
                  className={`box_btn_area ${data?.status === 2 ? "fin" : ""}`}
                >
                  {data?.status !== 2 && (
                    <button
                      className="btn btn_modify"
                      onClick={() =>
                        router.push(`/board/return/modify/${sbreIdx}`)
                      }
                    >
                      <EditOutline width={22} height={22} />
                      <span className="txt">수정</span>
                    </button>
                  )}
                  <button
                    className="btn btn_chat"
                    onClick={() => router.push(`/board/return/view/${sbreIdx}`)}
                  >
                    <ChatRight width={22} height={22} />
                    <span className="txt">채팅 및 답변확인</span>
                  </button>
                </div>{" "}
              </>
            )}
          </ReturnApplyView>
        </div>
      </FeedBackContents>
    </Layout>
  );
}
