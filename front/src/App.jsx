import React from "react";
import { AppContextWrapper } from "./context/AppContext";
//import TaskContainer from "./components/TaskContainer/TaskContainer";
import MainScreen from "./components/mainScreen/mainScreen";


const App = () => {
  return (
    <AppContextWrapper>
      <MainScreen />
    </AppContextWrapper>
  );
}
/** 
const App = () => {
    return (
      <AppContextWrapper>
        <TaskContainer />
      </AppContextWrapper>
    );
}
*/

export default App;
