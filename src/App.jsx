import { useState } from 'react';
import Timer from './Timer';
import Question from './Question';
import MyList from './MyList';

function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Question />
      <Timer />
      {/* <MyList /> */}
    </div>
  );
}

export default App;
