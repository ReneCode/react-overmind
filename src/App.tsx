import React from "react";
import "./App.css";
import { useOvermind } from "./overmind";

const App: React.FC = () => {
  const { state, actions } = useOvermind();

  const onOpenModal = () => {
    // TODO  why is typescript complaining ?
    actions.modals.editPageModal.open();
  };

  return (
    <div className="App">
      <div>React using overmind</div>
      <div>normal state works: {state.project.name}</div>
      <button onClick={onOpenModal}>open modal</button>
    </div>
  );
};

export default App;
