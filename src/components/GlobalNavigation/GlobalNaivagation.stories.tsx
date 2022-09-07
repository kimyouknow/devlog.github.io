import { ComponentMeta, Story } from '@storybook/react'

import GlobalNaivagation from './index'

export default {
  title: 'CATEGORY/GlobalNaivagation',
  component: GlobalNaivagation,
  args: {},
} as ComponentMeta<typeof GlobalNaivagation>

const Template: Story<typeof GlobalNaivagation> = () => <GlobalNaivagation />

export const Default = Template.bind({})
Default.args = {}
