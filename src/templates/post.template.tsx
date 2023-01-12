import { graphql } from 'gatsby'
import React from 'react'

import Comment from '@/components/Comment'
import PostContent from '@/components/PostDetail/PostContent'
import PostHeader from '@/components/PostDetail/PostHeader'
import TableOfContent from '@/components/PostDetail/TableOfContent'
import Layout from '@/Layout'
import { PostPageItemType } from '@/types/PostItem.types'

interface PostTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[] // 존재하지 않는 타입이므로 에러가 발생하지만 일단 작성해주세요
    }
  }
}

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostTemplateProps) => {
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
        },
      },
    },
  } = edges[0]
  return (
    <Layout>
      <PostHeader title={title} date={date} categories={categories} thumbnail={gatsbyImageData} />
      <TableOfContent tableOfContents={tableOfContents} />
      <PostContent html={html} />
      <Comment />
    </Layout>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          tableOfContents
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
