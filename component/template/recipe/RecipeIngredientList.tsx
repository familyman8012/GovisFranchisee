import { IRecipeStepFormFields } from "InterfaceFarm/product-recipe";
import Empty from "@ComponentFarm/atom/Empty/Empty";
import { getComputedCost } from "@UtilFarm/number";
import { RecipeIngreientListStyle } from "./style";

interface RecipeIngredientListProps {
  ingredients: IRecipeStepFormFields["recipe_material_list"];
}

const RecipeIngredientList = ({ ingredients }: RecipeIngredientListProps) => {
  return (
    <RecipeIngreientListStyle>
      {!ingredients || ingredients.length === 0 ? (
        <Empty>등록된 원재료 정보가 없습니다.</Empty>
      ) : (
        ingredients.map((ingredient, i) => (
          <li key={ingredient.material_info_idx}>
            {ingredient.material_image && (
              <img
                className="image"
                src={ingredient.material_image}
                alt={ingredient.material_name_ko}
              />
            )}
            <div className="info">
              <h3 className="name">{ingredient.material_name_ko}</h3>
              <div className="amount">
                {ingredient.recipe_material_meterage_value &&
                ingredient.evi_recipe_material_meterage_unit ? (
                  <>
                    <span className="value">{`${ingredient.recipe_material_meterage_value}${ingredient.evi_recipe_material_meterage_unit_str}`}</span>
                    {ingredient.recipe_material_note && (
                      <span className="note">{`(${ingredient.recipe_material_note})`}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="value">{`${ingredient.recipe_material_quantity_value}${ingredient.evi_recipe_material_quantity_unit_str}`}</span>
                    {ingredient.recipe_material_note && (
                      <span className="note">{`(${ingredient.recipe_material_note})`}</span>
                    )}
                  </>
                )}
              </div>
              <p className="price">
                {`매입 원가 ${getComputedCost(
                  ingredient.purchase_cost,
                  ingredient.recipe_material_quantity_value
                )}원`}
                <br />
                {`판매 원가 ${getComputedCost(
                  ingredient.sale_cost,
                  ingredient.recipe_material_quantity_value
                )}원`}
              </p>
            </div>
          </li>
        ))
      )}
    </RecipeIngreientListStyle>
  );
};

export default RecipeIngredientList;
