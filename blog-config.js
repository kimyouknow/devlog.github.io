module.exports = {
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
    google: process.env.GATSBY_SEO_GOOGLE,
    naver: process.env.GATSBY_SEO_NAVER,
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
