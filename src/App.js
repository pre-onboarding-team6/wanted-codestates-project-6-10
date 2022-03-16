import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';

import Dropdown from './components/Dropdown';
import styled from '@emotion/styled';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <>
      <Global styles={reset} />
      <SearchForm />
      <Dropdown />
    </>
  );
}

export default App;
