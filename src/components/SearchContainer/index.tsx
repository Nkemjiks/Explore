import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';
import Search from './Search';
import lightSearch from 'components/SearchContainer/assets/light-search.png';
import darkSearch from 'components/SearchContainer/assets/dark-search.png';
import { ThemeContext } from 'helpers/theme/ThemeContext';
import { getAutoComplete } from 'helpers/api';

const Container = styled.div`
  display: flex;
  width: 100%;

  ${mq.tablet`
    width: 80%;
  `}
  ${mq.laptop`
    flex-grow: 9
  `}
`

const Button = styled.a`
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: 0;
  height: 52px;
  width: 50px;
  font-size: 18px;
  margin-top: 10px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.1);
  }
  img {
    margin-top: 5px;
  }
`

interface Props {
  autocompleteOff?: boolean;
}

const SearchContainer: React.SFC<Props> = (props) => {
  const { state } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [autoComplete, setAutoComplete] = useState(false);

  const fetchAutoComplete = async () => {
    const result = await getAutoComplete(query);
    if (query.length !== 0) {
      setResults(result);
    } else {
      setResults([]);
    }
  }

  const location = useLocation().search;

  useEffect(() => {
    const q = queryString.parse(location);
    if (q.query !== undefined) {
      setQuery(q.query as string);
    }
    if(props.autocompleteOff) {
      setAutoComplete(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAutoComplete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleInputChange = (event: any) => {
    setQuery(event.target.value)
    setAutoComplete(false);
  }

  return( 
    <Container>
      <Search
        autocompleteOff={autoComplete}
        handleInputChange={handleInputChange}
        results={results}
        query={query}
      />
      <Button href={`/search?q=${query}`} >
        <img src={state.checked ? darkSearch : lightSearch} alt="search" />
      </Button>
    </Container>
  );
}

export default SearchContainer;