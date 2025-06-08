# React Props의 동작 원리 이해하기

## 1. Props란?

Props는 "Properties"의 줄임말로, React 컴포넌트에서 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터입니다. 마치 HTML 태그의 속성처럼 사용됩니다.

```jsx
// HTML 속성처럼 보이죠?
<input type="text" value="안녕하세요" />

// React 컴포넌트도 비슷합니다
<PrayerForm onSubmit={handleSubmit} />
```

## 2. Props의 기본 원리

### 2.1 단방향 데이터 흐름
React에서 데이터는 항상 위에서 아래로 흐릅니다. 즉, 부모 컴포넌트에서 자식 컴포넌트로만 전달됩니다.

```jsx
// 부모 컴포넌트
function Home() {
  const handlePrayerSubmit = (content: string, isAnonymous: boolean) => {
    // 기도문 처리 로직
  };

  return (
    <PrayerForm onSubmit={handlePrayerSubmit} />
  );
}

// 자식 컴포넌트
function PrayerForm({ onSubmit }) {
  // onSubmit을 props로 받아서 사용
}
```

### 2.2 Props는 읽기 전용
자식 컴포넌트는 받은 props를 수정할 수 없습니다. props는 읽기 전용입니다.

```jsx
// ❌ 잘못된 예시
function PrayerForm({ onSubmit }) {
  onSubmit = () => {}; // 이렇게 수정하면 안 됩니다!
}

// ✅ 올바른 예시
function PrayerForm({ onSubmit }) {
  const handleSubmit = () => {
    onSubmit(content, isAnonymous); // 받은 함수를 호출만 합니다
  };
}
```

## 3. 함수를 Props로 전달하기

### 3.1 함수 전달의 의미
부모 컴포넌트가 자식 컴포넌트에게 함수를 전달한다는 것은 "이 함수를 사용할 수 있어"라고 알려주는 것입니다.

```jsx
// 부모 컴포넌트
function Home() {
  const handlePrayerSubmit = (content, isAnonymous) => {
    console.log('기도문이 제출되었습니다:', content);
  };

  return <PrayerForm onSubmit={handlePrayerSubmit} />;
}

// 자식 컴포넌트
function PrayerForm({ onSubmit }) {
  // onSubmit 함수를 사용할 수 있다는 것을 알게 됨
}
```

### 3.2 함수 호출의 시점
자식 컴포넌트는 이벤트가 발생할 때만 부모의 함수를 호출합니다.

```jsx
function PrayerForm({ onSubmit }) {
  const [content, setContent] = useState('');
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 시점에 부모의 함수를 호출
    onSubmit(content, isAnonymous);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* 폼 내용 */}
    </form>
  );
}
```

## 4. 실제 동작 예시

### 4.1 초기 렌더링
1. 부모 컴포넌트가 렌더링됩니다.
2. 부모는 자식에게 함수를 props로 전달합니다.
3. 자식 컴포넌트가 렌더링됩니다.

```jsx
// 1. 부모 렌더링
function Home() {
  // 2. 함수 정의
  const handlePrayerSubmit = (content, isAnonymous) => {
    // 처리 로직
  };

  // 3. 자식에게 함수 전달
  return <PrayerForm onSubmit={handlePrayerSubmit} />;
}
```

### 4.2 이벤트 발생 시
1. 사용자가 폼을 제출합니다.
2. 자식 컴포넌트의 이벤트 핸들러가 실행됩니다.
3. 자식이 부모의 함수를 호출합니다.
4. 부모의 함수가 실행됩니다.

```jsx
// 자식 컴포넌트
function PrayerForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 부모의 함수 호출
    onSubmit(content, isAnonymous);
  };
}
```

## 5. 주의사항

### 5.1 Props 이름
- Props 이름은 의미있게 지어야 합니다.
- 관례적으로 이벤트 핸들러는 'handle' 또는 'on'으로 시작합니다.

```jsx
// ✅ 좋은 예시
<PrayerForm onSubmit={handleSubmit} />

// ❌ 나쁜 예시
<PrayerForm submit={handleSubmit} />
```

### 5.2 함수 전달 시
- 불필요한 함수 재생성을 피하기 위해 `useCallback`을 사용할 수 있습니다.
- 자식 컴포넌트의 불필요한 리렌더링을 방지할 수 있습니다.

```jsx
const handlePrayerSubmit = useCallback((content, isAnonymous) => {
  // 처리 로직
}, []);
```

## 6. 요약

1. Props는 부모에서 자식으로 데이터를 전달하는 방법입니다.
2. 함수를 props로 전달할 때는 "이 함수를 사용할 수 있어"라고 알려주는 것입니다.
3. 자식 컴포넌트는 이벤트가 발생할 때만 부모의 함수를 호출합니다.
4. 데이터는 항상 위에서 아래로 흐릅니다 (단방향 데이터 흐름).
5. Props는 읽기 전용입니다. 