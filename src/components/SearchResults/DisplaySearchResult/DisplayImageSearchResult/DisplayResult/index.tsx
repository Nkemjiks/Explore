import React from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';

const Container = styled.a`
  margin-bottom: 20px;
  display: block;
  text-decoration: none;
  height: 200px;
  width: 50%;
  padding: 0 5px;

  :hover {
    text-decoration: none;
  }

  div {
    height: 90%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${mq.tablet`
    width: 33%;
  `}

  ${mq.laptop`
    width: 25%;
  `}
`

const Title = styled.h4`
  color: ${props => props.theme.link};
  margin-bottom: 10px;
  font-size: 12px;
  :hover {
    text-decoration: underline;
  }
`

interface Result {
  title: string;
  name: string;
  url: string;
  thumbnail: string;
}

interface Props {
  result: Result
}

const DisplayResult: React.SFC<Props> = ({ result }) => {
  const truncate = (body: string) => {
    if(body.length > 30) {
      return body.substring(0, 30) + "...";
    }
    return body;
  }
  return(
    <Container href={result.url} target='blank'>
      <div>
        <img src={result.url} alt='thumbnail' />
      </div>
      <Title dangerouslySetInnerHTML={{
        __html: truncate(result.title)
      }}></Title>
    </Container>
  );
}

export default DisplayResult;