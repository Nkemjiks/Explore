import React from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';

const Container = styled.div`
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

interface Props {
  relatedSearch: string[];
}

const RelatedSearch: React.SFC<Props> = ({ relatedSearch }) => {

  return( 
    <Container>
      { relatedSearch.length > 0 && relatedSearch.map((result, i) => (
        <a dangerouslySetInnerHTML={{
          __html: result
        }}href={`/search?q=${result}`} key={i}></a>
      )) }
    </Container>
  );
}

export default RelatedSearch;