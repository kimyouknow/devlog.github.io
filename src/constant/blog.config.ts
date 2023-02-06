/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigType } from '@/types/gatsby.type'

// eslint-disable-next-line @typescript-eslint/no-var-requires,
const blogConfig = require('../../blog-config')

const BLOG_CONFIG: ConfigType = {
  ...blogConfig,
}

export default BLOG_CONFIG
