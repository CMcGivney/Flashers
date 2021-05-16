import React, { useState } from "react";
// import gql from "graphql-tag";
import { gql, useMutation } from "@apollo/client";
import { Confirm, Icon } from "semantic-ui-react";

import { FETCH_FLASH_QUERY } from "../util/graphql";

function DeleteButton({ flashId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  // const { loading, error, data } = useQuery(FETCH_FLASH_QUERY);
  const [deleteMutation] = useMutation(DELETE_FLASH_MUTATION, {
    variables: {
      flashId,
    },
    optimisticResponse: true,
    update: (cache) => {
      setConfirmOpen(false);
      const data = cache.readQuery({
        query: FETCH_FLASH_QUERY,
      });
      const newData = data.getFlashCards.filter((p) => p.id !== flashId);

      cache.writeQuery({ query: FETCH_FLASH_QUERY, data: {getFlashCards: newData} });
      
      if (callback) callback();
    },
  });

  return (
    <>
      <button
        className="ui red button"
        style={{ float: "right" }}
        onClick={() => setConfirmOpen(true)}
        // disabled={loading}
        // error={error}
      >
        <Icon name="trash" />
      </button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
      />
    </>
  );
}

const DELETE_FLASH_MUTATION = gql`
  mutation($flashId: ID!) {
    deleteFlash(flashId: $flashId)
  }
`;

export default DeleteButton;
