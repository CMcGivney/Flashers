import React, { useContext } from "react";
import { Card, Transition, Button } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import FlashCard from "../components/FlashCard.js";
import FlashForm from "../components/FlashForm.js";
import { FETCH_FLASH_QUERY } from "../util/graphql";
import useToggle from "../util/toggle.js";
// import Categories from "../components/Categories.js";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [showForm, toggleForm] = useToggle();
  const { loading, data } = useQuery(FETCH_FLASH_QUERY);
  // const category = data.getFlashCards.category

  const groupBy = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = keys.map((key) => obj[key]).join("-");
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const groupByCategory = groupBy(["category"]);
  const categoryArray = [];

  if (data) {
    for (let [groupName, values] of Object.entries(
      groupByCategory(data.getFlashCards)
    )) {
      categoryArray.push(`${groupName} : ${values.length}`);
    }
  }
  const styles = {
    display: "flex",
    textAlign: "center",
    flexFlow: "column nowrap",
    justifyContent: "center",
    border: "solid black 5px",
    boxShadow: "5px 10px #888888",
    margin: "2rem 2rem",
  };
  return (
    <>
      <div style={styles}>
        {" "}
        <h2>Categories</h2>
        <ul style={{ listStyleType: "none", padding: "0 0" }}>
          {loading ? (
            <h1>Loading Categories...</h1>
          ) : (
            data.getFlashCards &&
            categoryArray.map((flash, id) => <li key={id}>{flash}</li>)
          )}
        </ul>
        {/* {console.log(groupByCategory(data.getFlashCards))} */}
        {user ? (
          <Button
            className="ui blue button"
            style={{ margin: "1rem 1rem" }}
            onClick={toggleForm}
          >
            Create FlashCard
          </Button>
        ) : (
          <Button
            className="ui blue button"
            style={{ margin: "1rem 1rem" }}
            as={Link}
            to="/login"
          >
            Login to Create FlashCard
          </Button>
        )}
      </div>

      {user && showForm ? <FlashForm /> : null}

      <Card.Group centered>
        {loading ? (
          <h1>Loading flashes...</h1>
        ) : (
          <Transition.Group>
            {data.getFlashCards &&
              data.getFlashCards.map((flash) => (
                <FlashCard key={flash.id} flash={flash} />
              ))}
          </Transition.Group>
        )}
      </Card.Group>
    </>
  );
};

export default Home;
