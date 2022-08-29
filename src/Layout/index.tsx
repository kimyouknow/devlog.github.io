import styled from '@emotion/styled'
import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import GlobalNavigation from '@/components/GlobalNavigation'
import Styles from '@/styles'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Styles>
      <Container>
        <GlobalNavigation />
        <main>{children}</main>
        <Footer />
      </Container>
    </Styles>
  )
}

export default Layout

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
