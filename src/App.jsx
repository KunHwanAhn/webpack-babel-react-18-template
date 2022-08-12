import React, { useState } from 'react';

import MyButton from '@/components/MyButton.jsx';
import UserProfile from '@/components/UserProfile.jsx';

import './App.scss';

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <div>
        <MyButton
          count={count}
          onClick={() => handleClick()}
        />
      </div>
      <div>
        <MyButton
          count={count}
          onClick={() => handleClick()}
        />
      </div>
      <hr />
      <UserProfile />
    </div>
  );
}
