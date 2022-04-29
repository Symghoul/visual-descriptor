/**
 * Here lies the context of the aplication
 */

import React, { useState } from "react";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const state = {};

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};
