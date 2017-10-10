import React from 'react';

const Question = (props) => {
  if (props.isEnd())
    return (<div></div>)
    return (
        <div className="question-panel">
            {props.question.title}-{props.question.content}
        </div>
    )
};

export default Question;