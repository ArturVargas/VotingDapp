import React from 'react';

import text from '../text.json';

const Card = ({ id, numOfVotes, emmitedVote }) => {
  const title = text.options[id].title;
  const description = text.options[id].description;

  return (
    <div className="row my-4">
      <div className="col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className="my-4">
              <h4 className="card-title text-center">{title}</h4>
              <p className="card-text text-center my-3">{description}</p>
            </div>
            <button className="btn btn-primary btn-block"
              name={id} 
              onClick={(e) => { emmitedVote(e.target.name, id) }}
            > 
              Votar 
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="jumbotron">
          <h4 className="card-title">Votos a favor del {title}:</h4>
          <p className="text-center lead">{numOfVotes.length}</p>
        </div>
      </div>
    </div>
  )
};

export default Card;