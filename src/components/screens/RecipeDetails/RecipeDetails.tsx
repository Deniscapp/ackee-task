import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Container } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ScheduleIcon from "@material-ui/icons/Schedule";

import ackeeImage from "../../../assets/images/ackee_big.svg";
import { getRecipe, postRating, IRecipeDetails } from "../../../api";
import { LoaderWrapper } from "../../sharedStyledComponents";
import {
  Header,
  Details,
  DetailsText,
  DetailsTitle,
  ScoreAndDuration,
  Image,
  Title,
  Duration,
  RatingSection,
  ListOfIngredients,
} from "./styledComponents";

const RecipeDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState<IRecipeDetails | null>(null);
  const [error, setError] = useState<string | object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let details;
      try {
        details = await getRecipe(params?.id);
      } catch (err) {
        return setError(err);
      } finally {
        setLoading(false);
      }

      setDetails(details.data);
    })();
  }, [params]);

  useEffect(() => {
    const userScore = localStorage.getItem(`recipe-${details?.id}`);
    setUserScore(Number(userScore ?? ""));
  }, [details]);

  if (loading)
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );

  if (error || !details)
    return (
      <Container>
        <p>Error on retrieving details</p>
      </Container>
    );

  const { name, score, duration, info, ingredients, description } = details;

  const renderIngredients = () => {
    return ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>);
  };

  const submitRating = async (score: number) => {
    setUserScore(score);
    try {
      await postRating(details?.id, score);
    } catch (err) {
      alert(err);
      return setUserScore(0);
    }

    return localStorage.setItem(`recipe-${details?.id}`, String(score));
  };

  return (
    <>
      <Header img={ackeeImage}>
        <Image img={ackeeImage}>
          <Title>{name}</Title>
        </Image>
        <ScoreAndDuration>
          <Rating
            style={{ color: "white" }}
            precision={0.5}
            size="medium"
            value={score}
            readOnly
          />
          <Duration>
            <ScheduleIcon fontSize="small" />
            <span>{duration} min</span>
          </Duration>
        </ScoreAndDuration>
      </Header>
      <Details>
        <div>
          <DetailsText>{info}</DetailsText>
        </div>
        <div>
          <DetailsTitle>Ingredience</DetailsTitle>
          <ListOfIngredients>{renderIngredients()}</ListOfIngredients>
        </div>
        <div>
          <DetailsTitle>Příprava jídla</DetailsTitle>
          <DetailsText>{description}</DetailsText>
        </div>
      </Details>
      <RatingSection>
        <p>Ohodnoť tento recept</p>
        <Rating
          name="user-rating"
          style={{ color: "white" }}
          size="medium"
          value={userScore ?? 0}
          disabled={Boolean(userScore)}
          onChange={(_, newValue) => submitRating(newValue ?? 0)}
        />
      </RatingSection>
    </>
  );
};

export default RecipeDetails;
