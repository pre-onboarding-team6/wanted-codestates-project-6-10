import styled from '@emotion/styled';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Search } from '../icons/Search.svg';
import {
  clearData,
  getLocalData,
  searchDisease,
} from '../redux/diseaseReducer';
import Dropdown from './Dropdown';

export default function SearchForm() {
  const isDesktop = useMediaQuery({ query: '(min-Width: 1040px)' });

  const [isShowing, setIsShowing] = useState(false);
  const [isMovingMouse, setIsMovingMouse] = useState(false);
  const [cursor, setCursor] = useState(-1);

  const [searchText, setSearchText] = useState('');
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const keyboardNavigation = useCallback(
    (e) => {
      setIsMovingMouse(false);
      if (e.key === 'ArrowDown') {
        isShowing &&
          setCursor((prev) => (prev < data.data.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        isShowing && setCursor((prev) => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === 'Escape') {
        setCursor(-1);
        setIsShowing(false);
      }
      if (e.key === 'Enter' && cursor > 0) {
        setSearchText(data.data[cursor].name);
        setCursor(-1);
        setIsShowing(false);
      }
    },
    [data, isShowing, setCursor, setIsShowing, cursor],
  );

  const getData = async (value) => {
    if (value === '') {
      dispatch(clearData());
      return;
    }

    const cache = JSON.parse(localStorage.getItem('searchResult'));

    if (
      cache !== null &&
      cache[value] &&
      Date.now() < cache[value].expireTime
    ) {
      // cache된 데이터 가져옴
      dispatch(getLocalData({ keyword: value }));
    } else {
      // api로 데이터 가져옴
      dispatch(searchDisease(value));
    }
  };

  const debounce = (callback) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(callback, 800);
    setTimer(newTimer);
  };

  const onchangeValue = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debounce(() => {
      getData(value);
    });
  };

  useEffect(() => {
    if (searchText || data.data.length > 0) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
      setCursor(-1);
    }
  }, [data.data, searchText]);

  const mousedown = (index) => {
    setIsMovingMouse(true);
    setCursor(index);
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardNavigation);
    window.addEventListener('click', () => {
      setIsShowing(false);
      setCursor(-1);
    });
    return () => {
      window.removeEventListener('keydown', keyboardNavigation);
    };
  }, [keyboardNavigation]);

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
            value={searchText}
            onChange={onchangeValue}
            ref={searchInputRef}
          />
          {!isDesktop && <Search />}
        </SearchBar>
        {isDesktop && <SearchButton>검색</SearchButton>}
      </SearchBarWrap>
      {isShowing && (
        <ResultListWrap
          isDesktop={isDesktop}
          onClick={(e) => e.stopPropagation()}
        >
          <Dropdown
            isShowing={isShowing}
            data={data.data}
            cursor={cursor}
            mousedown={mousedown}
            isMovingMouse={isMovingMouse}
            setSearchText={setSearchText}
            setIsShowing={setIsShowing}
          />
        </ResultListWrap>
      )}
    </Container>
  );
}

const Container = styled.div`
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

const ResultListWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  width: ${({ isDesktop }) => (isDesktop ? '660px' : 'calc(100vw - 40px)')};
`;
