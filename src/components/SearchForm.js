import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Search } from '../icons/Search.svg';
import Dropdown from './Dropdown';

import items from '../data.json';

export default function SearchForm() {
  const isDesktop = useMediaQuery({ query: '(min-Width: 1040px)' });
  const inputRef = useRef(null);

  const [isShowing, setIsShowing] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [data, setData] = useState(items);
  const [selected, setSelected] = useState(); // selected item, 필요 없을 경우 삭제

  const showResult = (e) => {
    if (e.key === 'Enter') {
      setIsShowing(true);
      setCursor(0);
      inputRef.current.blur();
    }
  };

  return (
    <Container>
      <Title isDesktop={isDesktop}>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>
      <SearchBarWrap isDesktop={isDesktop}>
        <SearchBar>
          {isDesktop && <Search />}
          <input
            ref={inputRef}
            type="text"
            placeholder="질환명을 입력해 주세요."
            // onChange={onchangeValue}
            // onKeyDown={onKeyDown}
            onKeyUp={showResult}
            // onKeyDown={keyboardNavigation}
          />
          {!isDesktop && <Search />}
        </SearchBar>
        {isDesktop && <SearchButton>검색</SearchButton>}
      </SearchBarWrap>
      {isShowing && (
        <ResultListWrapper>
          <Dropdown
            isShowing={isShowing}
            setIsShowing={setIsShowing}
            setSelected={setSelected}
            data={data}
            cursor={cursor}
            setCursor={setCursor}
          />
        </ResultListWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #cae9ff;
  padding-top: 80px;
`;

const Title = styled.p`
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
  font-size: ${({ isDesktop }) => (isDesktop ? '2.125rem' : '1.25rem')};
`;

const SearchBarWrap = styled.div`
  position: relative;
  border-radius: 42px;
  background-color: #ffffff;
  flex-direction: row;
  display: flex;
  margin: 0 auto;
  width: ${({ isDesktop }) => (isDesktop ? '660px' : 'calc(100vw - 40px)')};
`;

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 20px 24px;

  input {
    margin-left: 10px;
    border: 0;
    background-color: transparent;
    font-size: 100%;
    line-height: 1.15;
    color: -internal-light-dark(black, white);
    width: 100%;
    :focus {
      outline: 0;
    }
  }
`;

const SearchButton = styled.div`
  background-color: #007be9;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6;
  padding: 18px 32px;
  cursor: pointer;
  border-radius: 0 42px 42px 0;
`;

const ResultListWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;
