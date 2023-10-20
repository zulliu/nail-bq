import { useState } from 'react';
import Timer from './Timer';
import Question from './Question';
import MyList from './MyList';

function App() {
  return (
    <>
      <Question />
      <Timer />
      {/* <MyList /> */}
    </>
  );
}

export default App;
