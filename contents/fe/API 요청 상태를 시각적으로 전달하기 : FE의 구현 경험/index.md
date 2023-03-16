---
date: '2023-03-15'
title: 'API 요청 상태를 시각적으로 전달하기 : FE의 구현 경험'
categories: ['WEB', '문제해결', 'UX/UI']
summary: 'FE에서 API 요청을 보낸 뒤 해야할 일이 무엇일까요? API 요청은 비동기적인 요청으로 순서가 보장되어 있지 않기 때문에 얼마나 기다려야하는지 알기 어렵습니다. 이 때, FE에서 응답을 기다리면서 사용자에게 적절한 경험을 보여주다가 응답이 돌아오면 다음 해야할 일을 해야한다고 생각합니다. 해당 기능을 구현하기 위해 React에서 custom hooks와 HOC를 활용해봤습니다.'
thumbnail: './loading.webp'
---

## 요약

FE에서 API 요청을 보낸 뒤 해야할 일이 무엇일까요? API 요청은 비동기적인 요청으로 순서가 보장되어 있지 않기 때문에 얼마나 기다려야하는지 알기 어렵습니다. 이 때, FE에서 응답을 기다리면서 사용자에게 적절한 경험을 보여주다가 응답이 돌아오면 다음 해야할 일을 해야한다고 생각합니다. 해당 기능을 구현하기 위해 React에서 custom hooks와 HOC를 활용해봤습니다.

