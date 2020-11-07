import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import NewRecipe from "./components/screens/NewRecipe/NewRecipe";
import Home from "./components/screens/Home/Home";
import NavBar from "./components/navigation/NavBar";
import RecipeDetails from "./components/screens/RecipeDetails/RecipeDetails";

const Root = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: Helvetica;
`;

function App(): JSX.Element {
  return (
    <>
      <Router>
        <NavBar />
        <Root>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add-recipe" element={<NewRecipe />} />
            <Route path="details/:id" element={<RecipeDetails />} />
          </Routes>
        </Root>
      </Router>
    </>
  );
}

export default App;
