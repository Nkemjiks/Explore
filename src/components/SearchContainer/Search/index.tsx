import React from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';

const Container = styled.div`
  width: 100%;
  position: relative;

  ${mq.tablet`
    margin-top: 60px;
  `}

  ${mq.laptop`
    width: 660px;
    margin-top: 60px;
  `}
`

const Search = styled.input.attrs({type: "text"})`
  width: 100%;
  height: 52px;
  margin-top: 30px;
  background-color: ${props => props.theme.search};
  border: 0;
  padding: 0 10px;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  font-size: 16px;
  box-sizing: border-box;
  color: ${props => props.theme.body};
  ::placeholder {
    color: ${props => props.theme.body};
    opacity: 0.5;
  }
`

const AutoCompleteContainer = styled.div`
  position: absolute;
  z-index: 1;
  background-color: ${props => props.theme.search};
  color: ${props => props.theme.body};
  width: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.line};

  a {
    display: block;
    cursor: pointer;
    display: block;
    cursor: pointer;
    padding: 3px;
    text-decoration: none;
    :hover {
      background-color: #a5a5a5;
      border-radius: 3px;
      padding: 6px;
      color: ${props => props.theme.body};
    }
    :focus, :visited {
      color: ${props => props.theme.body};
    }
  }
`

interface Props {
  handleInputChange: (event: any) => void,
  results: string[],
  query: string
}

const SearchContainer: React.SFC<Props> = ({ handleInputChange, results, query }) => {

  return( 
    <Container>
      <Search placeholder="Search for" onChange={handleInputChange} />
      {
        results.length > 0 && query.length > 0 && (
          <AutoCompleteContainer>
            { results.map((result, i) => (<a href="#"key={i}>{result}</a>)) }
          </AutoCompleteContainer>
        )
      }
    </Container>
  );
}

export default SearchContainer;