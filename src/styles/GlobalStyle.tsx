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

  body {
    --color-background: #f3f5f7;
    --color-background-secondary: #ffffff;
    --color-category-chip: #eceef1;
    --color-text: #00214d;
    --color-heading-text: #000;
    --color-paragraph: #1b2e46;
    --color-anchor-text: #0076d1;
    --color-code-background: #d7dad3;
    --color-code-text: #212529;
    --color-table-background-color: #fff;
    --color-table-background-color-second: #f6f8fa;
    --color-table-border: #d0d7de;
    --color-navigation-shadow: rgba(0, 0, 0, 0.08);

    --color-primary: #218bff;
    --color-secondary: #54aeff;
    /* --color-tertiary: */
    --color-white: #f3f5f7;
    --color-black: #222;
    --color-gray: #5a6072;
    --color-gray-1000: #21232c;
    --color-overlay: #61646bcc;
  }

  body.dark {
    --color-background: #242629;
    --color-background-secondary: #151519;
    --color-category-chip: #242629;
    --color-text: #dbdbdb;
    --color-heading-text: #fff;
    --color-paragraph: #abb5c3;
    --color-anchor-text: #0076d1;
    --color-code-background: #495057;
    --color-code-text: #f8f9fa;
    --color-table-background-color: #151519;
    --color-table-background-color-second: #0d1117;
    --color-table-border: #424242;
    --color-navigation-shadow: rgba(0, 0, 0, 0.08);

    --color-primary: #79c0ff;
    --color-secondary: #1f6feb;
    /* --color-tertiary:  */
  }
`

const GlobalStyle = () => {
  return <Global styles={styles} />
}

export default GlobalStyle
