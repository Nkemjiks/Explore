import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';
import Search from './Search';
import lightSearch from 'components/LandingPage/assets/light-search.png';
import darkSearch from 'components/LandingPage/assets/dark-search.png';
import { ThemeContext } from 'helpers/theme/ThemeContext';
import { getAutoComplete } from 'helpers/api';

const Container = styled.div`
  display: flex;
  width: 100%;

  ${mq.tablet`
    width: 70%;
  `}

  ${mq.laptop`
    width: 660px;
  `}
`

const Button = styled.button`
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: 0;
  height: 52px;
  width: 50px;
  font-size: 18px;
  margin-top: 30px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  outline: 0;
  :hover {
    transform: scale(1.1);
  }

  img {
    margin-top: 5px;
  }

  ${mq.tablet`
    margin-top: 90px;
  `}
`

const SearchContainer: React.SFC = () => {
  const { state } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchAutoComplete = async () => {
    const result = await getAutoComplete(query);
    if (query.length !== 0) {
      setResults(result);
    } else {
      setResults([]);
    }
  }

  useEffect(() => {
    fetchAutoComplete();
  }, [query]);

  const handleInputChange = (event: any) => {
    setQuery(event.target.value)
  }

  return( 
    <Container>
      <Search handleInputChange={handleInputChange} results={results} query={query} />
      <Button>
        <img src={state.currentTheme === 'dark' ? lightSearch : darkSearch} alt="search" />
      </Button>
    </Container>
  );
}

export default SearchContainer;