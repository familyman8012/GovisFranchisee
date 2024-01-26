import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchProductRecipeList } from "ApiFarm/product-recipe";
import { Button } from "@ComponentFarm/atom/Button/Button";
import { RecipeSwitchStyle } from "./style";

const RecipeSwitch = () => {
  const router = useRouter();

  const product_info_idx = useMemo(
    () => parseInt(router.query?.product_info_idx as string, 10),
    [router]
  );

  const recipe_info_idx = useMemo(
    () => parseInt(router.query?.recipe_info_idx as string, 10),
    [router]
  );

  const { data, isLoading } = useQuery(
    ["product-recipe-list", product_info_idx],
    () => fetchProductRecipeList(product_info_idx),
    {
      enabled: !!product_info_idx,
    }
  );

  const [selectedRecipeIdx, setSelectedRecipeIdx] =
    useState<number>(recipe_info_idx);
  const list = data?.list || [];

  return (
    <RecipeSwitchStyle>
      <h3>레시피 선택</h3>
      <div className="switch-wrap">
        <select
          value={selectedRecipeIdx}
          onChange={(e) =>
            setSelectedRecipeIdx(
              list[e.target.selectedIndex - 1]?.recipe_info_idx
            )
          }
        >
          <option value={undefined} disabled>
            레시피 목록 전체
          </option>
          {list.map((v) => (
            <option key={v.recipe_info_idx} value={v.recipe_info_idx}>
              {v.recipe_name}
            </option>
          ))}
        </select>

        <Button
          disabled={!selectedRecipeIdx || isLoading}
          onClick={() =>
            router.push(
              `/product-recipes/${product_info_idx}/recipe-info/${selectedRecipeIdx}`
            )
          }
        >
          검색
        </Button>
      </div>
    </RecipeSwitchStyle>
  );
};

export default RecipeSwitch;
