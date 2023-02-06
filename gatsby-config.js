// const blogConfig = require('./blog-config')

const blogConfig = {
  title: `Yunho.blog`,
  author: 'kimyouknow',
  description: `안녕하세요. 프론트엔드 개발자 김윤호입니다. 고민과 문제 해결 과정을 공유하고 있습니다.`,
  siteUrl: 'https://kimyouknow.github.io/',
  image: `./static/profile-image.png`,
  keywords: ['개발블로그', '문제해결', 'gatsby'],
  favicon: './static/pencil.png',
  social: {
    email: 'kimyouknow@naver.com',
    github: `https://github.com/kimyouknow`,
    til: 'https://github.com/kimyouknow/TIL',
  },
  seo: {
    google: 'tVBxZo5I8DxzZ85vj9woXyc8EAeHxELgaAWw',
    naver: 'c9a477f101da10816af24aee5c842d24aab22ac6',
  },
  utterances: {
    src: 'https://utteranc.es/client.js',
    repo: 'kimyouknow/kimyouknow.github.io',
    'issue-term': 'pathname',
    theme: 'github-light',
    label: '💬 comments',
    crossorigin: 'anonymous',
    async: 'true',
  },
}

module.exports = {
  siteMetadata: { ...blogConfig },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Dark (Visual Studio)', // Or install your favorite theme from GitHub
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              // className: `custom-class`,
              isIconAfterHeader: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: blogConfig.siteUrl,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: blogConfig.title,
        short_name: blogConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: blogConfig.favicon,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: blogConfig.siteUrl,
        sitemap: `${blogConfig.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-advanced-sitemap',
  ],
}
