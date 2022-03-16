import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as Search } from '../icons/Search.svg';

const Dropdown = ({
  isShowing,
  setIsShowing,
  data,
  setSelected,
  cursor,
  setCursor,
}) => {
  const containerRef = useRef();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    console.log(cursor);
    console.log(data.length);
    console.log(isShowing);
    if (cursor < 0 || cursor > data.length || !isShowing) {
      return;
    }
    containerRef.current.focus();
    let listItem = Array.from(containerRef.current.children);
    console.log(listItem);
  }, [cursor, isShowing, data.length]);

  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      console.log('keydown');
      isShowing &&
        setCursor((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    }

    if (e.key === 'ArrowUp') {
      console.log('keyup');
      isShowing && setCursor((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === 'Escape') {
      console.log('escape');
      setIsShowing(false);
    }

    if (e.key === 'Enter' && cursor > 0) {
      console.log('enter');
      setSelected(data[cursor].name);
      setIsShowing(false);
    }
  };

  return (
    <Container>
      {isShowing && data.length > 0 ? (
        <ResultList ref={containerRef} onKeyDown={keyboardNavigation}>
          <Suggestions>추천검색어</Suggestions>
          {data.map((item, index) => (
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
