import React from 'react';

import text from '../text.json';

const Card = ({ id, numOfVotes }) => {
  const title = text.options[id].title;
  const description = text.options[id].description;

  return (
    <div className="my-4">
      <div className="col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body">
            <div>
              <h4 className="card-title">{title}</h4>
              <p className="card-text">{description}</p>
            </div>
            <button className="btn btn-primary btn-block"> Votar </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Card;