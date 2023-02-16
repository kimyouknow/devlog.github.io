import { graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'
import { useMemo } from 'react'

import MainHeader from '@/components/CategoryHeader'
import { CategoryListProps } from '@/components/CategoryHeader/CategoryList'
import PostList from '@/components/PostList'
import SEO from '@/components/SEO'
import Layout from '@/Layout'
import { PostListItemType, PostType } from '@/types/PostItem.types'

interface IndexPageProps {
  location: {
    hash: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}

const IndexPage = ({
  location: { hash },
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const parsed: ParsedQuery<string> = queryString.parse(hash)
  const selectedCategory = typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category
  // category 프로퍼티 값이 문자열 형태가 아니거나 존재하지 않는 경우에는 기본적으로 카테고리 값을 All로 지정하고, 그러지 않은 경우에는 파싱한 값을 지정
  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          categoryList: CategoryListProps['categoryList'], //acc
          {
            node: {
              frontmatter: { categories },
            },
          }: PostType, //cur
        ) => {
          categories.forEach(category => {
            if (categoryList[category] === undefined) categoryList[category] = 1
            else categoryList[category]++
          })

          categoryList['All']++

          return categoryList
        },
        { All: 0 },
      ),
    [],
  )
  return (
    <Layout>
      <SEO />
      <MainHeader selectedCategory={selectedCategory} categoryList={categoryList} />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Layout>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }) {
      edges {
        node {
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY-MM-DD")
            categories
          }
        }
      }
    }
  }
`
