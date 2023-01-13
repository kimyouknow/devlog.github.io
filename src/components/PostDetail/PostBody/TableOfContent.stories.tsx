import { ComponentMeta, Story } from '@storybook/react'

import TableOfContent, { TableOfContentProps } from './TableOfContent'

export default {
  title: 'CATEGORY/TableOfContent',
  component: TableOfContent,
  args: {},
} as ComponentMeta<typeof TableOfContent>

const Template: Story<TableOfContentProps> = args => <TableOfContent {...args} />

export const Default = Template.bind({})
Default.args = {
  tableOfContents: `<ul>
<li>
<p><a href="#1-mocking-api%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9D%B4%EC%9C%A0">1. Mocking API를 사용한 이유</a></p>
<ul>
<li><a href="#frontendfe-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%9E%85%EC%9E%A5%EC%97%90%EC%84%9C-%EC%83%9D%EA%B8%B4-%EA%B0%9C%EB%B0%9C-%EB%B3%91%EB%AA%A9-%ED%98%84%EC%83%81">Frontend(FE) 개발자의 입장에서 생긴 개발 병목 현상</a></li>
<li><a href="#fe%EC%97%90%EC%84%9C-mocking%ED%95%B4%EC%84%9C-%EB%B3%91%EB%AA%A9-%ED%98%84%EC%83%81%EC%9D%84-%ED%95%B4%EA%B2%B0%ED%95%98%EC%9E%90">FE에서 Mocking해서 병목 현상을 해결하자!</a></li>
</ul>
</li>
<li>
<p><a href="#2-%EC%97%AC%EB%9F%AC-%EA%B0%80%EC%A7%80-%EB%8C%80%EC%95%88-%EC%A4%91-msw%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9D%B4%EC%9C%A0">2. 여러 가지 대안 중 MSW를 선택한 이유</a></p>
</li>
<li>
<p><a href="#3-msw%EA%B0%80-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D">3. MSW가 동작하는 방식</a></p>
<ul>
<li>
<p><a href="#serivce-worker%EB%9E%80">Serivce worker란?</a></p>
</li>
<li>
<p><a href="#msw-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EB%B0%8F-%ED%99%9C%EC%9A%A9-%EB%B0%A9%EB%B2%95">MSW 동작 원리 및 활용 방법</a></p>
<ul>
<li><a href="#msw-%EB%8F%99%EC%9E%91%EC%9B%90%EB%A6%AC">MSW 동작원리</a></li>
<li><a href="#msw-%ED%99%9C%EC%9A%A9-%EB%B0%A9%EB%B2%95">MSW 활용 방법</a></li>
</ul>
</li>
</ul>
</li>
<li>
<p><a href="#4-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-%EC%84%A4%EB%AA%85">4. 간단한 사용 방법 설명</a></p>
<ul>
<li><a href="#%ED%95%B5%EC%8B%AC-tool-%EC%86%8C%EA%B0%9C">핵심 tool 소개</a></li>
</ul>
</li>
<li>
<p><a href="#5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%9C-%EB%B0%A9%EB%B2%95">5. 프로젝트에 적용한 방법</a></p>
<ul>
<li><a href="#%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%8B%A4%ED%96%89%EB%B0%A9%EB%B2%95">설치 및 실행방법</a></li>
<li><a href="#mocks-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0">mocks 폴더 구조</a></li>
<li><a href="#storybook%EA%B3%BC-%EC%97%B0%EB%8F%99">storybook과 연동</a></li>
</ul>
</li>
<li>
<p><a href="#6-%EC%82%AC%EC%9A%A9-%ED%9B%84%EA%B8%B0-%EB%B0%8F-%EA%B0%9C%EC%84%A0%EC%A0%90">6. 사용 후기 및 개선점</a></p>
</li>
<li>
<p><a href="#%EC%B0%B8%EA%B3%A0%EC%9E%90%EB%A3%8C">참고자료</a></p>
</li>
</ul>`,
}
