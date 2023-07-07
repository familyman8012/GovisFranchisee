import { Image } from "@emotion-icons/bootstrap/Image";
import { iFQSDetailSection } from "InterfaceFarm/Fqs";
import { DetailSectionStyle, NoImage } from "./styles";

const DetailSection = ({
  section,
  onClick,
}: {
  section: iFQSDetailSection;
  onClick: (item: iFQSDetailSection) => void;
}) => {
  return (
    <DetailSectionStyle
      className="detail-section"
      onClick={() => onClick(section)}
    >
      <div className="image-wrapper">
        {section.section_frame_official_image ? (
          <img
            className="image"
            src={section.section_frame_official_image}
            alt={`${section.section_type} 구간 이미지`}
          />
        ) : (
          <NoImage className="image">
            <Image width={26} height={26} />
          </NoImage>
        )}
      </div>

      <ul className="info">
        <li>
          <span className="label">구간 항목</span>
          <span className="value">{section.section_type}</span>
        </li>
        <li>
          <span className="label">평점</span>
          <span className="value">{section.section_score_100}점</span>
        </li>
      </ul>
    </DetailSectionStyle>
  );
};

export default DetailSection;
