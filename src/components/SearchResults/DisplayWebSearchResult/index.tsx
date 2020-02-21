import React from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';

const Container = styled.a`
  margin-bottom: 20px;
  display: block;
  text-decoration: none;

  ${mq.tablet`
  `}
`

const Title = styled.h4`
  color: ${props => props.theme.link};
  margin-bottom: 10px;
  :hover {
    text-decoration: underline;
  }
`

const Body = styled.p`
  color: ${props => props.theme.text};
  margin: 5px 0;
  font-size: 14px;
`

const DatePublished = styled.p`
  color: ${props => props.theme.text};
  margin: 5px 0;
  font-size: 14px;
`

interface Result {
  title: string;
  url: string;
  body: string;
  datePublished: string;
}

interface Props {
  result: Result
}

const DisplayWebSearchResult: React.SFC<Props> = ({ result }) => {

  const truncate = (body: string) => {
    if(body.length > 200) {
      return body.substring(0, 200) + "...";
    }
    return body;
  }

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newDate = day + "-" + month + "-" + year;
    return newDate;
  }
  return(
    <Container href={result.url} target='blank'>
      <Title>{result.title}</Title>
      <DatePublished>{getDate(result.datePublished)}</DatePublished>
      <Body>{truncate(result.body)}</Body>
    </Container>
  );
}

export default DisplayWebSearchResult;