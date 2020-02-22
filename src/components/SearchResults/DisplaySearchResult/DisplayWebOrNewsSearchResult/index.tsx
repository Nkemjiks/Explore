import React from 'react';
import DisplayResult from './DisplayResult';

interface WebResult {
  title: string;
  url: string;
  body: string;
  datePublished: string;
}

interface Props {
  searchResult: WebResult[];
}

const DisplayWebOrNewsSearchResult: React.SFC<Props> = ({ searchResult }) => {
  return(
    <>
      {
        searchResult.length > 0 && searchResult.map((result, i) => {
          return ( <DisplayResult key={i} result={result}/> )
        })
      }
    </>
  );
}

export default DisplayWebOrNewsSearchResult;