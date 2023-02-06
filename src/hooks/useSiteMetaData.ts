import { useStaticQuery, graphql } from 'gatsby'

import { SiteMetaData } from '@/types/gatsby.type'

interface SiteMeta {
  site: {
    siteMetadata: SiteMetaData
  }
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMeta>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author
            title
            description
            siteUrl
            image
            keywords
            favicon
            social {
              email
              github
              til
            }
            seo {
              google
              naver
            }
          }
        }
      }
    `,
  )
  return site.siteMetadata
}
