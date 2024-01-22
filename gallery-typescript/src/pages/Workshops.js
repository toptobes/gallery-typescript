import React from "react";
import Card from "../components/Card.js";

// Workshops, including badges

const Workshops = (props) => {
  //console.log("Workshops in page:" + JSON.stringify(props.apps));
  return (
    <div className="grid lg:grid-cols-3 gap-x-5 gap-y-5 md:grid-cols-2">
      {props.apps && (
        <>
          {props.apps.map((application, index) => (
            <Card
              key={index}
              application={application}
              onClick={props.onClick}
              filteredTag={props.filteredTag}
              filters={props.filters}
              showHide={props.showHide}
              slugs={props.slugs}
              setSlugs={props.setSlugs}
              {...props}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Workshops;
