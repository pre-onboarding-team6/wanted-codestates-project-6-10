import styled from '@emotion/styled';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Search } from '../icons/Search.svg';

export default function SearchForm() {
  const isDesktop = useMediaQuery({ query: '(min-Width: 1040px)' });

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
            type="text"
            placeholder="질환명을 입력해 주세요."
            // onChange={onchangeValue}
            // onKeyDown={onKeyDown}
          />
          {!isDesktop && <Search />}
        </SearchBar>
        {isDesktop && <SearchButton>검색</SearchButton>}
      </SearchBarWrap>
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