import React, { useState } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as Search } from '../icons/Search.svg';
import items from '../data.json';

const Dropdown = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  // const [selected, setSelected] = useState(); // selected item, 필요 없을 경우 삭제
  const [cursor, setCursor] = useState(-1);
  const [data, setData] = useState(items);

  // input tag에 navigation 추가
  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      console.log('keydown');
    }

    if (e.key === 'ArrowUp') {
      console.log('keyup');
    }

    if (e.key === 'Escape') {
      console.log('escape');
      setIsShowing(false);
    }

    if (e.key === 'Enter' && cursor > 0) {
      console.log('enter');
      // setIsShowing(false);
    }
  };

  return (
    <Container>
      {true ? (
        <ResultList>
          <Suggestions>추천검색어</Suggestions>
          {data?.map((item, index) => (
            <Result key={index} onClick={() => setSelected(item)}>
              <Search />
              <ResultText>{item.name}</ResultText>
            </Result>
          ))}
        </ResultList>
      ) : (
        <ResultList>
          <Suggestions>검색어 없음</Suggestions>
        </ResultList>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  border: 1px solid #ddd; // need to delete when component is merged
  border-radius: 24px;
  padding: 24px 0;
  width: 660px;
  height: auto;
  max-height: 352px;
  overflow-y: auto;
  margin: auto;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const Suggestions = styled.span`
  color: gray;
  font-weight: 600;
  font-size: 1rem;
  margin: 24px 24px;
`;

const ResultList = styled.ul``;

const Result = styled.li`
  margin-top: 5px;
  width: 100%;
  padding: 13px 24px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ResultText = styled.span`
  font-weight: 500;
  font-size: 1.125rem;
  padding-left: 14px;
`;
