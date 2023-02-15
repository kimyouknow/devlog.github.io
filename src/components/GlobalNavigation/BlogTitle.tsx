import useBlogConfig from '@/hooks/useBlogConfig'

import * as S from './GlobalNavigation.style'

const BlogTitle = () => {
  const { siteName } = useBlogConfig()
  return (
    <S.BlogTitle>
      <a href="/">{siteName}</a>
    </S.BlogTitle>
  )
}

export default BlogTitle
