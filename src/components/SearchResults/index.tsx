import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import mq from 'helpers/utils/mq';
import Toggle from 'components/Toggle';
import Search from 'components/SearchContainer';
import { getWebSearchResult, getNewSearchResult, getImageSearchResult } from 'helpers/api';
import loadingImg from './assets/810.gif';
import RelatedSearch from './RelatedSearchContainer';
import SearchSelect from './SearchSelect';
import DisplaySearchResult from './DisplaySearchResult';

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
    width: 1100px;
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
    width: 830px;
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
    width: 830px;
  `}
`

const SearchResults: React.SFC = () => {
  const location = useLocation().search;
  const [searchResult, setSearchResult] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [searchType, setSearchType] = useState('image');
  const [relatedSearch, setRelatedSearch] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);

  const fetchSearchResult = async (query: string, page: number) => {
    console.log(navigator.onLine);
    if(navigator.onLine) { 
      let result;
      switch(searchType) {
        case 'web':
          result = await getWebSearchResult(query, page);
          setRelatedSearch(result.relatedSearch);
          break;
        case 'news':
          result = await getNewSearchResult(query, page)
          setRelatedSearch(result.relatedSearch);
          break;
        case 'image':
          result = await getImageSearchResult(query, page)
          setRelatedSearch([]);
          break;
        default:
          result = await getWebSearchResult(query, page)
      }
      if(result.value.length > 0) {
        setSearchComplete(true);
        setSearchResult(result.value);
        setLoading(false);
        setPageCount(result.totalCount)
        console.log(result);
      }
    } else {
      setLoading(false);
      setSearchComplete(false);
    }
  }

  const getQueryParams = () => queryString.parse(location).q;

  const handleClick = async(event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(event.currentTarget.title);
  }

  useEffect(() => {
    fetchSearchResult(getQueryParams() as string, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSearchResult(getQueryParams() as string, 1);
    setSearchComplete(false);
    setSearchResult([]);
    setRelatedSearch([]);
    setLoading(true);
    setActivePage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType]);

  const handlePageChange = (e: number) => {
    setActivePage(e);
    setLoading(true);
    setSearchResult([]);
    setRelatedSearch([]);
    fetchSearchResult(getQueryParams() as string, e);
    setSearchComplete(false);
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
          searchComplete && searchResult.length > 0 && (
            <>
              <SearchSelect search={searchType} handleClick={handleClick} searchResult={searchResult} />
              <DisplaySearchResult searchResult={searchResult} searchType={searchType} />
            </>
          )
        }
        {
          searchComplete && searchResult.length === 0 && (
            <div>No search result returned. Try searching for something else</div>
          )
        }
      </SearchResult>
      <RelatedSearch relatedSearch={relatedSearch} />
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