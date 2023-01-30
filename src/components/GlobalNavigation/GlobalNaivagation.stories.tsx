import { ComponentMeta, Story } from '@storybook/react'

import GlobalNavigation from './index'

export default {
  title: 'CATEGORY/GlobalNavigation',
  component: GlobalNavigation,
  args: {},
} as ComponentMeta<typeof GlobalNavigation>

const Template: Story<typeof GlobalNavigation> = () => <GlobalNavigation />

export const Default = Template.bind({})
Default.args = {}
