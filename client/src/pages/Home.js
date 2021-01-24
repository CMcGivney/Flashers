import React, { useContext } from "react";
import { Card, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import FlashCard from "../components/FlashCard.js";
import FlashForm from "../components/FlashForm.js";
import { FETCH_FLASH_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_FLASH_QUERY);

  if (data) {
    console.log(data.getFlashCards);
  }

  return (
    <>
      {user && <FlashForm />}
      <h2 style={{ display: "block", textAlign: "center", fontSize: "2rem" }}>
        Recent flashes
      </h2>
      <Card.Group centered>
        {loading ? (
          <h1>Loading flashes...</h1>
        ) : (
          <Transition.Group>
          {data.getFlashCards &&
          data.getFlashCards.map((flash) => <FlashCard key={flash.id} flash={flash} />)}
          </Transition.Group>
        )}
      </Card.Group>
    </>
  );
};

export default Home;
