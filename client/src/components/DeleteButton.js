import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Confirm, Icon } from "semantic-ui-react";

import { FETCH_FLASH_QUERY } from '../util/graphql';

function DeleteButton({flashId, callback}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
console.log(confirmOpen)
  const [deleteFlash] = useMutation(DELETE_FLASH_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_FLASH_QUERY
      });
      data.getFlashCards = data.getFlashCards.filter((p) => p.id !== flashId);
      proxy.writeQuery({ query: FETCH_FLASH_QUERY, data });
      if (callback) callback();
    },
    variables: {
      flashId
    }
  });
  return (
    <>
      <button
        className="ui red button"
        style={{float:"right"}}
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteFlash}
      />
    </>
  );
}
const DELETE_FLASH_MUTATION = gql`
mutation deleteFlash($flashId: ID!){
  deleteFlash(flashId: $flashId)
}
`;
export default DeleteButton;
