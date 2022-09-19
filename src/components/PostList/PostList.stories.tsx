import { ComponentMeta, Story } from '@storybook/react'

import { posts } from '@/mocks/posts.mock'

import PostList, { PostListProps } from './index'

export default {
  title: 'CATEGORY/PostList',
  component: PostList,
  args: {},
} as ComponentMeta<typeof PostList>

const Template: Story<PostListProps> = args => <PostList {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedCategory: 'All',
  posts: posts,
}

export const SelectJSCategory = Template.bind({})
SelectJSCategory.args = {
  selectedCategory: 'javascript',
  posts: posts,
}
