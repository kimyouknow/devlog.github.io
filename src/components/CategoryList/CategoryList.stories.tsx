import { ComponentMeta, Story } from '@storybook/react'

import CategoryList, { CategoryListProps } from './index'

export default {
  title: 'CATEGORY/CategoryList',
  component: CategoryList,
  args: {
    selectedCategory: 'All',
    categoryList: { All: 0 },
  },
} as ComponentMeta<typeof CategoryList>

const Template: Story<CategoryListProps> = args => <CategoryList {...args} />

export const Default = Template.bind({})
Default.args = {}
