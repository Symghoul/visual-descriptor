import React from "react";
import { AppContextWrapper } from "./context/AppContext";
import MainScreen from "./components/mainScreen/mainScreen";
import Clock from "./components/testComponent";

const App = () => {
  return (
    <AppContextWrapper>
      <MainScreen />
    </AppContextWrapper>
  );
};

export default App;
