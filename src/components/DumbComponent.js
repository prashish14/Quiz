import React from 'react';
const DumbComponent = (props) => {
    if (!props.isEnd())
      return (<div></div>)
    return (
      <div className="dumb-panel">
        <h2>Great Job! Your score was {props.score()}</h2>
        <button onClick={() => props.reload() } className="restart-btn">Play Again</button>
      </div>
    )
};

export default DumbComponent;