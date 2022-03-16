import React from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../icons/Search';

import data from '../data.json';

const Dropdown = (props) => {
  console.log(data);
  return (
    <Container>
      <ResultList>
        <Suggestions>추천검색어</Suggestions>
        {data.map((item, index) => (
          <Result key={index}>
            <SearchIcon />
            <ResultText>{item.name}</ResultText>
          </Result>
        ))}
      </ResultList>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  border: 1px solid #ddd; // need to delete when component is merged
  border-radius: 24px;
  padding: 24px 0;
  width: 660px;
  height: 351px;
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
