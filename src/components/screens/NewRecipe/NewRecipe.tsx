import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormControl, TextField, Button } from "@material-ui/core";
import PlusOneIcon from "@material-ui/icons/Add";

import { postRecipe } from "../../../api";
import { setNewCreatedRecipe } from "../../../features/recipes/recipeSlice";
import {
  FormWrapper,
  GeneralInfo,
  Ingredients,
  IngredientsInputs,
  ButtonWrapper,
  ListOfIngredients,
} from "./styledComponents";

const NewRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState({ value: "", error: true });
  const [info, setInfo] = useState({ value: "", error: true });
  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [description, setDescription] = useState({ value: "", error: true });
  const [duration, setDuration] = useState({ value: "", error: true });
  const [submitting, setSubmitting] = useState(false);

  const errorHelpText = "Field can not be empty";

  const renderIngredients = () => {
    return ingredients.map((ingredient, i) => (
      <TextField
        key={i}
        fullWidth
        value={ingredient.name}
        label="Vaše ingredience"
        onChange={(e) =>
          setIngredients((state) => {
            const item = { name: e.target.value };
            return [
              ...state.slice(0, i),
              Object.assign({}, item, state.slice(i + 1)),
            ];
          })
        }
      />
    ));
  };

  const isValid = () =>
    !name.error && !info.error && !description.error && !duration.error;

  const validateName = (name: string) => name?.toLowerCase().includes("ackee");

  const addRecipe = async () => {
    setSubmitting(true);
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient.name)
      .map((ingredient) => ingredient.name);
    const body = {
      name: name.value,
      description: description.value,
      duration: Number(duration.value),
      info: info.value,
      ingredients: filteredIngredients,
    };
    try {
      let createdRecipe = await postRecipe(body);
      navigate(`/details/${createdRecipe?.data.id}`);
      dispatch(setNewCreatedRecipe(true));
    } catch (err) {
      return alert(err);
    } finally {
      setSubmitting(false);
    }
  };

  const updateName = (value: string) => {
    setName({ value, error: !validateName(value) });
  };

  return (
    <FormWrapper>
      <FormControl fullWidth>
        <GeneralInfo>
          <TextField
            helperText={name.error ? 'Name must have word "ackee"' : ""}
            error={name.error}
            fullWidth
            value={name.value}
            label="Název receptu"
            onChange={(e) => updateName(e.target.value)}
          />
          <TextField
            fullWidth
            helperText={info.error ? errorHelpText : ""}
            error={info.error}
            value={info.value}
            label="Úvodní text"
            onChange={(e) =>
              setInfo({ error: !e.target.value, value: e.target.value })
            }
          />
        </GeneralInfo>
        <IngredientsInputs>
          <Ingredients>INGREDIENCE</Ingredients>
          <ListOfIngredients>{renderIngredients()}</ListOfIngredients>
          <ButtonWrapper>
            <Button
              startIcon={<PlusOneIcon />}
              variant="outlined"
              onClick={() =>
                setIngredients((state) => [...state, { name: "" }])
              }
            >
              Přidat
            </Button>
          </ButtonWrapper>
        </IngredientsInputs>
        <GeneralInfo>
          <TextField
            helperText={description.error ? errorHelpText : ""}
            error={description.error}
            fullWidth
            value={description.value}
            label="Postup"
            onChange={(e) =>
              setDescription({ error: !e.target.value, value: e.target.value })
            }
          />
          <TextField
            helperText={duration.error ? errorHelpText : ""}
            error={duration.error}
            value={duration.value}
            type="number"
            label="Čas"
            onChange={(e) =>
              setDuration({ error: !e.target.value, value: e.target.value })
            }
          />
        </GeneralInfo>
        <Button
          disabled={!isValid() || submitting}
          onClick={addRecipe}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </FormControl>
    </FormWrapper>
  );
};

export default NewRecipe;
