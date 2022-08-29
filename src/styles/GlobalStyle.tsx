import { Global, css } from '@emotion/react'

const styles = css`
  * {
    font-family: 'Noto Sans';
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
