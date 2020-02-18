import React, { useContext } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { ThemeContext } from '../../helpers/theme/ThemContext';

interface Props {
  theme: any;
};

const Container = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const LandingPage: React.SFC<Props> = (props) => {
  const { state, dispatch } = useContext(ThemeContext);

  const updateSwitchState = () => {
    dispatch({type: 'toggleTheme'});
  }

  return(
    <Container theme={state.theme}>
      Dark mode
      <Switch
        checked={state.checked}
        onChange={updateSwitchState}
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={18}
        height={20}
        width={35}
      />
    </Container>
  );
}

export default LandingPage;