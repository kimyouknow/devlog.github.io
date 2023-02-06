import PostFooter from '@/components/PostDetail/PostFooter'
import SEO from '@/components/SEO'
import Layout from '@/Layout'
import { PostPageItemType } from '@/types/PostItem.types'

import PostBody from './PostBody'
import PostHeader from './PostHeader'

interface PostPageInfoProps {
  postPageInfo: PostPageItemType
  href: string
  author: string
  favicon: string
  seo: {
    google: string
    naver: string
  }
}

const PostDetail = ({ postPageInfo, href, author, favicon, seo }: PostPageInfoProps) => {
  const {
    node: {
      tableOfContents,
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = postPageInfo
  return (
    <Layout>
      <SEO
        author={author}
        siteUrl={href}
        title={title}
        description={summary}
        image={publicURL}
        keywords={categories}
        favicon={favicon}
        seo={seo}
      />
      <PostHeader title={title} date={date} categories={categories} thumbnail={gatsbyImageData} />
      <PostBody tableOfContents={tableOfContents} html={html} />
      <PostFooter />
    </Layout>
  )
}

export default PostDetail
