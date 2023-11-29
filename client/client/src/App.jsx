import { useState } from 'react';
import Main from './components/Main';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
    <div className='main-container'>
      <Main />
    </div>
  </div>
  );
}

export default App;
