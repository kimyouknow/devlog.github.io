import CategoryList, { CategoryListProps } from '@/components/MainHeader/CategoryList'
import MainInfo from '@/components/MainHeader/MainInfo'

import * as S from './MainHeader.style'

export type MainHeaderProps = CategoryListProps

const MainHeader = ({ selectedCategory, categoryList }: MainHeaderProps) => {
  return (
    <S.Container>
      <MainInfo />
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
    </S.Container>
  )
}

export default MainHeader
