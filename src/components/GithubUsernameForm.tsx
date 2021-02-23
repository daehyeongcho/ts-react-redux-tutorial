import React, { FormEvent, useState, ChangeEvent } from "react";
import styled from "styled-components";

const GithubUsernameFormBlock = styled.form`
  width: 400px;
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 48px;

  input {
    flex: 1;
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    font-size: 21px;
    height: 100% auto;
    margin-right: 1rem;
  }

  button {
    background: black;
    color: white;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
    height: 100% auto;
    font-weight: bold;

    &:hover {
      background: #495057;
    }
  }
`;

type GithubUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
};

const GithubUsernameForm = ({ onSubmitUsername }: GithubUsernameFormProps) => {
  const [input, setInput] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <GithubUsernameFormBlock onSubmit={onSubmit}>
      <input
        placeholder="Github 계정명을 입력하세요."
        value={input}
        onChange={onChange}
      />
      <button type="submit">조회</button>
    </GithubUsernameFormBlock>
  );
};

export default GithubUsernameForm;
