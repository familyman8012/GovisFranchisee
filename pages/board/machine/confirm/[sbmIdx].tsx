import { ChatRight } from "@emotion-icons/bootstrap";
import { EditOutline } from "@emotion-icons/evaicons-outline";
import { MachineApplyViewinfo } from "ApiFarm/machine";
import Layout from "ComponentsFarm/layouts";
import { Container } from "ComponentsFarm/layouts/styles";
import { FeedBackContents } from "ComponentsFarm/pageComp/feedback/styles";
import { MachineBoardContentsInfo } from "ComponentsFarm/pageComp/machine/MachineBoardContentsInfo";
import {
  RegisterFormView,
  MachineApplyView,
} from "ComponentsFarm/pageComp/machine/style";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function MachineBoardView() {
  const router = useRouter();
  const { sbmIdx } = router.query;

  const handlerNavBarMenuClick = () => {
    router.push("/board/machine");
  };

  const { data } = useQuery(
    ["machine-apply-view", sbmIdx],
    () => MachineApplyViewinfo(String(sbmIdx)),
    {
      enabled: !!sbmIdx,
    }
  );

  return (
    <Layout
      menuIconType="back"
      className="fullWidth"
      handlerMenuIcon={handlerNavBarMenuClick}
    >
      <FeedBackContents>
        <div className={"recipe-feedback"}>
          <MachineApplyView className="view">
            {data && (
              <>
                <div className="content_area">
                  <div className={"contents-prefix-box"}>
                    <Container className={"recipe-feedback-view "}>
                      {data && (
                        <MachineBoardContentsInfo
                          dataItem={{
                            status: data.status,
                            created_at: data.created_at,
                            machine_name: data.machine_name,
                            sbm_idx: Number(sbmIdx),
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
                        router.push(`/board/machine/modify/${sbmIdx}`)
                      }
                    >
                      <EditOutline width={22} height={22} />
                      <span className="txt">수정</span>
                    </button>
                  )}
                  <button
                    className="btn btn_chat"
                    onClick={() => router.push(`/board/machine/view/${sbmIdx}`)}
                  >
                    <ChatRight width={22} height={22} />
                    <span className="txt">채팅 및 답변확인</span>
                  </button>
                </div>{" "}
              </>
            )}
          </MachineApplyView>
        </div>
      </FeedBackContents>
    </Layout>
  );
}