[프로젝트](https://github.com/yulpumta-clone-team/Co-nect)를 진행하면서 비동기적인 응답 사이에 적절한 사용자 경험을 위해서 `모든 API요청에는 요청 상태에 따른 정보를 UI로 표시 해야한다`고 생각했습니다. 사용자에게 “처리 중”, “로딩 중”, “에러가 발생했습니다”, “다시 요청해주십시오”, 등등 API 요청에 대한 상태를 알려준다면 사용자에게 좋은 경험(UX)를 전달할 수 있지 않을까요? (UX에 대한 FE의 역할에 대한 고민은 [코넥트 위키: UX 개선](https://github.com/yulpumta-clone-team/Co-nect/wiki/UX-개선)를 참고해주세요.)

## 1. HTTP Method의 성격에 따라서 API를 구분해서 생각해보기

API 요청에 대한 상태를 UI로 나타내기 위해 HTTP 메서드의 특징에 따라 API를 구분해봤습니다. 유저가 댓글을 작성(수정, 삭제)하는 과정을 예로 들어보겠습니다.

1. FE: 사용자가 특정 게시글에 접근한다.
2. FE: BE에게 게시글의 댓글 정보를 요청한다. (API 요청)
3. BE: 내부 로직을 거쳐 FE에게 결과를 전달한다.
4. FE: 결과에 따라 적절한 UI(유저 정보)를 사용자에게 표시한다.
5. FE: 사용자가 댓글을 작성(수정, 삭제)한 뒤 제출 버튼을 누른다.
6. FE: 입력정보를 BE에게 전달한다. (API 요청)
7. BE: 내부 로직을 거쳐 FE에게 결과를 전달한다.
8. FE: 결과에 따라 적절한 UI를 사용자에게 표시한다.

위의 흐름을 살펴보면 2번의 API 요청이 발생했지만 FE에서 해야할 일은 다르다는 것을 알 수 있습니다. `1번 ~ 4번의 경우 유저에게 댓글 목록을 보여주기 위한 작업`으로 API 상태가 로딩 혹은 에러일 때 화면에 표시할 댓글 목록 자체가 없습니다. `5번 ~ 8번의 경우` 새로운 댓글을 작성하거나, 특정 댓글의 정보를 수정하는 일이기 때문에 `댓글 목록이 표시되는 UI가 변경될 필요는 없습니다.` 다른 유저가 4번 ~ 8번 작업을 한다고 해도 8번 작업 이후 다시 1번 작업을 실행하여 서버 상태를 반영하면 해결됩니다.

이와 같이 `API 요청에 따라 FE에서 표시할 UI의 성격이 다르다`고 생각했습니다.

FE에서 보낸 요청으로 인해 유저가 보는 전반적인 UI가 변경되어야 하는지 혹은 API 상태만 나타내면 되는지에 따라 구분하고 로직을 구성하기로 했습니다.

### 1-1. GET 요청 : UI에 필요한 데이터를 요청

> `UI가 변한다.` → UI가 변하는 걸로 사용자에게 api상태를 알려준다.

GET 요청의 특징은 `UI에 필요한 데이터를 요청`하는 것이라고 생각합니다. 댓글 목록을 불러오거나 유저정보를 불러오거나 UI에 표시해야할 데이터를 불러오는 작업은 GET요청을 통해 이뤄집니다. FE에서 요청을 보낸 뒤 응답을 받기까지 API 상태는 **<요청 → 로딩 → 성공/에러>** 의 흐름으로 변경됩니다.

로딩 상태일 때는 화면에 표시할 데이터가 없으므로 **스켈레톤 UI**나 **progressive bar**처럼 `데이터가 표시될 자리를 로딩중이라는 상태를 표시`해야합니다. 데이터를 올바른 형태로 응답받았다면 유저에게 보여줄 화면을 표시하면 됩니다.

**로딩 및 성공**

![https://user-images.githubusercontent.com/71386219/211471396-545cad06-b7c8-4944-8d0e-986aeca7b348.gif](https://user-images.githubusercontent.com/71386219/211471396-545cad06-b7c8-4944-8d0e-986aeca7b348.gif)

**에러**

데이터를 올바른 형태로 응답받지 못했거나 응답과정에서 오류가 발생했다면 데이터를 가져오지 못했으므로 성공화면을 보여줄 수 없습니다. 이 때, 유저에게 구체적인 원인(파악하지 못했으면 에러 메시지라도,,)과 해결책을 전달해야 합니다.

![https://user-images.githubusercontent.com/71386219/211471382-c62ea9ce-22a9-4ea1-9300-2d82b6d2ca99.gif](https://user-images.githubusercontent.com/71386219/211471382-c62ea9ce-22a9-4ea1-9300-2d82b6d2ca99.gif)

### 1-2. GET 요청 외에 (PACTH, PUT, DELTE..)

> `전반적인 UI가 변하지 않아도 요청`→ Toast알림이라는 별도의 상태로 api상태를 알려준다.

GET 요청외의 다른 method의 특징은 서버나 데이터베이스의 로직을 요청하는 것이라고 생각합니다. 내 프로필을 수정하거나, 새로운 글을 작성하거나, 내가 쓴 댓글을 삭제하는 등등, 이러한 요청을 보낼 때 `UI에서 표시되는 데이터가 변할 필요는 없습니다`. 대신,유저에게 **Toast알림**이나 작은 **Spinner**로 API상태를 보여주면 됩니다.

추가 / 수정/ 삭제 API가 올바르게 동작해서 성공 메세지를 받았다면 필요에 따라 GET 요청을 다시 수행하여 서버 상태를 반영하도록 하였습니다. (서버 상태와 로컬 상태를 어떤 기준에 따라 구분했는지 궁금하시다면 [상태관리 migration (redux → react context api)](<https://github.com/yulpumta-clone-team/Co-nect/wiki/%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-migration-(redux-%E2%86%92-react-context-api)>) 를 참고해주세요)

**성공 토스트 알람**

![https://user-images.githubusercontent.com/71386219/211471418-9e9e7bba-bcc6-462d-b3a0-1acf4a95e6d7.gif](https://user-images.githubusercontent.com/71386219/211471418-9e9e7bba-bcc6-462d-b3a0-1acf4a95e6d7.gif)

**실패 및 로딩 토스트 알람**

![https://user-images.githubusercontent.com/71386219/211471430-4612894f-f912-4b87-9d3b-453d0a2050f8.gif](https://user-images.githubusercontent.com/71386219/211471430-4612894f-f912-4b87-9d3b-453d0a2050f8.gif)

## 2. 반복되는 코드 줄이기(HOC, hooks)

API 요청 프로젝트 전체에서 반복되는 핵심 로직입니다. FE에서 반복적인 API 요청과 그에 따른 UI 변화를 효과적으로 다루기 위해 custom hooks와 HOC를 활용했습니다. custom hooks와 HOC를 통해 반복되는 로직을 추상화하여 컴포넌트에서 선언적으로 사용할 수 있도록 했습니다.

- **useAxios(custom hooks)**: API 요청 로직을 담당합니다.
- **WithLoading(HOC)**: GET API 요청 상태에 따른 UI 변화를 담당합니다.

### 2-1. useAxios (custom hooks)

useAxios는 axios 인스턴스와 즉시 실행 여부(immediate)에 따라 두 개의 핵심 메서드가 동작하는 hooks입니다.

#### 핵심 메서드

`requestQuery`

요청 상태를 반환하고 상태를 변경하지 않는 메서드입니다. (ex: get과 같은 http method )

immediate가 true일 때, 컴포넌트가 마운트되는 시점에서 axios 인스턴스를 실행하는 함수입니다.

`requestCommand`

상태를 변경하고 상태를 반환하지 않는 메서드입니다. (ex: post, patch, delete과 같은 http method)

immediate가 false일 때, 특정 동작이 실행되는 시점에서 axios 인스턴스를 실행하는 함수입니다.

#### 구체적인 동작

requestQuery과 requestCommand 로직은 동일하지만 `로딩 상태를 알리는 방식 다릅니다.`

- `requestQuery`: API 상태에 따라 isLoading, responseData, error라는 useAxios의 내부 state를 변경합니다. (state는 useAxios가 호출된 컴포넌트에서 사용됩니다.)
- `requestCommand` : 토스트 알람으로 API 상태를 표시합니다. (useAxios의 내부 state를 변경하지 않습니다.)

위의 설명만 봐서는 구체적인 로직을 파악하기 어려울 것 같아 예시를 준비했습니다.

**GET : api/team/:teamId : 팀 게시글에 대한 상세 정보 요청**

```jsx
export default function TeamPost() {
  const { teamId: stringTeamId } = useParams()
  const teamId = Number(stringTeamId)

  const { state, forceRefetch } = useAxios({
    axiosInstance: teamApi.GET_TEAM_DETAIL,
    axiosConfig: { id: teamId },
    responseDataKey: 'targetTeam',
  })
  const { responseData, isLoading, error } = state

  if (isLoading) return <Spinner withLogo isFullPage />

  if (error) {
    return <Callback errorStatus={error.httpStatus} errorMessage={error.message} forceRefetch={forceRefetch} />
  }
  return (
    <S.Container>
      <BackButton />
      <TeamPostView targetTeam={responseData} />
    </S.Container>
  )
}
```

**PATCH: api/team/:teamId 팀 게시글에 대한 정보 수정 요청**

```jsx
export default function EditTeamPostDetail({ targetTeam }) {
  // 생략

  // 수정 요청 api hooks
  const { requestCommand } = useAxios({
    axiosInstance: teamApi.EDIT_TEAM_POST,
    immediate: false,
    axiosConfig: { id: teamId },
  })
  // 생략

  // 수정 요청
  const submitCallback = async submitData => {
    // 생략
    const parsedSubmitData = teamEditRequestParser(submitData)
    await requestCommand({
      newConfig: { data: parsedSubmitData },
      successMessage: API_MESSAGE.SUCCESS_EDIT_TEAM,
    })
  }
  // 생략

  return (
    <EditTeamPostView
      inputValues={inputValues}
      submitCallback={submitCallback}
      // 생략
    />
  )
}
```

<details>

<summary> useAxios 전체 코드</summary>

```jsx
// 생략
const useAxios = ({ axiosInstance, axiosConfig, immediate = true }) => {
  const notifyDispatch = useToastNotificationAction()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    responseData: null,
    error: null,
  })
  const [trigger, setTrigger] = useState(Date.now())
  const [controller, setController] = useState()

  // 생략

  /**
   * Query(조회) : HTTP GET 요청
   * @function
   * @param {Object} newConfig axios instance에 넘겨줄 새로운 axios config
   */
  const requestQuery = async newConfig => {
    dispatch({ type: LOADING_TYPE })
    try {
      const ctrl = new AbortController()
      setController(ctrl)
      const { data: responseData } = await axiosInstance({
        ...axiosConfig,
        ...newConfig,
        signal: ctrl.signal,
      })
      dispatch({ type: SUCCESS_TYPE, responseData })
    } catch (error) {
      console.error(error)
      handleExpiredToken(error.httpStatus)
      dispatch({
        type: ERROR_TYPE,
        error: {
          httpStatus: error.httpStatus,
          message: error.message,
        },
      })
    }
  }

  /**
   * Command(명렁) : HTTP POST, DELETE, PATCH ,etc... 요청
   * @function
   * @param {Object} commandParams command 요청에 필요한 매개변수
   * @param {Object} commandParams.newConfig axios instance에 넘겨줄 새로운 axios config
   * @param {string} commandParams.successMessage 토스트 알림으로 보여줄 성공 메시지(='요청 성공!')
   * @param {number} commandParams.seconds 토스트 알림을 몇초뒤에 표시할지(=1500)
   */
  const requestCommand = async ({ newConfig, successMessage = '요청 성공!', seconds = 1500 }) => {
    let isOverStandard = true
    setTimeout(() => {
      if (isOverStandard) notifyNewMessage(notifyDispatch, API_MESSAGE.LOADING, TOAST_TYPE.Info)
    }, seconds)
    try {
      const ctrl = new AbortController()
      setController(ctrl)
      const response = await axiosInstance({
        ...axiosConfig,
        ...newConfig,
        signal: ctrl.signal,
      })
      // const message = response?.message;
      notifyNewMessage(notifyDispatch, successMessage, TOAST_TYPE.Success)
      return response
    } catch (error) {
      handleExpiredToken(error.httpStatus)
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error)
    } finally {
      isOverStandard = false
    }
    return null
  }

  useEffect(() => {
    if (immediate) {
      requestQuery()
    }
    return () => controller && controller.abort()
  }, [trigger])

  return { state, requestQuery, requestCommand, forceRefetch, resetState }
}

export default useAxios
```

</details>

### 2-2. WithLoading (High order component)

requestCommand는 함수내부에서 토스트 알람으로 UI에 API상태를 보여주지만 requestQuery의 경우 외부에서 API상태에 따라 로딩 UI 및 에러 UI를 처리해야합니다.

GET API 요청이 있는 컴포넌트마다 아래와 같은 삼항연산자 및 if문 처리를 한다면 loading, error, responseData, useEffect등 컴포넌트 로직이 길어졌습니다. `하나의 컴포넌트에 성공, 실패, 로딩이라는 3가지 상태가 섞여 있어 코드를 파악하기 어렵다는 단점이 있었습니다.`

그 외에 api요청에 따른 부가적인 로직(에러핸들러, 요청 헤더 설정 등등)을 처리하다보면 같은 로직을 반복해서 작성해야하는 번거로움이 있습니다.

```jsx
function Component(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  useEffect(()=> {
    fetcher
      .then(response => setData(response))
      .catch(err => setError(err)
      .finally(setLoading(false))
  },[])
  if(err) return <>에러가 발생했습니다!</>
  if(loading) return <>로딩 중입니다..</>
  return <>{data}</>
}

```

위의 문제를 해결하기 위해 `반복되는 로직을 분리하고 컴포넌트를 순수하게 만들어보고자` 했습니다.

GET 요청이 필요한 컴포넌트마다 반복되는 로직을 WithLoading라는 HOC 내부로 옮겼습니다. API상태에 따른 분기처리는 지울 수 없지만 이후 프로젝트에서 사용되는 GET요청이 포함된 컴포넌트는 동일한 구조로 사용할 수 있게 되었습니다.

에러 페이지의 경우, 에러 메시지만 다르고 디자인 동일했기 때문에 외부에서 주입할 필요 없이 WithLoading컴포넌트 내부에서 처리할 수 있었습니다.

```jsx
export default function WithLoading({ Component, responseDataKey, axiosInstance, axiosConfig }) {
  return function Wrapper(props) {
    const { state, forceRefetch } = useAxios({
      axiosInstance,
      axiosConfig,
    });
    const { responseData, isLoading, error } = state;

    if (isLoading) return <Spinner withLogo isFullPage />;

    if (error) {
      return (
        <ErrorCallback
          errorStatus={error.httpStatus}
          errorMessage={error.message}
          forceRefetch={forceRefetch}
        />
      );
    }
    const propsWithResponseData = { ...props, [responseDataKey]: responseData };
    return <Component {...propsWithResponseData} />;
  };
}

// 예시
export default function EditUserProfile() {
  const userInfo = getUserInfo(); // {id, name, profileImg}
  const EditUserProfileDetailWithLoading = WithLoading({
    Component: EditUserProfileDetail, // 데이터가 올바르게 있을 때 렌더링할 컴포넌트
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: userInfo?.id },
  });

  return (
    <S.Container>
      <BackButton />
      <EditUserProfileDetailWithLoading />
      <UpperButton />
    </S.Container>
  );
}

```

### 2-3. HOC와 custom hooks로 API로직을 분리했을 때의 장점

더 이상 `API요청이 있는 컴포넌트마다 직접 API 상태를 관리하거나 복잡한 분기처리를 하지 않게 되었습니다.` useAxios가 컴포넌트 내부에 있다면 비동기 요청을 포함한다는 의미이고, WithLoading 네이밍을 통해 해당 컴포넌트가 UI 렌더링에 필요한 API 요청을 포함한다는 사실을 알 수 있습니다.

또한 React 컴포넌트에서 View와 Logic을 분리할 수 있게 되었습니다. 비동기 요청에 대한 처리는 useAxios와 WithLoading에 위임하고 컴포넌트는 비동기 요청이 성공했을 때의 경우만 다룰 수 있었습니다.

## 3. 어려웠던 점

현재 프로젝트에는 복잡한 API 요청이 없었습니다. 비교적 단순한 API(로그인/회원가입, 게시글, 댓글 CRUD)를 처리했지만 React의 hooks만으로 구현하기 어려운 점이 많았습니다.

### 3-1. 적절한 추상화

코드를 쉽게 알아보고 편하게 수정하기 위해 로직을 추상화하고 코드를 선언적으로 작성해야 한다고 생각합니다. 하지만 코드를 작성하다보니 복잡한 로직을 숨기기에 바쁘지 않았나 싶습니다.

> 클린 코드는 짧은 코드가 아닌 읽기 좋은(찾고 싶은 로직을 빠르게 찾을 수 있는) 코드입니다. 출처: [토스ㅣSLASH 21 - 실무에서 바로 쓰는 Frontend Clean Code](https://youtu.be/edWbHp_k_9Y)

클린 코드는 custom hooks로 로직을 묶어서 숨기는 것이 아닙니다. 해당 컴포넌트가 어떻게 동작하는지 알 필요가 없는 부분(절차)만 숨겨야 합니다. custom hooks가 사용되는 예시만 보고도 동작을 유추할 수 있을까요? useAxios라는 hooks를 사용한 예시를 다시 가져와보겠습니다.

```jsx
// useAxios: 컴포넌트에서 사용할 API 동작을 관리
const { requestCommand } = useAxios({
  axiosInstance: teamApi.EDIT_TEAM_POST, // API 동작에 필요한 axios instance
  immediate: false, // API가 컴포넌트가 mount되는 시점에 호출되는지 여부
  axiosConfig: { id: teamId }, // axios instance에 사용할 config
})

const useAxios = () => {
  // 생략
  /**
   * Command(명렁) : HTTP POST, DELETE, PATCH ,etc... 요청
   * @function
   * @param {Object} commandParams command 요청에 필요한 매개변수
   * @param {Object} commandParams.newConfig axios instance에 넘겨줄 새로운 axios config
   * @param {string} commandParams.successMessage 토스트 알림으로 보여줄 성공 메시지(='요청 성공!')
   * @param {number} commandParams.seconds 토스트 알림을 몇초뒤에 표시할지(=1500)
   */
  const requestCommand = async ({ newConfig, successMessage = '요청 성공!', seconds = 1500 }) => {}
  // 생략
}
```

위와 같이 parameter를 통해 메서드의 의도와 구체적인 로직을 제어할 수 있도록 구현해봤습니다.

### 3-2. 로딩 처리

requestCommand의 경우 “처리중”이라는 메시지를 보여줄 타이밍을 제어하기 어려웠습니다. requestCommand 함수가 호출되자마자 “처리중”메시지를 보여준다면 곧바로 오는 API 응답과 거의 동시에 보여 어색했습니다.

![처리중동시](https://user-images.githubusercontent.com/71386219/225524263-02e0d962-f73e-4dc0-8f0e-b1a98149bcef.gif)

이를 해결하기 위해 flag변수와 setTimeout을 활용했습니다.

- isOverStandard라는 변수를 true로 선언
- 설정한 시간이 지났다면 setTimout의 callback함수를 실행
- api요청(성공이든 실패든)이 끝난 뒤 finally에서 isOverStandard를 false로 변경
- setTimeout에서 설정한 시간이 지났는데 api요청이 오지 않았다면 isOverStandard는 여전히 true

```jsx
/**
 * Command(명렁) : HTTP POST, DELETE, PATCH ,etc... 요청
 * @function
 * @param {Object} commandParams command 요청에 필요한 매개변수
 * @param {Object} commandParams.newConfig axios instance에 넘겨줄 새로운 axios config
 * @param {string} commandParams.successMessage 토스트 알림으로 보여줄 성공 메시지(='요청 성공!')
 * @param {number} commandParams.seconds 토스트 알림을 몇초뒤에 표시할지(=1500)
 */
const requestCommand = async ({ newConfig, successMessage = '요청 성공!', seconds = 1500 }) => {
  let isOverStandard = true
  setTimeout(() => {
    if (isOverStandard) notifyNewMessage(notifyDispatch, API_MESSAGE.LOADING, TOAST_TYPE.Info)
  }, seconds)
  try {
    // 생략
  } catch (error) {
    // 생략
  } finally {
    isOverStandard = false
  }
  // 생략
}
```

![처리중표시](https://user-images.githubusercontent.com/71386219/225524252-9a623c47-f6b6-40fa-8f67-8e975ea5eab4.gif)

### 3-3. memory leek과 요청 취소

컴포넌트에서 API를 호출 한 뒤, 그 사이에 컴포넌트가 unmont되었을 때 react는 아래와 같은 경고문을 보여줬습니다.

> Warning: Can't perform a React state update on an unmounted component.
> This is a no-op, but it indicates a memory leak in your application.
> To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup

컴포넌트가 unmount되었음에도 API호출에 대한 응답이 이루어졌고, 해당 컴포넌트의 상태(변수)가 변경됐기 때문에 발생한 문제였습니다. 이를 해결하기 위해 컴포넌트가 unmount가 되었음에도 API호출이 응답을 받지 못했다면 API호출을 취소해야 했습니다.

이를 해결하기 위해 useEffect의 [cleanup](https://ko.reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect)과 [Abortcontroller](https://axios-http.com/docs/cancellation)를 활용했습니다. useEffect의 cleanup함수 안에 Abortcontroller를 활용해서 API 요청을 취소하는 로직을 추가했습니다.

```jsx
const [controller, setController] = useState();

const requestQuery = () => { // requestCommand도 같은 로직을 사용했습니다.
  try {
      const ctrl = new AbortController();
      setController(ctrl);
      const response = await axiosInstance({
        ...axiosConfig,
        ...newConfig,
        signal: ctrl.signal,
      });
      // 생략
    }
  // 생략
}

useEffect(() => {
  if (immediate) {
    requestQuery();
  }
  return () => controller && controller.abort();
}, [trigger]);
```

## 4. 마무리

간단한 CRUD를 위한 API 요청에도 고려할 사항이 많고 해결해야할 문제도 많았습니다.

아쉽게도 위와 같은 WithLoading과 useAxios에서 고민한 코드는 react-query와 react18버전의 suspense와 error-boundary를 통해 쉽게 해결할 수 있었습니다. 그럼에도 custom hooks와 HOC를 직접 구현하면서 React의 hooks와 함수형 컴포넌트의 렌더링 로직에 대해 더욱 깊게 이해할 수 있는 좋은 경험이 었습니다.

## 참고자료

- [https://youtu.be/edWbHp_k_9Y](https://youtu.be/edWbHp_k_9Y)
