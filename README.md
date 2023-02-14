# 직접 만들어본 Gatsby blog

<p align="center">
    <img src="https://user-images.githubusercontent.com/71386219/218772463-4458b393-3ab6-4de8-9064-9fa19c8c1921.jpeg" alt="blog" >
    <br />
    <p align="center">
        <a href="https://kimyouknow.github.io">Home Page</a>
        ·
        <a href="https://github.com/kimyouknow/kimyouknow.github.io/pulls">Request Feature</a>
    </p align="center">
</p>
<br />

## 🙌 소개

진행한 프로젝트에 대해 간단하게 5~10줄 정도 써준다.

1번 내용들(프로젝트에 대한 정보)을 README로 쓰면 아래와 같다.

### 주요기능

- 반응형 웹
- 다크모드
- 코드 하이라이팅
- 글 목차(Table Of Content) 자동 생성
- 댓글 지원 (giscus)
- Configurable: blog-config를 통한 개인 설정
- bio: 자기소개
- seo
- sitemap.xml, robots.txt 자동 생성
- Google Analytics 지원

### 기술 스택

<p>
  <img src="https://img.shields.io/badge/TypeScript-2d79c7?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-7ddfff?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Gatsby-663399?style=flat-square&logo=Gatsby&logoColor=white"/>
  <img src="https://img.shields.io/badge/css-1572B6?style=flat&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Emotion-C865B9?style=flat&logo=emotion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white"/>
</p>

## 시작 가이드

### 💻 설치하기

```bash
# clone project
$ git clone https://github.com/kimyouknow/kimyouknow.github.io.git

# Install dependencies
$ yarn install

# Start development server
$ yarn dev
```

### ⚙️ 실행 전 블로그 정보 입력

위의 명령어로 실행하는데 문제가 없었다면 http://localhost:8000 에서 블로그를 확인하실 수 있습니다.

블로그 정보를 수정하고 싶다면 `blog-config.js`에서 필요한 값을 변경하면 됩니다.

#### 1. 블로그 정보

```js
{
  title: ``, //Yunho.blog
  author: '', // Yunho(kimyouknow)
  description: ``, // 안녕하세요. 프론트엔드 개발자 김윤호입니다. 고민과 문제 해결 과정을 공유하고 있습니다.
  siteUrl: '', // https://kimyouknow.github.io/
  image: ``, // static 경로에 원하는 사진을 넣어주시면 프로필 이미지로 반영됩니다. ex) ./static/profile-image.png
  keywords: [], // 원하는 키워드를 적어주시면 keywords meta태그에 반영됩니다. ex) '개발블로그', '문제해결', 'gatsby'
  favicon: '', // static 경로에 원하는 사진을 넣어주시면 favicon 이미지로 반영됩니다. ex) ./static/pencil.png
  social: {
    email: '', // kimyouknow@naver.com
    github: ``, //https://github.com/kimyouknow
    til: '', //https://github.com/kimyouknow/TIL
  },
}
```

#### 2. 댓글 정보

