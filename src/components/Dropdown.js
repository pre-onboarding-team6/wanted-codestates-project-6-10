import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../icons/Search';

import items from '../data.json';

const proxyServer = 'https://cors-anywhere.herokuapp.com';
const url = '';

const Dropdown = (props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState();
  const [cursor, setCursor] = useState(-1);
  const [data, setData] = useState(items);
  // const [keyword, setKeyword] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', keyboardNavigation);
  }, []);

  // input tag에 navigation 추가
  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      console.log('keydown');
      isShowing
        ? setCursor((c) => (c < data.length - 1 ? c + 1 : c))
        : setData();
    }

    if (e.key === 'ArrowUp') {
      console.log('keyup');
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }

    if (e.key === 'Escape') {
      console.log('escape');
      setIsShowing(false);
    }

    if (e.key === 'Enter' && cursor > 0) {
      console.log('enter');
      setSearch(data[cursor].name);
      setIsShowing(false);
    }
  };

  return (
    <Container>
      {isShowing ? (
        <ResultList>
          <Suggestions>추천검색어</Suggestions>
          {data?.map((item, index) => (
            <Result key={index} onClick={() => setSelected(item)}>
              <SearchIcon />
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
