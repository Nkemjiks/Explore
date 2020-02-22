import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 7px;

  h1 {
    margin-top: 120px;
    font-size: 5em;

    ${mq.tablet`
      margin-top: 180px;
    `}
    ${mq.laptop`
      margin-top: 250px;
    `}
  }

  h4 {
    text-align: center;
  }

  a {
    color: ${props => props.theme.button}
  }
`

const NotFound: React.SFC = () => (
  <Container>
    <h1>!Oops</h1>
    <h4>The page you are looking for doesn't seem to exist</h4>
    <div><Link to="/">Return to Home Page</Link></div>
  </Container>
);
export default NotFound;