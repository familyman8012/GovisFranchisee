import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Image } from "@emotion-icons/bootstrap/Image";

import { iFQSDetail, iFQSDetailSection } from "InterfaceFarm/Fqs";
import { fetchFQSDetail } from "ApiFarm/fqs";
import useBack from "HookFarm/useBack";

import Layout from "ComponentsFarm/layouts";
import { ListLoading } from "ComponentsFarm/elements/Loading";
import {
  FqsDetailPageStyle,
  NoImage,
} from "ComponentsFarm/pageComp/fqs/styles";
import dayjs from "dayjs";
import DetailSection from "ComponentsFarm/pageComp/fqs/DetailSection";

const getMimeTypeForVideo = (filename: string) => {
  switch (true) {
    case /\.(mov)$/.test(filename):
      return "video/quicktime";
    case /\.(mp4)$/.test(filename):
      return "video/mp4";
    case /\.(webm)$/.test(filename):
      return "video/webm";
    default:
      return "";
  }
};

export default function FoodQualityDetail() {
  const router = useRouter();
  const back = useBack({
    passQuery: true,
  });

  const idx = useMemo(
    () => parseInt(router.query.idx as string),
    [router.query]
  );

  const { data, isLoading } = useQuery(
    ["fqs", "detail", idx],
    () => fetchFQSDetail(idx),
    {
      onError: () => back(),
    }
  );

  if (isLoading) {
    return (
      <Layout menuIconType="back" handlerMenuIcon={back} title="상세 정보">
        <ListLoading full />
      </Layout>
    );
  }

  return (
    <Layout menuIconType="back" handlerMenuIcon={back} title="상세 정보">
      <FqsDetailPageStyle>
        <div className="detail-info">
          <div className="video-wrapper">
            <video poster={data?.official_image} controls playsInline>
              <source
                src={data?.video_url}
                type={getMimeTypeForVideo(data?.video_url ?? "")}
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="data">
            <ul>
              <li className="date">
                {dayjs(data?.created_at).format("YYYY-MM-DD")}
              </li>
              <li className="category">{data?.category_name}</li>
            </ul>
            <div className="score">{data?.overall_score_100}점</div>
          </div>
        </div>
        <section className="section-info">
          <h3 className="title">구간정보</h3>
          <div className="section-info__wrapper">
            {data?.section.map((section: iFQSDetailSection) => (
              <DetailSection section={section} key={section.section_type} />
            ))}
          </div>
        </section>
      </FqsDetailPageStyle>
    </Layout>
  );
}
