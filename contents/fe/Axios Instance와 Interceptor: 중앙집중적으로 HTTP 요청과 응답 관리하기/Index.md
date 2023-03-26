---
date: '2023-03-26'
title: 'Axios Instance와 Interceptor: HTTP 요청과 응답 관리하기'
categories: ['WEB', 'Axios', 'API', '관심사 분리']
summary: 'Axios의 Instance와 Interceptor를 활용하여 기본 설정과 공통 처리 로직을 중앙집중적으로 관리하여 중복 코드를 줄일 수 있었습니다. 또한, 필요한 경우 Instance와 Interceptor를 통해 요청마다 다른 설정과 로직을 유연하게 정의할 수 있었습니다.'
thumbnail: './overview-axios.png'
---

## 요약

Axios의 Instance와 Interceptor를 활용하여 기본 설정과 공통 처리 로직을 중앙집중적으로 관리하여 중복 코드를 줄일 수 있었습니다. 또한, 필요한 경우 Instance와 Interceptor를 통해 요청마다 다른 설정이나 처리 로직을 유연하게 추가로 정의할 수 있었습니다.

## 0. Axios

> Axios란? 브라우저와 node.js에서 사용할 수 있는 [Promise](https://javascript.info/promise-basics) 기반 HTTP 클라이언트 라이브러리 - [Axios](https://axios-http.com/kr/docs/intro)

Axios는 웹 응용 프로그램에서 HTTP 요청을 만드는 데 널리 사용되는 Javascript 라이브러리입니다.

웹 프론트엔드에서 HTTP 요청을 하기 위해 Javascript 내장 모듈인 [Fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)를 사용할 수 있지만 저는 HTTP 요청을 효율적으로 관리할 수 있도록 하는 Axios의 기능들이 매력적으로 느껴져 Axios를 [프로젝트](https://github.com/yulpumta-clone-team/Co-nect)에 활용해봤습니다.

Axios의 핵심 기능이라고 생각하는 Instance와 Interceptor를 활용해서 중앙집중적으로 HTTP 요청과 응답을 관리한 방법에 대해 정리해봤습니다.

### 0.1 기본적인 Axios 사용 방법

React 컴포넌트에서 아래와 같은 구조로 API를 요청할 수 있습니다.

```tsx
const Component = () => {
  // API 요청
  return <View />
}
```

API 요청이 필요할 때마다 Axios의 메서드를 활용할 수도 있지만 여러 컴포넌트에서 비슷한 구조의 로직이 반복되고, 해당 요청을 파악하기 위해 url 변수와 method 변수를 면밀히 살펴봐야 합니다.

**반복되는 코드**

```tsx
const Component = () => {
  // API 요청
  axios({
    headers, // 다른 요청에서 같은 코드가 반복
    method,
    url, // 다른 요청에서 같은 코드가 반복
    data,
  })

  return <View />
}
```

**url을 읽어야 어떤 요청인지 파악 가능**

```tsx
axios.post('/v0/api/auth/login',body) // auth 관련 요청
...
axios.get('/v0/api/user/:id') // 유정 정보 요청
...
axios.pacth('/v0/api/team/:id', body) // 팀 정보 수정 요청
```

## 1. Instance

Axios의 Instance를 활용하면 API 요청에서 반복되는 구조를 줄이고 함수명을 통해 어떤 요청인지 직관적으로 파악할 수 있습니다.

### 1.1 기본 사용법

Instance의 핵심 개념은 기본 URL, 헤더, 시간 초과 및 기타 기본 매개 변수와 같은 `미리 구성된 설정으로 인스턴스를 생성`할 수 있다는 점입니다. 더 이상 API 요청을 만들 때마다 반복되는 설정을 지정할 필요가 없으므로 시간을 절약하고 코드를 효율적으로 작성할 수 있습니다.

```tsx
// axios 인스턴스를 만들 때 구성 기본 값 설정
const instance = axios.create({
  baseURL: 'https://api.example.com',
})

// 인스턴스가 생성된 후 기본값 변경
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

> 출처: [https://yamoo9.github.io/axios/guide/config-defaults.html#사용자-정의-인스턴스-기본-설정](https://yamoo9.github.io/axios/guide/config-defaults.html#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95)

### 1.2 인증/인가가 필요한 API 구분하기

대부분의 서비스에는 인증/인가가 필요한 API 요청이 존재합니다.

인증/인가를 위해 API 요청마다 headers에 조작이 필요한 Instance(private Instance)와 필요하지 않은 Instance(publicI Instance)를 구분하여 사용할 수 있습니다.

아래 예시처럼 인증/인가가 필요한 instance의 경우 뒤에서 설명할 interceptor를 활용해 요청을 보내기 전 header를 조작할 수 있습니다.

```tsx
// 필요에 따라 수정하기
type CustomResponseFormat<T = any> = T

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>
  }
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>
}

const privateApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
})

// setAccessTokenInRequestConfig: 요청을 보내기 전에 header에 token을 넣어주는 함수
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const newConfig = setAccessTokenInRequestConfig(config)
  return newConfig
}

privateApi.interceptors.request.use(onRequest, onRequestError)

export default privateApi
```

> 출처: [https://velog.io/@bang9dev/axios-interceptor-with-ts](https://velog.io/@bang9dev/axios-interceptor-with-ts)

### 1.2 도메인별 API 구분하기

Instance를 도메인 별로 모아두고 사용 가능합니다.

특정 요청을 파악하기 위해 url 변수와 method 변수를 면밀히 살펴볼 필요 없이 함수명을 통해 직관적으로 어떤 요청인지 파악할 수 있습니다.

```tsx
const userApi = {
  getUserList() {
    return publicApi.get<{ users: User[] }>(API.USER.INDEX)
  },
  getUserDetail(id: string) {
    return publicApi.get<{ user: User }>(`${API.USER.INDEX}/${id}`)
  },
  editUserProfile(userInputInfo: UserInputInfo) {
    return privateApi.patch<{ message: string }>(API.USER.ESSENTIAL_INFO, { data: userInputInfo })
  },
}

export default userApi
```

## 2. Interceptor

Axios의 Interceptor는 요청이나 응답이 응용 프로그램에 의해 처리되기 전에 인터셉트하는 데 사용할 수 있는 함수입니다.

Interceptor를 활용하면 요청 또는 응답 데이터를 수정하거나 오류 또는 인증을 처리하는 데 사용할 수 있습니다.

### 2.1 기본 세팅

```tsx
// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    return config
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error)
  },
)

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error)
  },
)
```

> 출처: https://axios-http.com/kr/docs/interceptors

### 2.2 Request Interceptor 활용

Request Interceptor를 활용하여 모든 요청에 사용자 지정 헤더를 추가하거나 인증 토큰을 검증할 수 있습니다.

**사용자 지정 헤더를 추가**

(쿠키를 사용하지 않는 상황에서) 모든 Request마다 Token을 붙혀야 한다면 Axios의 모든 로직에 utils함수를 따로 만들기보다 interceptor를 활용하면 문제를 해결할 수 있습니다.

```tsx
// setAccessTokenInRequestConfig: 요청을 보내기 전에 header에 token을 넣어주는 함수
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const newConfig = setAccessTokenInRequestConfig(config)
  return newConfig
}

privateApi.interceptors.request.use(onRequest, onRequestError)
```

**인증 토큰을 검증**

실제 Api요청을 보내기 전에 Interceptor 부분에서 refresh token의 credentials이 유효한지 확인할 수 있습니다.

```jsx
// verifyRefreshToken: 요청을 보내기 전에 refresh token을 검증하는 함수
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const newConfig = verifyRefreshToken(config)
  return newConfig
}

