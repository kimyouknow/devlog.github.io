import Bio from '@/components/Bio'
import CategoryList, { CategoryListProps } from '@/components/CategoryHeader/CategoryList'

import * as S from './CategoryHeader.style'

export type CategoryHeaderProps = CategoryListProps

const MainHeader = ({ selectedCategory, categoryList }: CategoryHeaderProps) => {
  return (
    <S.Container>
      <Bio />
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
    </S.Container>
  )
}

export default MainHeader
