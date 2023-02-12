import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: var(--gnb-height);
  color: var(--color-text);
  background-color: var(--color-background);
  > main {
    flex: 1;
  }
`