현재 utterance에서 giscus로 변경했습니다. 자세한 설정은 [giscus](https://giscus.app/ko)를 참고해주세요.

```js
{
  data_repo: '',
  data_repo_id: '',
  data_category: '',
  data_category_id: '',
  data_mapping: '',
}
```

#### 3. 기타 정보

검색 엔진 최적화 및 사이트 분석을 위해 [구글 서치 콘솔](https://search.google.com/search-console/welcome?hl=ko), [Google 애널리틱스](https://analytics.google.com/analytics/web/?hl=ko), [네이버 웹 마스터 도구](https://searchadvisor.naver.com/console/board)에서 필요한 정보를 세팅한 뒤 아래 설정을 변경하셔야 합니다.

```js
{
  seo: {
    google: process.env.GATSBY_SEO_GOOGLE,
    naver: process.env.GATSBY_SEO_NAVER,
  },
  gtag: {
    ga: process.env.GATSBY_ANALYTICS_GOOGLE,
  },
}
```

```env
# env.development와 env.production에 설정에 맞게 id를 입력해주세요.
GATSBY_SEO_GOOGLE=
GATSBY_SEO_NAVER=
GATSBY_ANALYTICS_GOOGLE=
```

### ✏️ 글 작성하기

글을 작성하기 위해 `/contents` 폴더 내부에 원하시는 분류에 맞게 디렉토리를 생성한 뒤 `index.md`을 생성해주세요. index.md 파일에는 markdown형식으로 작성하시면 됩니다.

#### 1. 글 목차(Table Of Content)

글 목차를 따로 작성할 필요 없습니다. [gatsby-remark-autolink-headers](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/)가 markdown의 h태그(h1, h2, h3 ...)를 자동으로 인식해 글 목차를 생성합니다.

#### 2. 마크다운 내 이미지 파일 삽입

markdown 작성 중 이미지를 사용하기 위해서는 index.md와 같은 디렉토리에 이미지 파일을 추가 한 뒤 아래와 같은 방법으로 사용하시면 됩니다.

```md
![이미지](./경로/파일이름.확장자)
```

#### 3. 포스트 meta 정보

index.md 파일 상단에는 meta 정보를 위한 설정을 해주셔야 합니다.

```js
---
date: '' // 작성 날짜 (yyyy-mm-dd)
title: '' // 제목
categories: [] // 카테고리 ex) 'WEB', '문제해결'
summary: '' // description meta 태그 및 글 목록에서 보여질 짧은 문장
thumbnail: './thumbnail.png'
---
```

### 📦 폴더 구조

```bash
.
├── contents
│   ├── category1
│   └── category2
│       └── post1
│            ├── index.md
│            └── image.png
├── src
│   ├── Layout # 프로젝트 전체 레이아웃 관리
│   ├── components
│   │   ├── Bio
│   │   ├── CategoryHeader
│   │   ├── Comment
│   │   ├── Footer
│   │   ├── GlobalNavigation
│   │   ├── PostDetail
│   │   ├── PostList
│   │   ├── SEO
│   │   └── Common # 공통 컴포넌트
│   ├── context # context api 관리
│   ├── fonts
│   ├── hooks # custom hooks
│   ├── mocks # mock data
│   ├── pages
│   ├── styles
│   ├── templates #포스트 template
│   ├── types
│   └── utils
└── static # 이미지 파일
```

## 트러블 슈팅

- [다크모드 구현 - css variable](https://github.com/kimyouknow/kimyouknow.github.io/pull/12)
- [다크모드 에러 (dark mode flash error) 수정](https://github.com/kimyouknow/kimyouknow.github.io/pull/20)
- [반응형 웹 - css variable](https://github.com/kimyouknow/kimyouknow.github.io/pull/18)
- [SEO, 웹 접근성](https://github.com/kimyouknow/kimyouknow.github.io/pull/15)
- [github action을 활용한 gh-pages 배포 자동화](https://github.com/kimyouknow/kimyouknow.github.io/pull/9)
- [이미지 처리](https://github.com/kimyouknow/kimyouknow.github.io/pull/9)

## 남은 개발 목록

### 핵심

- [x] : TOC
- [x] : 허스키 (커밋 전 린트 및 프리티어 실행)
- [x] : github action
- [x] : 헤더 글
- [x] : Bio
- [x] : 다크모드 구현
- [x] : SEO 설정, site meta
- [ ] : About 페이지
- [x] : 리드미 작성

### 추가

- [x] : 반응형 웹
- [x] : Read Time
- [x] : Google Analytics
- [x] : 간단한 반응
- [ ] : 조회수 표시
- [ ] : 검색 기능
- [x] : 카테고리 검색
- [ ] : 시리즈 검색
- [ ] : 이전 포스트 , 다음 포스트, 최신포스트
- [x] : 맞춤법 검사 자동화 -> vscode-hanspell extension으로 필요할 때마다 사용
