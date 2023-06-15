import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import MainMenu  from "./MainMenu";
import Game from "./Game";

export const App = () => {
  const [, setNewGameKey] = useState(null);
  const [, setMainPlayer1] = useState("");
  const [, setMainPlayer2] = useState("");

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainMenu
              setNewGameKey={setNewGameKey}
              setMainPlayer1={setMainPlayer1}
              setMainPlayer2={setMainPlayer2}
            />
          }
        />
        <Route path="/:newGameKey" element={<Game />} />
      </Routes>
    </>
  );
};
