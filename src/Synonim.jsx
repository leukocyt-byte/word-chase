import React from 'react';

const Synonim = (props) => {
  const synonimHandler = (event) => {
    props.onChoose(event.target.value);
  };

  return (
    <button key={Math.random} value={props.name} onClick={synonimHandler}>
      {props.name}
    </button>
  );
};

export default Synonim;
