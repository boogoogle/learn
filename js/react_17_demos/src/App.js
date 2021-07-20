import React, { useEffect, useState} from 'react'
import './App.css';

function Child() {
  useEffect(() => {
    console.log('Child 1');
  }, [])
  return <h1>child</h1>
}

function Father() {
  useEffect(() => {
    console.log('Father 2');
  }, [])

  return <Child />;
}
function Father2() {
  useEffect(() => {
    console.log('Father 22');
  }, [])

  return <Child />;
}

function App() {
  const [store, setStore] = useState('')

  useEffect(() => {
    console.log('App 3');
  }, [])

  return (
  <>
    <Father />;
    <Father2 />;
  </>)
}

export default App;
