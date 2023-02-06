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
            siteUrl
            description
            image
            keywords
          }
        }
      }
    `,
  )
  return site.siteMetadata
}
