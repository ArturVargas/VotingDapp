import React from 'react';

import text from '../text.json';

import Card from '../components/Card';

const Home = ({ options, totalVotes, emmitedVote, userVoted }) => {
  console.log(options);
  return (
    <div className="container my-5">
      <h1 className="my-3 text-center">{text.title}</h1>
      <h3 className="my-2 text-center">{text.description}</h3>
      {
        options && (
          options.map(option => {
            return (
              <Card 
                key={option.id}
                emmitedVote={emmitedVote}
                {...option}
              />
            );
          })
        )
      }
      <div className="text-center">
        <h4 className="card-title">{text.totalVotes}</h4>
        <p className="lead"> {totalVotes} </p>
      </div>
    </div>
  )
};

export default Home;