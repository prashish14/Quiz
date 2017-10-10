import React from 'react';

const Header = (props) => {
    if (props.isEnd())
      return (<div></div>)
    return (
    <button className="back-btn" onClick={props.handleGoBack}>Back</button>
    )
};

export default Header;