import React from 'react';

const AnswerPanel = (props) => {
  function OnClickAnswers(e){
      console.log('answerpanel', e.target.value);
      props.OnClickAnswers(e.target.value);
  }

  return (
      <div className="quiz-options">
          {
            props.answers.map(a => {
                return (
                    <button className="quiz-choice" value={a.points} onClick={OnClickAnswers}>{a.answer}</button>
                )
            })
          }
      </div>
  )
};


export default AnswerPanel;