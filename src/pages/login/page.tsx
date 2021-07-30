import React from 'react';
import { withHatch } from 'framework';
import styled from 'styled-components';
import { createEvent } from 'effector';
import { checkAnonymous } from '../../features/session/model';
import { hatch } from './contract';

export const loginBtnClicked = createEvent<React.MouseEvent<HTMLButtonElement>>();

const LoginButton = styled.button`
  font-size: var(--button-font-size-normal);
  line-height: var(--button-height-normal);
  padding: 0 24px;
  background-color: var(--primary);
  color: var(--primary-text);
  border-color: var(--primary-border);
  border-radius: var(--button-border-radius);
  border: thin solid;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginPage = withHatch(hatch, () => {
  return (
    <Container>
      <LoginButton onClick={loginBtnClicked}> Login via Accesso </LoginButton>
    </Container>
  );
});

checkAnonymous({ when: hatch.enter });
