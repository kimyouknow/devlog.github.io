---
date: '2023-05-07'
title: 'Form 다루기2: 불필요한 렌더링 방지하기'
categories: ['WEB', 'Form', 'DX', '최적화']
summary: 'React에서 폼 상태 관리 및 최적화에 대한 고민을 정리해봤습니다.'
thumbnail: './thumbnail.png'
---

## 요약

[지난 글](https://kimyouknow.github.io/fe/Form%20다루기1:%20폼과%20입력%20컴포넌트%20구조)에서 폼(form)과 컴포넌트를 관리하는 구조에 대한 고민을 정리했습니다. 이번 글에서는 React에서 폼 상태 관리 및 최적화에 대한 고민을 정리해봤습니다.

## 1. 지난 글 요약

지난 글에서 제시한 **폼과 입력 컴포넌트를 관리하는 구조**는 아래와 같습니다.

**상태관리(useForm)**

- initValues를 기반으로 inputs와 errors를 객체 형태로 만들어 useState로 관리
- 입력 컴포넌트마다 상태를 직접 관리할 필요 없이 폼 계층에서 통합에서 관리
- 입력 컴포넌트는 상태(value, error)를 전달 받기

**유효성 검증(service폴더)**

- 각 입력 폼에 대한 검증 로직

**제출하기(submitCallback)**

- submit 이벤트 발생시 실행할 함수

하지만 해당 방법에서 **useForm에서 사용하는 onChange는 얕은 복사를 통해 useState의 객체를 변경합니다. 이로 인해 하나의 Input 컴포넌트에 사용자가 입력값을 입력할 때마다 폼 전체가 다시 렌더링되는 문제가 발생합니다.**

## 2. 문제 원인 파악

React에서 컴포넌트가 다시 렌더링되는 조건 중 하나는 State 값이 변했을 때입니다. useForm을 사용하면 모든 값이 하나의 객체 State로 연결되어 있어, 하나의 입력 값이 변할 때마다 자식 컴포넌트들이 모두 다시 렌더링됩니다.

이는 제가 예상한 렌더링이 아닌 불필요한 렌더링입니다. `의도하지 않은 렌더링은 수정할 필요가 있다고 생각`해 몇 가지 해결 방법을 고민해봤습니다.

## 3. 해결방법

제가 고려해본 방법은 3가지가 있습니다. 프로젝트에 적용하기 전에 각각의 방법에 대한 데모를 만들어 실험해본 결과 React Hook Form을 선택하게 됐습니다. [데모 페이지](https://kimyouknow.github.io/form-opt/) (비제어 컴포넌트에 대한 예시는 없습니다.)

> 모든 예제는 변화를 명시적으로 확인하기 위해 onChange 이벤트를 기준으로 만들었습니다.

1. 비제어 컴포넌트
2. 입력 컴포넌트 별 상태 분리하기(colocation)
3. react-hook-form

### 3-1. 비제어 컴포넌트

첫 번째는 비제어 컴포넌트(Uncontrolled Component)를 활용한 방법입니다. 제어 컴포넌트(Controlled Component)의 경우 사용자가 입력할 때마다 컴포넌트를 다시 렌더링시키지만, 비제어 컴포넌트 사용자가 직접 특정 이벤트(제출)를 발생하기 전까지 값을 동기화하지 않습니다. 사용자의 모든 상호작용(onChange)에 대해 상태를 변경하지 않기 때문에 컴포넌트가 다시 렌더링되지 않습니다.

하지만 사용자가 제출 버튼을 눌렀을 때 뿐만 아니라 `폼과 상호 작용할 때도 사용자에게 피드백(ex: 에러 메세지)을 보여주길 원하기 때문에 비제어 컴포넌트는 적절한 해결 방법이 아니었습니다.`

또한, 비제어 컴포넌트는 입력 값의 상태를 온전히 제어하지 않기 때문에 다른 입력 컴포넌트 및 폼 상태와 상호작용하기 어려웠습니다.

### 3-2. 입력 컴포넌트 별 상태 분리하기(Colocation)

두 번째는 입력 컴포넌트 별 상태를 분리하는 방법입니다. 예시를 먼저 보겠습니다. 편의상 이전 방법을 Slow Form이라고 하고 Colocation를 활용한 방법을 Fast Form이라고 하겠습니다.

**Slow Form**

Slow Form은 React에서 일반적으로 볼 수 있는 부모 컴포넌트에서 모든 상태를 관리하는 접근 방법입니다.

앞서 언급한 문제처럼 하나의 입력 컴포넌트가 변경될 때 폼 전체가 다시 렌더링 됩니다. 일반적으로 큰 문제가 되지 않지만, 렌더링 비용이 큰 컴포넌트가 있다면 추후 예상하지 못한 문제가 발생할 수 있습니다. useCallback, useMemo, React.memo와 같은 메모이제이션 기법으로 최적할 수 있지만 `메모이제이션 자체도 비용`이고 `개발자가 신경써야하는 요소`가 늘어나기 때문에 다른 방법을 고려해봤습니다. (Jotai와 같은 상태관리 라이브러리를 사용하는 것도 좋은 대안이라고 생각합니다!)

**Fast Form**

Fast Form은 Colocation을 적용한 접근 방법입니다.

`Colocation`은 “**코드를 연관된 곳에 가능한 가까이 두어라(Place code as close to where it's relevant as possible)**“라는 개념입니다.

`부모 컴포넌트에서 모든 상태를 관리하지 않고 입력 컴포넌트 자체에서 상태를 관리하도록 합니다.`

특정 입력 컴포넌트의 값이 변하더라도 부모 컴포넌트는 다시 렌더링 되지 않았기 때문에 다른 입력 컴포넌트들 중 어느 것도 다시 렌더링되지 않습니다. 당연히 추가적인 메모이제이션 작업도 필요하지 않습니다.

부모 컴포넌트에서 입력 컴포넌트의 상태를 관리하지 않기 때문에 각각의 입력 컴포넌트의 상태에 접근하기 어려운 점이 있습니다. 이 때, 부모 컴포넌트에서 필요할 때마다 입력 컴포넌트들의 값을 읽을 수 있도록 [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)를 사용했습니다.

```tsx
const Parent = () => {
  const ref = useRef()
  const handleSomething = () => {
    const inputValue = ref.current.getChildCount()
  }

  return <Child ref={ref} />
}

const Child = ({ ref }) => {
  const [count, setCount] = useState(0)

  useImperativeHandle(ref, () => ({
    getChildCount: () => {},
  }))

  return <div onClick={() => setCount(v => +v)}>{count}</div>
}
```

하지만 해당 방법 또한 입력 컴포넌트 상태 변화를 실시간으로 감지하기 어려운 단점이 있습니다. 또한, useImperativeHandle은 컴포넌트가 렌더링 된 시점 이후에 호출되어, 렌더링 이전에 사용하는 Hooks와 사용할 수 없는 문법적인 문제가 있습니다.

그 외에 부모 컴포넌트에서 자식 컴포넌트에 직접 접근하도록 하여 `컴포넌트의 캡슐화를 약하게 하고`, 추가적인 API 코드를 작성하는 과정에서 `복잡성이 증가`하는 등 코드 유지 보수에 단점으로 적용될 만한 요소가 존재한다고 느꼈습니다.

### 3-3. 돌고 돌아 React Hook Form

마지막 방법은 React Hook Form(이하 RHF)을 활용한 방법입니다. RHF는 “사용하기 쉬운 유효성 검사와 함께 성능이 뛰어나고 유연하며 확장 가능한 기능”(출처: [공식문서](https://react-hook-form.com))을 제공하는 라이브러리입니다.

실제로 RHF에서 제공하는 useForm과 다양한 유틸함수를 통해 최적화, 에러 핸들링, props drilling 등의 다양한 문제를 해결할 수 있었습니다.

( 유지보수 측면에서도 최근까지 활발히 개발이 이루어지고 있고, [커뮤니티](https://github.com/orgs/react-hook-form/discussions)도 활성화되어 있어 에러를 해결하는데 도움을 많이 받았습니다. )

**register에 대한 설명**

RHF는 기본적으로 비제어 컴포넌트 방식으로 구현되어 있어 렌더링 이슈를 해결합니다. `register(key: string)` 함수를 활용해 입력 컴포넌트마다 useForm에서 사용할 control을 등록할 수 있습니다.

```tsx
;<TextInput
  id="email"
  label="Email"
  placeholder="Email address *"
  errorMessage={errors.email?.message}
  {...register('email')}
/>

// register의 return 타입
export type UseFormRegisterReturn<TFieldName extends InternalFieldName = InternalFieldName> = {
  onChange: ChangeHandler
  onBlur: ChangeHandler
  ref: RefCallBack
  name: TFieldName
  min?: string | number
  max?: string | number
  maxLength?: number
  minLength?: number
  pattern?: string
  required?: boolean
  disabled?: boolean
}
```

**FormProvider**

[FormProvider](https://react-hook-form.com/api/formprovider/)와 [useFormContext](https://react-hook-form.com/api/useformcontext/)를 활용한 Context를 활용하여 props drilling에 대한 불편함을 덜어주고 Colocation을 가능하게 합니다.

```tsx
// 공식 문서 예시
const Input = ({ control, name }) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  })

  return (
    <TextField
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
    />
  )
}
```

**Controller**

[Controller](https://react-hook-form.com/api/usecontroller/controller/), [useController](https://react-hook-form.com/api/usecontroller/)를 활용하여 비제어 컴포넌트를 제어 컴포넌트로 변환하여 사용가능합니다. 또한, Select, CheckBox와 같은 다양한 입력 컴포넌트에 쉽게 적용할 수 있었습니다.

```tsx
<Controller
  name="options"
  control={control}
  render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
    <SelectInput
      id={name}
      options={options}
      value={value}
      label="Options"
      placeholder="Options *"
      errorMessage={error?.message}
      onBlur={onBlur}
      onChange={onChange}
    />
  )}
/>
```

**Error Validation**

기본적인 pattern 방식 뿐만 아니라 [@hookform/resolvers yup](https://react-hook-form.com/get-started/#SchemaValidation)라이브러리를 활용하여 유효성 검증 로직을 UI와 분리하여 선언할 수 있습니다.

```tsx
export const rhfSchema = yupResolver(
  yup
    .object({
      email: yup
        .string()
        .required('이메일이 입력되지 않았습니다.')
        .matches(emailRegex, '이메일 형식으로 입력해주세요.'),
      password: yup
        .string()
        .required('비밀번호가 입력되지 않았습니다.')
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(20, '비밀번호는 20자 이하이어야 합니다.'),
      options: yup
        .array()
        .of(
          yup.object().shape({
            label: yup.string().required('옵션 레이블이 입력되지 않았습니다.'),
            value: yup.string().required('옵션 값이 입력되지 않았습니다.'),
          }),
        )
        .min(1, '옵션을 최소 한 개 이상 입력해야 합니다.')
        .required('옵션이 입력되지 않았습니다.'),
    })
    .required(),
)

const {
  // ...생략
    formState: { errors },
  } = useForm<MyFormValidateProps>({
  // ...생략
    resolver: rhfSchema,
  })

<TextInput
  id="email"
  label="Email"
  placeholder="Email address *"
  errorMessage={errors.email?.message}
  {...register('email')}
/>
```

## 4. 마무리

React Hook Form이 모든 걸 해결해주진 않지만 제가 고민했던 **폼을 관리하는 구조와 최적화와 관련해서 많은** 부분을 해결할 수 있었습니다.

React Hook Form을 선택하기까지 고민한 과정도 의미가 있었습니다. 의도하지 않은 불필요한 렌더링을 수정하며 계층적인 React 컴포넌트 구조에서 상태 관리 및 렌더링에 대해 다시 한 번 생각해 볼 수 있는 시간이었습니다.

## 참고자료

- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [https://dev.to/spencerpauly/the-1-best-design-pattern-for-managing-forms-in-react-4215](https://dev.to/spencerpauly/the-1-best-design-pattern-for-managing-forms-in-react-4215)
- [https://velog.io/@superlipbalm/improve-the-performance-of-your-react-forms](https://velog.io/@superlipbalm/improve-the-performance-of-your-react-forms)
- [https://react.dev/reference/react/useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
- [https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)
- [https://tech.inflab.com/202207-rallit-form-refactoring/react-hook-form/](https://tech.inflab.com/202207-rallit-form-refactoring/react-hook-form/)
- [https://tech.inflab.com/202207-rallit-form-refactoring/colocation/](https://tech.inflab.com/202207-rallit-form-refactoring/colocation/)
- [https://overreacted.io/writing-resilient-components/](https://overreacted.io/writing-resilient-components/)
