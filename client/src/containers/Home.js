import React from 'react';

import texts from '../text.json';

import Card from '../components/Card';

const Home = ({ options }) => (
  <div className="container my-5">
    <h1 className="my-3 text-center">{texts.title}</h1>
    {/* {
      options && (
        options.forEach(option => {
          <Card />
        })
      )
    } */}
  </div>
);

export default Home;