import BLOG_CONFIG from '@/constant/blog.config'

import * as S from './CategoryHeader.style'

const CategoryInfo = () => {
  return (
    <S.CategoryInfo>
      <S.Info>{BLOG_CONFIG.introduction}</S.Info>
    </S.CategoryInfo>
  )
}

export default CategoryInfo
