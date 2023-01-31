import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: flex-start;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Author = styled.h3``

export const Desc = styled.div``

export const Socials = styled.ul`
  display: flex;
  gap: 8px;
  a {
    color: var(--color-text);

    :hover {
      color: var(--color-primary);
    }
  }
  a > svg {
    width: 28px;
    height: 28px;
  }
`
