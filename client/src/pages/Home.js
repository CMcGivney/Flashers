import React, { useContext } from "react";
import { Card, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import FlashCard from "../components/FlashCard.js";
import FlashForm from "../components/FlashForm.js";
import { FETCH_FLASH_QUERY, } from "../util/graphql";
import Categories from '../components/Categories.js'

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_FLASH_QUERY);
  // const category = data.getFlashCards
  console.log(data)
 

  const groupBy = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = keys.map((key) => obj[key]).join("-");
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const groupByCategory = groupBy(["category"]);
  const categoryArray = []
  
  if (data) {
    for (let [groupName, values] of Object.entries(groupByCategory(data.getFlashCards))) {
      categoryArray.push(`${groupName} : ${values.length}`)
     }
  }
  
  return (
    <>
   
      <h2 style={{ display: "block", textAlign: "center", fontSize: "2rem" }}>
        Categories
      </h2>
      <ul>
     {loading ? (
        <h1>Loading Categories...</h1> 
        ) : (
          data.getFlashCards &&
          categoryArray.map((flash, id) => <li  key={id}>{flash}</li>)
        )
     }
     </ul>
      {/* {console.log(groupByCategory(data.getFlashCards))} */}

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
      {user && <FlashForm />}
    </>
  );
};

export default Home;
