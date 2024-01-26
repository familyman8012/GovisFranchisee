import { ReportConvertData, ReportTableProps } from "InterfaceFarm/aistt";

export const reportDataConvert = (array: ReportTableProps[]) => {
  // 최상위 배열을 생성합니다.
  const grouped: ReportConvertData[] = [];
  array.forEach((item) => {
    // group_step_variable_idx 기준으로 묶인 그룹을 찾습니다.
    let group = grouped.find(
      (g) => g.group_step_variable_idx === item.group_step_variable_idx
    );

    // 그룹이 없으면 새로 만듭니다.
    if (!group) {
      group = {
        group_step_variable_idx: item.group_step_variable_idx,
        group_step_name: item.group_step_name,
        step_name: item.step_name,
        step_variable_idx: item.step_variable_idx,
        ratings: [],
        total_converted_score_average: 0, // 초기 평균 점수
        total_scores_count: 0, // 점수를 계산하기 위한 카운터
      };
      grouped.push(group);
    }

    // rating_scale_idx_1 기준으로 묶인 서브그룹을 찾습니다.
    let ratingGroup = group?.ratings.find(
      (r) => r.rating_scale_idx_1 === item.rating_scale_idx_1
    );

    // 서브그룹이 없으면 새로 만듭니다.
    if (!ratingGroup) {
      ratingGroup = {
        rating_scale_idx_1: item.rating_scale_idx_1,
        rating_scale_name_1: item.rating_scale_name_1,
        items: [],
      };
      group.ratings.push(ratingGroup);
    }

    // 현재 아이템을 서브그룹에 추가합니다.
    ratingGroup.items.push({
      rating_scale_idx_2: item.rating_scale_idx_2,
      rating_scale_name_2: item.rating_scale_name_2,
      rating_scale_idx_3: item.rating_scale_idx_3,
      rating_scale_name_3: item.rating_scale_name_3,
      converted_score_avarage: item.converted_score_avarage,
      frequency_count: item.frequency_count,
    });

    // 평균 점수를 계산합니다.
    if (
      item.converted_score_avarage > 0 &&
      group.total_scores_count !== undefined
    ) {
      group.total_converted_score_average =
        (group.total_converted_score_average * group.total_scores_count +
          item.converted_score_avarage) /
        (group.total_scores_count + 1); // 소수점 둘째자리까지
      group.total_scores_count += 1;
    }
  });

  // total_scores_count는 더 이상 필요하지 않으므로 결과에서 제거합니다.
  grouped.forEach((group) => {
    delete group.total_scores_count;
  });

  return grouped;
};
