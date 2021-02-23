import React from "react";
import styled from "styled-components";

const GithubProfileInfoBlock = styled.div`
  width: 400px;
  margin: 0 auto;

  .profile-head {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 64px;
      height: 64px;
      border-radius: 32px;
      margin-right: 1rem;
    }

    .name {
      font-weight: bold;
    }
  }
`;

type GithubProfileInfoProps = {
  name: string;
  thumbnail: string;
  bio: string;
  blog: string;
};

const GithubProfileInfo = ({
  name,
  thumbnail,
  bio,
  blog,
}: GithubProfileInfoProps) => {
  return (
    <GithubProfileInfoBlock>
      <div className="profile-head">
        <img src={thumbnail} alt="user thumbnail" />
        <div className="name">{name}</div>
      </div>
      <p>{bio}</p>
      <div>{blog !== "" && <a href={blog}>블로그</a>}</div>
    </GithubProfileInfoBlock>
  );
};

export default GithubProfileInfo;
