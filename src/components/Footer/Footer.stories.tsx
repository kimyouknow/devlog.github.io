import { ComponentMeta, Story } from '@storybook/react'

import Footer from './index'

export default {
  title: 'CATEGORY/Footer',
  component: Footer,
  args: {},
} as ComponentMeta<typeof Footer>

const Template: Story<typeof Footer> = () => <Footer />

export const Default = Template.bind({})
Default.args = {}
