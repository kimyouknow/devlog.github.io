import styled from '@emotion/styled'

import Layout from '@/Layout'

const About = () => {
  return (
    <Layout>
      <LayoutStyle>
        <h1>준비중입니다..😅</h1>
      </LayoutStyle>
    </Layout>
  )
}

const LayoutStyle = styled.div`
  width: 768px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default About
