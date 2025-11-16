# 시간탐정 (Time Detective)

## 프로젝트 개요

시간탐정은 사용자가 24시간 중 기록되지 않은 "미지의 시간"을 발견하게 하여 시간 사용 인식을 개선하는 웹 애플리케이션입니다.

### 주요 기능

1. **시간여행 타임라인**: 하루 24시간 동안의 활동을 시간대별로 기록
2. **시간 사용 분석**: 기록된 시간과 미지의 시간을 시각화하여 분석
3. **시간도둑 찾기**: 시간을 낭비하는 행동 패턴을 카드 분류 게임으로 발견
4. **최종 리포트**: 데이터 기반 통찰과 1년 환산 정보 제공

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Zustand** - 상태 관리 (localStorage 자동 저장)
- **Framer Motion** - 애니메이션
- **Recharts** - 차트 시각화
- **@dnd-kit** - 드래그 앤 드롭

## 설치 및 실행

### 필요 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치

\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 `http://localhost:5173`을 열어 확인할 수 있습니다.

### 빌드

\`\`\`bash
npm run build
\`\`\`

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰

\`\`\`bash
npm run preview
\`\`\`

## 프로젝트 구조

\`\`\`
src/
├── components/
│   ├── common/          # 공통 컴포넌트 (Button, Card, MujiIcon, ProgressBar)
│   ├── onboarding/      # 온보딩 화면 (WelcomeScreen)
│   ├── timeline/        # 타임라인 입력 (TimelineInput, TimelineCanvas, TimeInputForm)
│   ├── analysis/        # 분석 결과 (AnalysisResult, PieChart, UnaccountedModal)
│   ├── timethief/       # 시간도둑 게임 (TimeThiefGame, ThiefCard, DropZone)
│   └── report/          # 최종 리포트 (FinalReport, SortableThiefItem)
├── store/               # Zustand 스토어 (appStore.ts)
├── types/               # TypeScript 타입 정의
├── utils/               # 유틸리티 함수 (timeCalculator, constants)
├── App.tsx             # 메인 앱
└── main.tsx            # 엔트리 포인트
\`\`\`

## 화면 구성

1. **온보딩 화면**: 프로그램 소개 및 미션 안내
2. **타임라인 입력**: 어제 하루의 활동을 시간대별로 기록
3. **분석 결과**: 기록된 시간과 미지의 시간을 파이 차트로 시각화
4. **시간도둑 게임**: 드래그 앤 드롭으로 시간 낭비 행동 분류
5. **최종 리포트**: 통찰, 1년 환산 데이터, 감성 메시지 제공

## 디자인 컨셉

- **MUJI 스타일**: 미니멀하고 깔끔한 디자인
- **접근성**: ADHD 학생을 포함한 모든 사용자를 위한 접근성 고려
- **반응형**: 모바일(320px~), 태블릿(768px~), 데스크톱(1024px~) 모두 지원
- **전체 화면**: 불필요한 스크롤 없이 한 화면에 모든 컨텐츠 표시

## 주요 색상 팔레트

- `muji-dark`: #3a3a3a - 주요 텍스트 및 강조
- `muji-mid`: #6b6b6b - 보조 텍스트
- `muji-beige`: #e8e3db - 테두리 및 구분선
- `muji-bg`: #f5f3ef - 배경색

## 주요 기능

### 자동 저장

- Zustand의 persist 미들웨어를 통해 모든 데이터를 localStorage에 자동 저장
- 페이지를 새로고침해도 데이터가 유지됩니다

### 드래그 앤 드롭

- @dnd-kit을 사용한 부드러운 드래그 앤 드롭 인터랙션
- 시간도둑 카드 분류 및 순위 정렬 기능

### 애니메이션

- Framer Motion을 사용한 자연스러운 화면 전환
- 숫자 카운트업, 페이드 인 등 다양한 애니메이션 효과

### 시간 계산

- 24시간 기반 정밀한 시간 계산
- 시간 중복 검증
- 1년 환산 자동 계산

## 라이선스

MIT
