import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container, Box, Grid } from "@material-ui/core";
import styled from "styled-components";

import { getAndSetRecipes } from "../../../features/recipes/actions";
import { recipesSelector } from "../../../features/recipes/recipeSlice";
import RecipeItem from "../../recipe/RecipeItem";
import { LoaderWrapper } from "../../sharedStyledComponents";

const StyledGrid = styled(Grid)`
  padding: 0 10px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector(recipesSelector);

  useEffect(() => {
    dispatch(getAndSetRecipes());
  }, [dispatch]);

  const renderRecipes = () => {
    return recipes?.map((recipe) => (
      <RecipeItem key={recipe.id} recipe={recipe} />
    ));
  };

  if (loading)
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );

  if (error) return <div>error</div>;

  return (
    <Container>
      <Box my={2}>
        <StyledGrid container spacing={3}>
          {renderRecipes()}
        </StyledGrid>
      </Box>
    </Container>
  );
};

export default Home;
