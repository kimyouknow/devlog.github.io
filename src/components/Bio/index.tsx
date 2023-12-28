import { StaticImage } from 'gatsby-plugin-image'
import { FaGithub } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

import { ImageSizeMap } from '@/components/Common/Image'
import useBlogConfig from '@/hooks/useBlogConfig'
import { copyToClipBoard } from '@/utils'

import * as S from './Bio.style'

const Bio = () => {
  const { social, author, description } = useBlogConfig()
  const onClickMailConfig = () => {
    copyToClipBoard(social.email)
  }
  return (
    <S.Container>
      {/* FIXME(@kimyouknow): Image 컴포넌트에서 src 넘겼을 때 gatsby query에서 찾아서 undefined처리되는 버그 해결하기  */}
      <StaticImage
        src="https://github.com/kimyouknow.png"
        alt="profile-image"
        style={{
          width: ImageSizeMap.l,
          height: ImageSizeMap.l,
          borderRadius: '50%',
          zIndex: 0,
          minWidth: ImageSizeMap.l,
        }}
      />
      <S.Info>
        <S.Author>{author}</S.Author>
        <S.Desc>{description}</S.Desc>
        <S.Socials>
          <li>
            <a onClick={onClickMailConfig}>
              <HiOutlineMail />
              Mail
            </a>
          </li>
          <li>
            <a href={social.github} target="_blank">
              <FaGithub />
              Github
            </a>
          </li>
          <li>
            <a href={social.til} target="_blank">
              <FaGithub />
              TIL
            </a>
          </li>
        </S.Socials>
      </S.Info>
    </S.Container>
  )
}

export default Bio
