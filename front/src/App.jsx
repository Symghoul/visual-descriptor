import React from "react";
import { AppContextWrapper } from "./context/AppContext";
import MainScreen from "./components/mainScreen/mainScreen";
import Canva from "./components/canva/canva";

const App = () => {
  return (
    <AppContextWrapper>
      <MainScreen />
    </AppContextWrapper>
  );
};

export default App;
