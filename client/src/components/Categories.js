import React from "react";
import { useQuery } from "@apollo/client";

import { FETCH_CATAGORIES_QUERY } from "../util/graphql";

const Categories = () => {
  const { loading, error, data } = useQuery(FETCH_CATAGORIES_QUERY);

  if (loading) return <h2>"Loading..."</h2>;

  if (error) return `Error ${error.message}`;

  const categoryArray = data.getCardsByCategories.map(
    (category) => category.category
  );

    let uniqueCategories = [];
    categoryArray.forEach((c) => {
      if (!uniqueCategories.includes(c)) {
        uniqueCategories.push(c);
      }
    });
  
  


  return (
    <>
      <h1>Categories</h1>
      <ul>
      {uniqueCategories.map((category) => <li>{category}</li>)}
      </ul>
    </>
  );
};
export default Categories;
