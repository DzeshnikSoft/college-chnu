import React, {Fragment} from 'react';
import './History.css';
import MainHistory from './components/MainHistory';
import Story from './components/Story';

const History = () => {
  return (
    <Fragment>
      <MainHistory />
      <Story />
    </Fragment>
  );
};

export default History;