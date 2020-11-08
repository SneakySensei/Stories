import React from "react";

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className={classes.spinner}>
        <div className={classes.doubleBounce1 + " bg-secondary"} />
        <div className={classes.doubleBounce2 + " bg-secondary"} />
      </div>
      <div className="mt-4">Searching for people...</div>
    </div>
  );
};

export default Spinner;
