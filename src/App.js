import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div>
      <Global styles={reset} />
      <SearchForm />
    </div>
  );
}

export default App;
