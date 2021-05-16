import React from "react";
import { Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_FLASH_QUERY } from "../util/graphql";

function FlashForm() {
  const { values, onChange, onSubmit } = useForm(createFlashCallback, {
    category: "",
    question: "",
    answer: "",
    hint1: "",
    hint2: "",
    hint3: "",
  });

  const [createFlash, { error }] = useMutation(CREATE_FLASH_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_FLASH_QUERY,
      });
      const newFlashCard = [result.data.createFlash, ...data.getFlashCards];
      proxy.writeQuery({
        query: FETCH_FLASH_QUERY,
        data: { getFlashCards: newFlashCard },
      });
      values.category = "";
      values.question = "";
      values.answer = "";
      values.hint1 = "";
      values.hint2 = "";
      values.hint3 = "";
    },
  });

  function createFlashCallback() {
    createFlash();
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        style={{
          border: "solid black 5px",
          boxShadow: "5px 10px #888888",
          margin: "2rem 2rem",
          padding:"1rem 1rem"
        }}
      >
        <h2>Create a Flashcard:</h2>
        <Form.Field>
          <Form.Input
            label="Category"
            placeholder="90s Movies"
            name="category"
            onChange={onChange}
            value={values.category}
            error={error ? true : false}
          />
          <Form.Input
            label="Flasher Card Question"
            placeholder="What 90s movie has a pirate and flying boy?"
            name="question"
            onChange={onChange}
            value={values.question}
            error={error ? true : false}
          />
          <Form.Input
            label="Answer Flash"
            placeholder="Hook"
            name="answer"
            onChange={onChange}
            value={values.answer}
            error={error ? true : false}
          />
          <Form.Input
            label="Give A Hint #1"
            placeholder="Your doing it!"
            name="hint1"
            onChange={onChange}
            value={values.hint1}
            error={error ? true : false}
          />
          <Form.Input
            label="Give A Hint #2"
            placeholder="Bang-a-rang!"
            name="hint2"
            onChange={onChange}
            value={values.hint2}
            error={error ? true : false}
          />
          <Form.Input
            label="Give A Hint #3"
            placeholder="Third star to the right, straight on till morning"
            name="hint3"
            onChange={onChange}
            value={values.hint3}
            error={error ? true : false}
          />
          <button className="ui teal button" type="submit">
            Submit
          </button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_FLASH_MUTATION = gql`
  mutation createFlash(
    $category: String!
    $question: String!
    $answer: String!
    $hint1: String!
    $hint2: String!
    $hint3: String!
  ) {
    createFlash(
      category: $category
      question: $question
      answer: $answer
      hint1: $hint1
      hint2: $hint2
      hint3: $hint3
    ) {
      id
      category
      question
      answer
      hint1
      hint2
      hint3
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default FlashForm;
