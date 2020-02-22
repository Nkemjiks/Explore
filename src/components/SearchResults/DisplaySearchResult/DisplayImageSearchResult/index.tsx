import React from 'react';
import styled from 'styled-components';
import DisplayResult from './DisplayResult';

interface Result {
  title: string;
  name: string;
  url: string;
  thumbnail: string;
}

interface Props {
  searchResult: Result[];
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
`
const DisplayImageSearchResult: React.SFC<Props> = ({ searchResult }) => {
  return(
    <Container>
      {
        searchResult.length > 0 && searchResult.map((result, i) => {
          return ( <DisplayResult key={i} result={result}/> )
        })
      }
    </Container>
  );
}

export default DisplayImageSearchResult;