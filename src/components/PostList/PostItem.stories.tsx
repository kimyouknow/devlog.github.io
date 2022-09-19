import { ComponentMeta, Story } from '@storybook/react'

import { post } from '@/mocks/posts.mock'

import PostItem, { PostItemProps } from './PostItem'

export default {
  title: 'CATEGORY/PostItem',
  component: PostItem,
  args: {},
} as ComponentMeta<typeof PostItem>

const Template: Story<PostItemProps> = args => <PostItem {...args} />

export const Default = Template.bind({})
Default.args = {
  ...post,
}

export const WithLongTitle = Template.bind({})
WithLongTitle.args = {
  ...post,
  title:
    '테스트용 엄청 긴 제목입니다. 테스트용 엄청 긴 제목입니다. 테스트용 엄청 긴 제목입니다. 테스트용 엄청 긴 제목입니다.',
}

export const WithLongSummary = Template.bind({})
WithLongSummary.args = {
  ...post,
  summary:
    '홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.홈페이지를 운영하는 많은 사람들 또는 기업들이 검색 페이지 최상단에 보여지게 하기 위해 어떤 최적화 작업을 하는지 알아보자.',
}
