import React from 'react';

const Synonim = (props) => {
  const synonimHandler = (event) => {
    let data = event.target.name;
    props.onChoose(data);
  };

  return (
    <button key={Math.random} name={props.name} onClick={synonimHandler}>
      {props.name}
    </button>
  );
};

export default Synonim;
