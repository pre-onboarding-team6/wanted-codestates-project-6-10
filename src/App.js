import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';

function App() {
  return (
    <div>
      <Global styles={reset} />
    </div>
  );
}

export default App;
