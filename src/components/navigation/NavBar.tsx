import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { recipesSelector } from "../../features/recipes/recipeSlice";

const AppBarTitle = styled.span`
  flex-grow: 1;
`;

const StyledAppBar = styled(AppBar)`
  && {
    background-color: white;
    color: black;
  }
`;

interface INavBarProps {
  children?: React.ReactElement;
}

interface IAppBarTitle {
  [pathname: string]: string;
}

const appBarTitle: IAppBarTitle = {
  "/": "Recepty",
  "/add-recipe": "Přidat recept",
};

const NavBar = (props: INavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newCreatedRecipe } = useSelector(recipesSelector);

  const isHome = location.pathname === "/";
  const addNewRecipe = location.pathname === "/add-recipe";

  const backButtonAction = () => {
    if (newCreatedRecipe) return navigate("/");

    return navigate(-1);
  };

  return (
    <StyledAppBar position="relative">
      <Toolbar>
        {!isHome && (
          <IconButton edge="start" onClick={backButtonAction}>
            <ArrowBackIcon style={{ fill: "#0000FF" }} />
          </IconButton>
        )}
        <AppBarTitle>{appBarTitle[location.pathname]}</AppBarTitle>
        {!addNewRecipe && (
          <Link to="/add-recipe">
            <IconButton edge="end">
              <AddIcon style={{ fill: "#0000FF" }} />
            </IconButton>
          </Link>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
