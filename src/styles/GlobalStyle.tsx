import { Global, css } from '@emotion/react'

import fonts from '@/fonts'

import Normalize from './Normalize'

const styles = css`
  ${fonts}
  ${Normalize}
  * {
    font-family: 'AppleSDGothicNeo', 'Noto Sans', 'sans-serif';
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  html,
  body,
  #___gatsby {
    height: 100%;
    scroll-behavior: smooth;
  }

  a,
  a:hover,
  button {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  ul,
  li {
    padding: 0;
    list-style: none;
  }
`

const GlobalStyle = () => {
  return <Global styles={styles} />
}

export default GlobalStyle
