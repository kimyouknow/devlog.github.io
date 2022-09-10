import { ComponentMeta, Story } from '@storybook/react'

import MainHeader, { MainHeaderProps } from './index'

export default {
  title: 'CATEGORY/MainHeader',
  component: MainHeader,
  args: {
    selectedCategory: 'All',
    categoryList: { All: 7, BACK: 2, JS: 2, Optimization: 3 },
  },
} as ComponentMeta<typeof MainHeader>

const Template: Story<MainHeaderProps> = args => <MainHeader {...args} />

export const Default = Template.bind({})
Default.args = {}
