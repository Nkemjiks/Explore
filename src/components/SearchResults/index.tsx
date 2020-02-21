import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import mq from 'helpers/utils/mq';
import Toggle from 'components/Toggle';
import Search from 'components/SearchContainer';
import { getWebSearchResult } from 'helpers/api';
import DisplayWebSearchResult from './DisplayWebSearchResult';
import loadingImg from './assets/810.gif';

const Container = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
  padding: 10px 30px;
  box-sizing: border-box;
  
  img.loading {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  ${mq.tablet`
  `}
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;

  ${mq.tablet`
    margin-top: 10px;
  `}

  ${mq.laptop`
    width: 1000px;
    flex-direction: row;
    margin-right: auto;
    margin-left: auto;
  `}
  
`
const Logo = styled.h1`
  font-size: 30px;
  margin-top: 5px;
  margin-bottom: 5px;

  ${mq.tablet`
    font-size: 50px;
    margin-top: 15px;
  `}

  ${mq.laptop`
    font-size: 30px;
    margin-right: 10px;
    flex-grow: 1;
  `}
`

const SearchResult = styled.div`
  margin-top: 20px;
  
  ${mq.tablet`
    margin-top: 30px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  `}

  ${mq.laptop`
    width: 1000px;
  `}
`

const PaginationContainer = styled.div`
  width: 100%;
  
  ${mq.tablet`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  `}
  ${mq.laptop`
    width: 1000px;
  `}
`

const SearchResults: React.SFC = () => {
  const location = useLocation().search;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResult, setSearchResult] = useState([])
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const fetchAutoComplete = async (query: string, page: number) => {
    const result = await getWebSearchResult(query, page);
    setSearchResult(result.value);
    setLoading(false);
    setPageCount(result.totalCount)
    console.log(result);
  }

  useEffect(() => {
    const q = queryString.parse(location);
    fetchAutoComplete(q.query as string, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (e: number) => {
    const q = queryString.parse(location);
    setActivePage(e);
    setLoading(true);
    setSearchResult([]);
    fetchAutoComplete(q.query as string, e);
  }

  return(
    <Container>
      <Toggle />
      <SubContainer>
        <Logo>Explore</Logo>
        <Search autocompleteOff={true}/>
      </SubContainer>
      { loading && (<img className="loading" src={loadingImg} alt='loading' />)}
      <SearchResult>
        {
          searchResult.length > 0 && searchResult.map((result, i) => {
            return ( <DisplayWebSearchResult key={i} result={result}/> )
          })
        }
      </SearchResult>
      {
        searchResult.length > 0 && (
          <PaginationContainer>
            <Pagination
              hideNavigation
              pageRangeDisplayed={5}
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={pageCount}
              onChange={handlePageChange}
            />
          </PaginationContainer>
        )
      }
    </Container>
  );
}

export default SearchResults;