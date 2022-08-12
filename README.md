# wanted_pre_onboarding

---

원티드 프리온보딩 백엔드 코스 4차 선발과제입니다.
과제 내용: https://bow-hair-db3.notion.site/4-82b986ae35454252a3a950f54e57af9b

## 1. 서비스 개요

---

- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.

## 2. 개요

---

### 1. 기능 목록

API Docs
https://documenter.getpostman.com/view/21812980/VUjQoQiK

#### 1. 채용공고 등록

#### 2. 채용공고 수정

#### 3. 채용공고 삭제

#### 4. 채용공고 목록 조회

#### 4-2. 채용공고 검색 기능

#### 5. 채용공고 상세 조회

#### 6. 채용공고 지원

### 2. Unit Test

#### 1. postings.service.spec.ts 단위 테스트

#### 2. lists.service.spec.ts 단위 테스트

## 3. 구현

---

### 1. 채용공고 등록

- 회사가 채용공고를 등록할 수 있습니다.
- `POST /postings`
- 등록 후 채용정보의 목록과 상세페이지를 볼 수 있습니다.

- Request Body

```
{
    "company": 3,
    "position": "카카오톡 주니어 개발자",
    "reward": 1000000,
    "content": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "skill": "Ruby on Rails"
}
```

- Response Body

```
{
  "position": "카카오톡 주니어 개발자",
  "reward": 1000000,
  "content": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "skill": "Ruby on Rails",
  "company": 3,
  "id": 10
}
```

### 2. 채용공고 수정

- 채용공고 등록 후 수정할 수 있습니다. (회사 id 이외 모두 수정 가능합니다.)
- `PUT /postings/:id`
- 존재하지 않는 id로 시도하면 NotFoundException 에러를 출력합니다.
- Request Body

```
{
    "position": "대한민국 주니어 개발자",
    "reward": 1000000
}
```

- Response Body

```
{
    "id": 1,
    "position": "대한민국 주니어 개발자",
    "reward": 1000000,
    "content": "수영장에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "skill": "Ruby on Rails"
}
```

### 3. 채용공고 삭제

- 채용공고를 삭제할 수 있습니다.
