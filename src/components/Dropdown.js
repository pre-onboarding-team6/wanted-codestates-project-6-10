import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { ReactComponent as Search } from '../icons/Search.svg';

const Dropdown = ({ isShowing, data, cursor, mousedown, isMovingMouse }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (isMovingMouse) {
      return;
    }
    if (cursor >= 0 && isShowing && data.length > 0) {
      containerRef &&
        containerRef.current.children[cursor].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }
  }, [cursor, data, isShowing, isMovingMouse]);

  return (
    <Container>
      {isShowing && data.length > 0 ? (
        <ResultList ref={containerRef}>
          <Suggestions>추천검색어</Suggestions>
          {data.map((item, index) => (
            <Result
              key={index}
              selected={cursor === index}
              onMouseMove={(e) => mousedown(e, index)}
            >
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
  border-radius: 24px;
  padding: 24px 0;
  width: 100%;
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
  background-color: ${(props) => props.selected && '#f0f0f0'};
`;

const ResultText = styled.span`
  font-weight: 500;
  font-size: 1.125rem;
  padding-left: 14px;
`;