privateApi.interceptors.request.use(onRequest, onRequestError)
```

### 2.3 Response Interceptor 활용

Response Interceptor를 활용하여 응답 데이터를 수정하거나 오류 또는 인증을 처리하는 데 사용할 수 있습니다.

**Access token 최신화**

Response Interceptor에서 Access Token이 만료됐다는 에러 메세지를 받았을 때 Refresh Token으로 새로운 Access Token을 받는 로직을 실행할 수 있습니다.

```tsx
const onResponseError = () => {
  // accessToken이 만료됐다는 에러라면 refreshToken으로 새로운 accessToken을 받는 로직
  return Promise.reject(error)
}

privateApi.interceptors.response.use(onResponse, onResponseError)
```

**에러 핸들링**

Interceptor 단계에서 Response를 원하는 형태로 수정하여 응답 값을 전달할 수 있습니다. Api가 여러 곳에서 동일한 방식으로 사용되는 경우 반복되는 파싱 로직을 줄일 수 있습니다.

```tsx
const errorHandler = error => {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

    // 서버에서 보낸 custom 에러 메세지가 있을 경우 해당 메세지를 에러 메세지로 전달
    if (서버에서 보낸 custom 에러 메세지가 있는지 검증하는 로직) {
      return Promise.reject(new CustomError(data.message, status, data.code))
    }
    // 서버에서 보낸 custom 에러 메세지가 없을 경우 기본 메세지를 에러 메세지로 전달
    return Promise.reject(new HttpError(response.message, status))
  }
  if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    // Node.js의 http.ClientRequest 인스턴스입니다.
    console.error(error.request)
  } else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    console.error('Error', error.message)
  }

  return Promise.reject(new Error('요청 도중 에러 발생'))
}

privateApi.interceptors.response.use(onResponse, onResponseError)
publicApi.interceptors.response.use(onResponse, onResponseError)
```

**반복되는 로직 줄이기(parsing)**

```jsx
const onResponse = (response: AxiosResponse) => {
  // axios 호출 결과에서 response.data가 아닌 data로 바로 접근할 수 있도록 수정
  const { data, headers } = response
  return { ...data, headers }
}

privateApi.interceptors.response.use(onResponse, onResponseError)
publicApi.interceptors.response.use(onResponse, onResponseError)
```

## 3. 기타

### 3.1 폴더구조

프로젝트에서 사용한 Api 관련 폴더 구조는 아래와 같습니다.

```bash
📦api
 ┣ 📂instance
 ┃ ┣ 📜privateApi.ts
 ┃ ┣ 📜publicApi.ts
 ┃ ┣ 📜requestHandler.ts
 ┃ ┗ 📜responseHandler.ts
 ┣ 📜auth.api.ts
 ┣ 📜comment.api.ts
 ┣ 📜etc.api.ts
 ┣ 📜team.api.ts
 ┗ 📜user.api.ts

```

## 후기

Axios의 Instance와 Interceptor를 활용해 중앙집중적으로 HTTP 요청과 응답을 관리하는 방법을 통해 애플리케이션 전체에서 공통으로 사용되는 인증 정보나 기본 요청 구성 등을 중앙에서 한 번에 설정할 수 있습니다.

해당 기능을 활용해 모든 API 요청에서 기본 설정과 공통 처리 로직이 자동으로 적용되어 중복 코드를 줄일 수 있었습니다. 또한, 필요한 경우 Instance와 Interceptor를 통해 요청마다 다른 설정과 로직을 유연하게 정의할 수 있었습니다.

아직 타입스크립트를 사용하면서 Response 타입과 관련된 제네릭과 추론을 활용하는 부분이 어렵긴 했지만 사용하면서 익혀볼 예정입니다.

## 참고 자료

[https://axios-http.com/kr/](https://axios-http.com/kr/)

[https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors](https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors)

[https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5](https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5)

[https://khaledgarbaya.net/articles/4-ways-to-use-axios-interceptors](https://khaledgarbaya.net/articles/4-ways-to-use-axios-interceptors)

[https://velog.io/@bang9dev/axios-interceptor-with-ts](https://velog.io/@bang9dev/axios-interceptor-with-ts)
