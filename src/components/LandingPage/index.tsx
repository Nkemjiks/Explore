import React from 'react';
import styled from 'styled-components';
import mq from 'helpers/utils/mq';
import Toggle from 'components/Toggle';
import Search from 'components/SearchContainer';

const Container = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  height: 100vh;
  padding: 10px 30px;
  box-sizing: border-box;

  ${mq.tablet`
  `}
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  ${mq.tablet`
    margin-top: 90px;
  `}
`
const Logo = styled.h1`
  font-size: 40px;

  ${mq.tablet`
    font-size: 50px;
  `}
`

const LandingPage: React.SFC = (props: any) => {

  return(
    <Container>
      <Toggle />
      <SubContainer>
        <Logo>Explore</Logo>
        <Search />
      </SubContainer>
    </Container>
  );
}

export default LandingPage;