import React from "react";
import CounterContainer from "./containers/CounterContainer";
import TodoApp from "./containers/TodoApp";
import GithubProfileLoader from "./containers/GithubProfileLoader";

const App: React.FC = () => {
  return (
    <div>
      <CounterContainer />
      <TodoApp />
      <GithubProfileLoader />
    </div>
  );
};

export default App;
