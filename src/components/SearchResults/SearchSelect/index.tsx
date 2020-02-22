import React from 'react';
import styled from 'styled-components';

interface ButtonProp {
  active: boolean;
}

const Container = styled.div`
  margin-bottom: 25px;
`

const Button = styled.button<ButtonProp>`
  background: ${props => props.active ? props.theme.button : "transparent"};
  color: ${props => props.active ? props.theme.searchCriteria : props.theme.text};
  padding: ${props => props.active ? '8px 15px' : "0"};
  border: 0;
  border-radius: 20px;
  margin-right: 15px;
`

interface Props {
  searchResult: string[];
  search: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchSelect: React.SFC<Props> = ({ searchResult, search, handleClick }) => {

  return( 
    <>
      {
        searchResult.length > 0 && (
          <Container>
            <Button title='web' onClick={handleClick} active={search === 'web' ? true : false}>Web</Button>
            <Button title='news' onClick={handleClick} active={search === 'news' ? true : false}>News</Button>
            <Button title='image' onClick={handleClick} active={search === 'image' ? true : false}>image</Button>
          </Container>
        )
      }
    </>
  );
}

export default SearchSelect;