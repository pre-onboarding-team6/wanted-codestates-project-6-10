import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';

import SearchForm from './components/SearchForm';

function App() {
  return (
    <>
      <Global styles={reset} />
      <SearchForm />
    </>
  );
}

export default App;
