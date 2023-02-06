import useBlogConfig from '@/hooks/useBlogConfig'

import * as S from './MainInfo.style'

const MainInfo = () => {
  const { description } = useBlogConfig()
  return (
    <S.MainInfo>
      <S.Info>{description}</S.Info>
    </S.MainInfo>
  )
}

export default MainInfo
