// src/App.tsx

import { useAppStore } from './store/appStore';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { TimelineInput } from './components/timeline/TimelineInput';
import { AnalysisResult } from './components/analysis/AnalysisResult';
import { TimeThiefGame } from './components/timethief/TimeThiefGame';
import { TimeThiefRanking } from './components/timethief/TimeThiefRanking';
import { YearlyCalculation } from './components/report/YearlyCalculation';
import { FinalReflection } from './components/report/FinalReflection';
import { FullscreenButton } from './components/common/FullscreenButton';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);

  return (
    <div className="app">
      <FullscreenButton />
      {currentStep === 1 && <WelcomeScreen />}
      {currentStep === 2 && <TimelineInput />}
      {currentStep === 3 && <AnalysisResult />}
      {currentStep === 4 && <TimeThiefGame />}
      {currentStep === 5 && <TimeThiefRanking />}
      {currentStep === 6 && <YearlyCalculation />}
      {currentStep === 7 && <FinalReflection />}
    </div>
  );
}

export default App;
