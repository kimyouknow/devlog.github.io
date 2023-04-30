---
date: '2023-03-06'
title: '여기저기 떨어진 Route 관련 코드를 모으자'
categories: ['WEB', '리팩토링', '응집도', 'React']
summary: '프로젝트를 진행하며 라우팅을 효과적으로 다뤄야 할 필요성을 느꼈습니다. react-router-dom(v6)에서 제공하는 useRoutes와 Outlet를 활용하여 라우팅과 관련된 코드를 모아 응집도를 높였습니다.'
thumbnail: './overview.png'
---

## 요약

프로젝트를 진행하며 라우팅을 효과적으로 다뤄야 할 필요성을 느꼈습니다. react-router-dom(v6)에서 제공하는 [useRoutes](https://reactrouter.com/en/main/hooks/use-routes)와 [Outlet](https://reactrouter.com/en/main/components/outlet)를 활용하여 라우팅과 관련된 코드를 모아 응집도를 높였습니다.

## 1. 라우팅 관리의 필요성

현재 아래 예시와 같은 형태로 App.jsx에서 모든 라우팅을 관리하고 있습니다.

**/src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './constant'
import Layout from './Layout'
import Main from './pages/Main'
import About from './pages/About'
import Fruits from './pages/Fruits'
import Apple from './pages/Apple'
import Banana from './pages/Banana'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.FRUITS.INDEX} element={<PublicRoute Component={Fruits} restricted={restricted} />}>
            <Route path={ROUTES.FRUITS.APPLE} element={<PrivateRtoue Component={Apple} restricted={restricted} />} />
            <Route path={ROUTES.FRUITS.BANANA} element={<Banana />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

**src/layouts/index.tsx**

```tsx
import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from './constant'

const Layout = () => {
  return (
    <div>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={ROUTES.HOME}>HOME</Link>
        <Link to={ROUTES.ABOUT}>ABOUT</Link>
        <Link to={ROUTES.FRUITS.INDEX}>FRUITS</Link>
        <Link to={ROUTES.FRUITS.APPLE}>APPLE of FRUITS</Link>
        <Link to={ROUTES.FRUITS.BANANA}>BANANA of FRUITS</Link>
      </ul>
      <Outlet />
    </div>
  )
}

export default Layout
```

**/src/pages/Fruits/index.tsx**

```tsx
import { Outlet } from 'react-router-dom'

const Fruits = () => {
  return (
    <div>
      <h1>Fruits</h1>
      <Outlet />
    </div>
  )
}

export default Fruits
```

언젠가 한 번쯤 봤을 만한 구조라고 생각하시나요? 바로, [React-Router 공식문서](https://reactrouter.com/en/main/route/route#layout-routes)에서 나와 있는 예시와 같은 구조입니다.

예시처럼 페이지가 몇 개 없는 간단한 구조에서는 크게 문제가 되지 않지만, 프로젝트에서 사용하는 페이지가 늘어날수록 개발할 때 불편한 점이 생겼습니다.

### 기존 방식의 문제점

1. App.jsx은 엔트리 포인트로 App 전체에 사용되고 있는 기능이 보여야 한다고 생각합니다. 하지만 App.jsx에서 모든 라우팅을 관리하다 보니 `프로젝트에서 전체적으로 사용하는 기능을 한눈에 파악하기 어려웠습니다.` (스타일, 상태관리 등등 다양한 wrapper 컴포넌트가 추가될 수 있습니다. )
2. Route와 Link를 개발자가 직접 작성합니다. (Array.prototype.map을 활용하고 싶어집니다.)
3. 페이지가 5개만 넘어가도 `일반 Route 및 중첩된 Route를 파악하기 어렵습니다.`
4. Route마다 HOC(High Order Component)를 직접 감싸줘야 합니다. ( Authorization과 관련된 로직이 포함된 PrivateRoute, PublicRoute를 HOC로 사용하고 있습니다. )

## 2. 반복되는 코드 줄이기

우선 반복되는 코드를 map을 활용해 줄이는 것부터 시작했습니다. 로그인이 필요한 페이지(Private)와 로그인이 필요하지 않은 페이지(Public)를 구분해서 배열로 관리하도록 했습니다.

그런 다음 react-router-dom-v6에서 제공하는 [useRoutes](https://reactrouter.com/en/main/hooks/use-routes)를 활용해 /src/routes/index.jsx에서 모든 라우팅을 관리하도록 했습니다.

### Private 라우터와 Public 라우터 등 기능에 따라 구분하기

이전에는 `<Route>`컴포넌트마다 아래와 같이 Public인지 Private인지 element를 감싸는 형태로 코드를 작성했습니다.

```tsx
// App.jsx
  <Route path={ROUTE.SIGN_UP} element={<PublicRoute Component={SignUp} restricted />} />
  <Route path={ROUTE.LOGIN} element={<PublicRoute Component={Login} restricted />} />
  <Route path={ROUTE.PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
```

반복되는 코드를 Array.map을 활용해 줄이고, 별도의 파일에서 관리하도록 수정했습니다.

**로그인한 유저만 접근할 수 있는 Private Routes**

```tsx
// /src/routes/privateRoutes.js
const routes = [
  {
    path: ROUTE.PROFILE, // 브라우저에서 라우팅되어야하는 경로
    element: EditUserProfile, // 컴포넌트
    restricted: true, // hoc에서 사용할 속성
  },
  // 생략
]
const privateRoutes = routes.map(({ path, element, restricted }) => ({
  path,
  element: <PrivateRoute Component={element} restricted={restricted} />,
}))
```

**모든 유저가 접근할 수 있는 Public Routes**

```tsx
// /src/routes/publicRoutes.js
const routes = [
  {
    path: ROUTE.SIGN_UP,
    element: SignUp,
    restricted: true,
  },
  {
    path: ROUTE.LOGIN + ROUTE.ALL,
    element: LoginRoute,
    restricted: true,
  },
  // 생략
]
const publicRoutes = routes.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRoute Component={element} restricted={restricted} />,
}))
```

## 3. 엔트리포인트에서 라우팅 관리하기

기능에 따라 나눈 Routes 배열을 모을 차례입니다.

### **프로젝트에서 사용하는 모든 라우팅을 모으는 곳(`src/routes/index.jsx`)**

useRoutes의 children 기능을 활용해, 반복되는 layout 구조를 `src/layouts/LayoutFullPage.tsx` 컴포넌트의 `<Outlet />` 으로 렌더링 될 수 있게 구분했습니다.

```tsx
export default function Router() {
  const element = [
    {
      element: <LayoutWithHeader />, // GNB 헤더가 필요한 레이아웃
      children: [...publicRoutes, ...privateRoutes],
    },
    {
      element: <LayoutFullPage />, // GNB 헤더가 필요하지 않은 레이아웃
      children: [...etcRoutes],
    },
  ]
  return useRoutes(element)
}
```

## 4. 중첩된 라우팅 처리하기

중첩된 라우팅의 경우 별도의 라우터 컴포넌트 만들어 줍니다.

```tsx
// /src/routes/index.jsx
const fruitsRoutes = [
  { path: ROUTES.FRUITS.APPLE, element: <Apple /> },
  { path: ROUTES.FRUITS.BANANA, element: <Banana /> },
]

const Fruits = ({ children }) => {
  return (
    <div>
      <h1>Fruits</h1>
      {children}
    </div>
  )
}

const FruitRouter = () => {
  return (
    <>
      <Fruits>
        <Routes>
          {fruitsRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Fruits>
    </>
  )
}

const routes: RouteProps[] = [
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
  },
  {
    path: ROUTES.FRUITS.INDEX + ROUTES.ALL,
    element: <FruitRouter />,
  },
]

const Router = () => {
  const element = [
    {
      element: <Layout />,
      children: routes,
    },
  ]
  return useRoutes(element)
}
```

## 5. 하나의 RouteInfo에서 관리하기: (Update 2023.03.06)

> 해당 내용은 원티드에서 진행한 [3월 원티드 프리온보딩 프론트엔드 과정](https://github.com/blueStragglr/wanted-pre-onboarding-3-FE-quest)의 일부 내용을 참고했습니다.

위와 같은 방법은 라우팅과 관련된 `응집도`가 떨어집니다.

Constant라는 파일에서 Path와 관련된 변수를 관리하고, GNB에서 사용할 링크를 관리해야 하고, Layout에 사용할 라우팅은 또 따로 관리해야 합니다.

`라우팅과 관련된 코드들이 분리되어 있어 휴먼 에러가 발생할 가능성이 있다고 느껴졌습니다.` 실제로 프로젝트에서 해당 구조를 사용하면서 라우팅과 관련된 로직을 팀원에게 설명해야 하는 시간이 꽤 걸렸습니다.

### 응집도를 높여서 문제를 해결해보자!

`높은 응집도는 코드를 유지 보수하기 쉽게 만들어 주는 장점이 있습니다.`

응집도가 높은 코드는 관련 기능을 함께 묶어 놓으므로, 코드를 이해하거나 수정해야 할 때 해당 기능과 관련된 코드를 찾는 것이 쉬워집니다. 또한 기능을 변경하거나 추가할 때 다른 부분에 영향을 주지 않도록 코드를 수정할 수 있습니다.

라우팅과 관련된 모아서 사용한다면 라우팅과 관련된 기능을 변경해야 할 경우 코드를 쉽게 찾고 수정할 수 있게 할 수 있지 않을까 생각했습니다.

응집도를 높이기 위해 우선 라우팅과 관련된 주요 기능을 다시 정리해 보았습니다.

### 주요 기능

- 권한 여부에 따라 페이지를 구분해야 한다.
  - 로그인이 필요한 페이지
  - 로그인이 필요하지 않은 페이지
- 레이아웃 형태가 다를 수 있다.
  - GNB가 있는 레이아웃
  - GNB가 없는 레이아웃

### RouteInfo 인터페이스 만들기

주요 기능은 겹칠 수 있습니다. 예를 들어, GNB가 있는 레이아웃에 접근을 위해 로그인이 필요한 페이지가 있을 수 있습니다. 주요 기능에 따라 유동적으로 필터링할 수 있게 라우팅에서 필요한 속성을 모두 포함한 RouteInfo 인터페이스를 정의했습니다.

**RouterInfo Interface**

```tsx
export interface RouterInfo {
  label: string
  path: typeof ROUTE[keyof typeof ROUTE]
  element: ElementType
  withAuthorization: boolean
  restricted: boolean
  isInGnb: boolean
  withLayoutHeader: boolean
}
```

이후 **Array.prototype.filter()를 활용해** 인증이 필요한지 여부나 헤더가 있는지 등의 기준에 따라 하위 집합 라우터를 쉽게 생성할 수 있게 만들었습니다.

```tsx
const withPrivate = (routerInfo: RouterInfo) => routerInfo.withAuthorization

const withPublic = (routerInfo: RouterInfo) => !routerInfo.withAuthorization

const withLayoutHeader = (routerInfo: RouterInfo) => routerInfo.withLayoutHeader

const withLayoutFullPage = (routerInfo: RouterInfo) => !routerInfo.withLayoutHeader

const withRestricted = (routerInfo: RouterInfo) => routerInfo.restricted

const withInGnb = (routerInfo: RouterInfo) => routerInfo.isInGnb

const routesWithHeaderPrivate = routerInfoList.filter(withPrivate).filter(withLayoutHeader)
```

### 반복되는 filter함수 줄이기

코드의 표현력을 높이기 위해 함수형 프로그래밍에서 자주 사용되는 go함수의 개념을 활용했습니다.

> go 함수: 함수형 프로그래밍에서 go 함수는 파이프 라인(pipeline)을 만들어 주는 함수입니다. go 함수는 여러 개의 인자를 받아 첫 번째 인자를 함수에 적용한 결과를 다음 함수의 첫 번째 인자로 넘겨주고, 이 과정을 인자의 개수만큼 반복하여 마지막 함수의 결과를 반환합니다. 이러한 방식으로 go 함수는 여러 개의 함수를 연속적으로 실행하는 파이프 라인을 만들어 줍니다. - **Chat GPT 검색결과**

applyFilters는 배열에 여러 개의 filter 함수를 적용할 수 있습니다. 첫 번째 인자인 items은 필터링할 대상 배열이고, 두 번째 인자인 filterFunctions는 필터링할 함수 배열입니다.

```tsx
// 조금 더 이해하기 쉽게 return을 명시, 프로젝트에서는 arrow function으로 사용했습니다.
const applyFilters = <T>(items: T[], filterFunctions: FilterFunction<T>[]): T[] => {
  return filterFunctions.reduce((filteredItems, filterFn) => {
    return filteredItems.filter(filterFn)
  }, items)

const filteredRouterInfoList = applyFilters(routerInfoList, [withPrivate, withLayoutHeader])
```

함수 내부에서는 **`filterFunctions`** 배열을 **`reduce`** 함수를 사용하여 순회하면서 **`filteredItems`** 배열에 필터링 함수를 적용한 결과를 누적합니다. **`filterFn`** 함수를 **`filteredItems`** 배열에 순차적으로 적용하면서 필터링된 새로운 배열을 반환합니다. 이렇게 **`filteredItems`** 배열을 계속해서 누적하여 최종 필터링된 배열을 반환합니다.

앞서 `RouteInfo인터페이스`로 이루어진 배열 `routerInfoList`을 만들었습니다. 해당 배열에 `applyFilters`를 적용하여 반복되는 filter 함수를 줄이고 어떤 필터링이 적용되었는지 직관적으로 알아볼 있게 됐습니다.

**예시**

```tsx
const routesWithHeaderPrivate = applyFilters(routerInfoList, [withPrivate, withLayoutHeader])

const routesWithFullPagePrivate = applyFilters(routerInfoList, [withPrivate, withLayoutFullPage])

const routesWithHeaderPublic = applyFilters(routerInfoList, [withPublic, withLayoutHeader])

const routesWithFullPagePublic = applyFilters(routerInfoList, [withPublic, withLayoutFullPage])

export const gnbLinks = (isLogin: boolean) =>
  isLogin
    ? applyFilters(routerInfoList, [withInGnb, withPrivate])
    : applyFilters(routerInfoList, [withInGnb, withPublic])

export const privateRoutesWithHeader = routesWithHeaderPrivate.map(({ path, element }) => ({
  path,
  element: <PrivateRouter Component={element} />,
}))

export const publicRoutesWithHeader = routesWithHeaderPublic.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRouter Component={element} restricted={restricted} />,
}))

export const publicRoutesWithFullPage = routesWithFullPagePublic.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRouter Component={element} restricted={restricted} />,
}))
```

**장점**

라우팅 관련 코드가 한 곳에 집중되어 있으므로 라우팅과 관련된 기능을 변경해야 할 경우 코드를 쉽게 찾고 수정할 수 있습니다. 이는 이 코드의 높은 응집도를 나타내며 코드를 더 쉽게 유지 보수할 수 있습니다.

필터링 함수는 인증이 필요한지 여부나 헤더가 있는지 등의 기준에 따라 하위 집합 라우터를 쉽게 검색할 수 있습니다.

**단점**

관리해야 할 페이지가 많아지면 과연 좋은 방법이라고 할 수 있을까?

네스팅과 관련된 부분은 고려해 보지 않았는데 어떻게 할 수 있을까?

## 6. 마무리

> Q. “프로젝트 중간에 라우팅과 관련된 작업을 리팩토링하는게 맞을까?”

마감 기간이 여유롭고 학습 위주로 진행한 프로젝트여서 더 나은 코드를 고민하는 시간을 갖을 수 있었습니다. 하지만 마감 기간이 촉박했다면 가능했을까하는 의문이 들었습니다.

애초에 조금 더 고민하고 설계했다면, 혹은 페이지가 많을 걸 알고 있었으니까 관련 기술을 찾아봤다면 리팩토링에 노력을 덜 들일 수 있지 않았을까요.

해당 경험을 통해 앞으로 라우팅과 관련된 기능에 이전과 같은 실수는 하지 않을 수 있습니다. 하지만 “개발”이라는 큰 범주로 넓혔을 때도 비슷한 실수를 하지 않도록 `시작하기 전에 분석하고 설계하는 과정을 더 체계적으로 할 필요성`을 느꼈습니다.

# 참고자료

[https://github.com/yulpumta-clone-team/Co-nect/wiki/useRoutes로-라우팅-관리하기](https://github.com/yulpumta-clone-team/Co-nect/wiki/useRoutes%EB%A1%9C-%EB%9D%BC%EC%9A%B0%ED%8C%85-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0) : 기존에 작성한 위키

[https://kimchanjung.github.io/programming/2020/06/22/react-router-overlab-routing/](https://kimchanjung.github.io/programming/2020/06/22/react-router-overlab-routing/)

[https://ui.dev/react-router-route-config](https://ui.dev/react-router-route-config)

[https://github.com/remix-run/react-router/discussions/9848](https://github.com/remix-run/react-router/discussions/9848)

[https://reactrouter.com/en/main/routers/router-provider](https://reactrouter.com/en/main/routers/router-provider)
