# wanted_pre_onboarding

원티드 프리온보딩 백엔드 코스 4차 선발과제입니다. <br>
과제 내용: https://bow-hair-db3.notion.site/4-82b986ae35454252a3a950f54e57af9b

## 1. 서비스 개요

- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.

## 2. 개요

- 기술 스택
  - Node.js
  - Nest.js
  - TypeScript
  - MySQL
  - TypeORM
  - Jest

### 1. 기능 목록

API Docs
https://documenter.getpostman.com/view/21812980/VUjQoQiK

#### 1. 채용공고 등록

#### 2. 채용공고 수정

#### 3. 채용공고 삭제

#### 4. 채용공고 목록 조회

#### 4-2. 채용공고 검색 기능 (선택사항 구현 완료)

#### 5. 채용공고 상세 조회 (선택사항 구현 완료)

#### 6. 채용공고 지원 (선택사항 구현 완료)

### 2. Unit Test (가산점 요소 작성 완료)

#### 1. postings.service.spec.ts 단위 테스트

#### 2. lists.service.spec.ts 단위 테스트

## 3. 구현

- ERD
![스크린샷 2022-08-13 오전 1 02 51](https://user-images.githubusercontent.com/89785501/184396922-707e9938-b220-43d4-8502-629d45a9bdd2.png)

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

- 채용공고 등록 후 수정할 수 있습니다.
- `PUT /postings/:id`
- 회사 id 이외 모두 수정 가능합니다. Request Body에 회사id가 포함되어 있다면 그 정보만 제외하고 수정됩니다.
- 존재하지 않는 id로 시도하면 HTTP 404 Not Found를 출력합니다.
-
- Request Body

```
{
    "position": "대한민국 주니어 개발자",
    "reward": 1000000
}
```

- Response Body

```
// 성공
{
    "id": 1,
    "position": "대한민국 주니어 개발자",
    "reward": 1000000,
    "content": "수영장에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "skill": "Ruby on Rails"
}
```

```
// 실패
{
    "statusCode": 404,
    "message": "해당 채용공고 id(912)가 없습니다. 다시 한 번 확인해 주세요.",
    "error": "Not Found"
}
```

### 3. 채용공고 삭제

- 채용공고를 삭제할 수 있습니다.
- `DELETE /postings/:id`
- 존재하지 않는 id로 시도하면 HTTP 404 Not Found를 출력합니다.

- Response Body

```
// 성공
{
    "statusCode": 200,
    "message": "채용공고 삭제 성공"
}
```

```
// 삭제
{
    "statusCode": 404,
    "message": "해당 채용공고 id(11)가 없습니다. 다시 한 번 확인해 주세요.",
    "error": "Not Found"
}
```

### 4. 채용공고 목록 조회

- 채용공고 목록을 조회할 수 있습니다.
- `GET /postings`

- Response Body

```
[
    {
        "채용공고_id": 1,
        "회사명": "kakao",
        "국가": "ROK",
        "지역": "seoul",
        "채용포지션": "엠엘옵스 주니어 개발자",
        "채용보상금": 1000000,
        "사용기술": "Python"
    },
    {
        "채용공고_id": 2,
        "회사명": "kakao",
        "국가": "ROK",
        "지역": "seoul",
        "채용포지션": "프론트 주니어 개발자",
        "채용보상금": 1000000,
        "사용기술": "Python"
    },
    ...
]
```

### 4-2. 채용공고 검색 기능 (선택사항)

- 채용공고에서 회사명, 국가, 지역, 채용포지션, 사용기술에 대해 검색할 수 있습니다.
- `GET /postings/explore?search=검색키워드`
- 각 필드에 대해 하나라도 부합한다면 검색결과로 출력합니다.
- 대소문자 구분없이 검색 가능합니다.

- Response Body

`GET /postings/explore?search=python`

```
[
    {
        "채용공고_id": 1,
        "회사명": "kakao",
        "국가": "ROK",
        "지역": "seoul",
        "채용포지션": "엠엘옵스 주니어 개발자",
        "채용보상금": 1000000,
        "사용기술": "Python"
    },
    {
        "채용공고_id": 2,
        "회사명": "kakao",
        "국가": "ROK",
        "지역": "seoul",
        "채용포지션": "프론트 주니어 개발자",
        "채용보상금": 1000000,
        "사용기술": "Python"
    },
    ...
]
```

### 5. 채용공고 상세 조회 (선택사항)

- 채용 상세페이지에서 채용내용과 회사가 올린 다른 채용공고의 id 목록을 볼 수 있습니다.
- `GET /postings/detail/:id`

- Response Body

```
{
    "채용공고_id": 2,
    "회사명": "kakao",
    "국가": "ROK",
    "지역": "seoul",
    "채용포지션": "프론트 주니어 개발자",
    "채용보상금": 1000000,
    "사용기술": "Python",
    "채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "회사가올린다른채용공고": [1, 3, 4, 5]
}
```

### 6. 채용공고 지원 (선택사항)

- 사용자는 채용공고에 지원할 수 있습니다.
- `POST /lists`
- Request Body에는 사용자의 id와 채용공고의 id가 필요합니다.
- 1회만 지원 가능합니다.
- 채용공고 지원 리스트 모델을 따로 만들어서 controller, service, repository를 분리하였습니다.

- Request Body

```
{
    "user": 3,
    "posting": 1
}
```

- Response Body

```
// 성공
{
    "user": 3,
    "posting": 1,
    "id": 8
}
```

```
// 삭제
{
    "statusCode": 403,
    "message": "이미 채용공고에 지원하여 더이상 지원하실 수 없습니다.",
    "error": "Forbidden"
}
```

## 2. Unit Test (가산점 요소 작성 완료)

- 서비스단 테스트 커버리지 100% 완료
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |   44.72 |      100 |   33.33 |   45.78 |                   
 src                     |       0 |      100 |       0 |       0 |                   
 ...            
 src/lists               |   52.17 |      100 |      25 |   55.55 |                   
 ...
  lists.service.ts       |     100 |      100 |     100 |     100 |                   
 ...
 src/postings            |   54.76 |      100 |      45 |   56.16 |                   
 ...
  postings.service.ts    |     100 |      100 |     100 |     100 |                   
 ...
-------------------------|---------|----------|---------|---------|-------------------
- 각각의 repository를 mocking하여 테스트 진행
- API Docs에 작성된 것 모두 테스트 진행 완료

#### 1. postings.service.spec.ts 단위 테스트

- 채용공고 조회
  - 채용공고 목록 조회
  - 채용공고 상세 조회
- 채용공고 작성
  - 채용공고 작성 성공
- 채용공고 수정
  - 채용공고 수정 성공
  - 채용공고 수정 실패
- 채용공고 삭제
  - 채용공고 삭제 성공
  - 채용공고 삭제 실패
- 채용공고 검색
  - 채용공고 검색 성공

#### 2. lists.service.spec.ts 단위 테스트

- 채용공고 지원
  - 채용공고 지원 성공
  - 채용공고 지원 실패
