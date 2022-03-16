import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';
import Dropdown from './components/Dropdown';

import styled from '@emotion/styled';

function App() {
  return (
    <Container>
      <Global styles={reset} />
      <Dropdown />
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 50px;
`;
