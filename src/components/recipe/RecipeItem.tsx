import React from "react";
import { Grid, Divider } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";

import ackeeImage from "../../assets/images/ackee_small.svg";
import { IRecipe } from "../../api";
import {
  Recipe,
  RecipeWrapper,
  RecipeContent,
  Name,
  Duration,
} from "./styledComponents";

interface IRecipeItemProps {
  recipe: IRecipe;
}

const RecipeItem = (props: IRecipeItemProps) => {
  const {
    recipe: { name, score, duration, id },
  } = props;
  return (
    <Grid item xs={12}>
      <Link style={{ textDecoration: "none" }} to={`/details/${id}`}>
        <Recipe>
          <RecipeWrapper>
            <img width="96" src={ackeeImage} alt="ackee" />
            <RecipeContent>
              <div>
                <Name>{name}</Name>
              </div>
              <div>
                <Rating
                  precision={0.5}
                  style={{ color: "#FF00FF" }}
                  size="small"
                  value={score}
                  readOnly
                />
              </div>
              <Duration>
                <ScheduleIcon fontSize="small" />
                <span>{duration} min</span>
              </Duration>
            </RecipeContent>
          </RecipeWrapper>
          <Divider />
        </Recipe>
      </Link>
    </Grid>
  );
};

export default RecipeItem;
