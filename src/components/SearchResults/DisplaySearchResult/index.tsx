import React from 'react';
import DisplayWebOrNewsSearchResult from './DisplayWebOrNewsSearchResult';
import DisplayImageSearchResult from './DisplayImageSearchResult';

interface Props {
  searchResult: never[];
  searchType: string;
}

const DisplaySearchResult: React.SFC<Props> = ({ searchResult, searchType }) => {
  switch(searchType) {
    case 'web':
    case 'news':
      return <DisplayWebOrNewsSearchResult searchResult={searchResult} />
    case 'image':
      return <DisplayImageSearchResult searchResult={searchResult} />
    default:
      return <DisplayWebOrNewsSearchResult searchResult={searchResult} />
  }
}

export default DisplaySearchResult;
