import React, { useState } from "react";
// import gql from "graphql-tag";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Confirm, Icon } from "semantic-ui-react";

import { FETCH_FLASH_QUERY } from "../util/graphql";

function DeleteButton({ flashId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { loading, error, data } = useQuery(FETCH_FLASH_QUERY);
  const [deleteMutation] = useMutation(DELETE_FLASH_MUTATION, {
    update(cache) {
      setConfirmOpen(false);
      const newData = data.getFlashCards.filter((p) => p.id !== flashId);
      console.log(newData)
      cache.modify({
        id: flashId,
        field:{

        } 
       });
      if (callback) callback();
    },
    variables: {
      flashId,
    },
  });

  return (
    <>
      <button
        className="ui red button"
        style={{ float: "right" }}
        onClick={() => setConfirmOpen(true)}
        // disabled={deleting}
        // error={flashError}
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
