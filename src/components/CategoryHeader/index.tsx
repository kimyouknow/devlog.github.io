import CategoryList, { CategoryListProps } from '@/components/CategoryList'

import * as S from './CategoryHeader.style'
import CategoryInfo from './CategoryInfo'

export type CategoryHeaderProps = CategoryListProps

const MainHeader = ({ selectedCategory, categoryList }: CategoryHeaderProps) => {
  return (
    <S.Container>
      <CategoryInfo />
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
    </S.Container>
  )
}

export default MainHeader
