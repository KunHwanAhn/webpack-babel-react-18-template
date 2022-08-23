import React, { useState } from 'react';

import MyButton from '@/components/MyButton.jsx';
import UserProfile from '@/components/UserProfile.jsx';
import FilterableProductTable from '@/components/FilterableProductTable.jsx';

import './App.scss';

const PRODUCTS = [
  {
    category: 'Fruits',
    price: '$1',
    stocked: true,
    name: 'Apple',
  },
  {
    category: 'Fruits',
    price: '$1',
    stocked: true,
    name: 'Dragonfruit',
  },
  {
    category: 'Fruits',
    price: '$2',
    stocked: false,
    name: 'Passionfruit',
  },
  {
    category: 'Vegetables',
    price: '$2',
    stocked: true,
    name: 'Spinach',
  },
  {
    category: 'Vegetables',
    price: '$4',
    stocked: false,
    name: 'Pumpkin',
  },
  {
    category: 'Vegetables',
    price: '$1',
    stocked: true,
    name: 'Peas',
  },
];

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
      <hr />
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
