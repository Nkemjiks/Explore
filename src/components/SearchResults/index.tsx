import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import mq from 'helpers/utils/mq';
import Toggle from 'components/Toggle';
import Search from 'components/SearchContainer';
import { getWebSearchResult, getNewSearchResult } from 'helpers/api';
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

const RelatedSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  flex-wrap: wrap;

  ${mq.tablet`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  `}
  ${mq.laptop`
    width: 830px;
  `}

  a {
    display: block;
    cursor: pointer;
    display: block;
    cursor: pointer;
    padding: 3px;
    text-decoration: none;
    color: ${props => props.theme.relatedSearch};
    margin-right: 5px;

    :hover {
      border-radius: 3px;
      padding: 6px;
      color: ${props => props.theme.relatedSearch};
    }
  }
`

interface ButtonProp {
  active: boolean;
}

const Button = styled.button<ButtonProp>`
  background: ${props => props.active ? props.theme.button : "transparent"};
  color: ${props => props.active ? props.theme.searchCriteria : props.theme.text};
  padding: ${props => props.active ? '8px 15px' : "0"};
  border: 0;
  border-radius: 20px;
  margin-right: 15px;
`

const SearchResults: React.SFC = () => {
  const location = useLocation().search;
  const [searchResult, setSearchResult] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState('web');
  const [relatedSearch, setRelatedSearch] = useState([]);

  const fetchSearchResult = async (query: string, page: number) => {
    let result;
    switch(search) {
      case 'web':
        result = await getWebSearchResult(query, page);
        break;
      case 'news':
        result = await getNewSearchResult(query, page)
        break;
      default:
        result = await getWebSearchResult(query, page)
    }
    ;
    setSearchResult(result.value);
    setRelatedSearch(result.relatedSearch);
    setLoading(false);
    setPageCount(result.totalCount)
    console.log(result);
  }

  const getQueryParams = () => queryString.parse(location).q;

  const handleClick = async(event: React.MouseEvent<HTMLButtonElement>) => {
    setSearch(event.currentTarget.title);
  }

  useEffect(() => {
    fetchSearchResult(getQueryParams() as string, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSearchResult(getQueryParams() as string, 1);
    setSearchResult([]);
    setRelatedSearch([]);
    setLoading(true);
    setActivePage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handlePageChange = (e: number) => {
    setActivePage(e);
    setLoading(true);
    setSearchResult([]);
    setRelatedSearch([]);
    fetchSearchResult(getQueryParams() as string, e);
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
          searchResult.length > 0 && (
            <div>
              <Button title='web' onClick={handleClick} active={search === 'web' ? true : false}>Web</Button>
              <Button title='news' onClick={handleClick} active={search === 'news' ? true : false}>News</Button>
              <Button title='image' onClick={handleClick} active={search === 'image' ? true : false}>image</Button>
            </div>
          )
        } 
        {
          searchResult.length > 0 && searchResult.map((result, i) => {
            return ( <DisplayWebSearchResult key={i} result={result}/> )
          })
        }
      </SearchResult>
      <RelatedSearchContainer>
        { relatedSearch.length > 0 && relatedSearch.map((result, i) => (
          <a dangerouslySetInnerHTML={{
            __html: result
          }}href={`/search?q=${result}`} key={i}></a>
        )) }
      </RelatedSearchContainer>
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