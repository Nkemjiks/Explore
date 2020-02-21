import React, { useContext } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { ThemeContext } from '../../helpers/theme/ThemeContext';

interface Props {};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  p {
    font-size: 15px;
    margin-right: 5px;
    margin-top: 10px;
  }
`

const Toggle: React.SFC<Props> = (props) => {
  const { state, dispatch } = useContext(ThemeContext);

  const updateSwitchState = () => {
    dispatch({type: 'toggleTheme'});
  }

  return(
    <Header>
      <p>Dark mode</p>
      <Switch
        checked={state.checked}
        onChange={updateSwitchState}
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={18}
        height={20}
        width={35}
      />
    </Header>
  );
}

export default Toggle;