// src/App.tsx

import { useAppStore } from './store/appStore';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { TimelineInput } from './components/timeline/TimelineInput';
import { AnalysisResult } from './components/analysis/AnalysisResult';
import { TimeThiefGame } from './components/timethief/TimeThiefGame';
import { FinalReport } from './components/report/FinalReport';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);

  return (
    <div className="app">
      {currentStep === 1 && <WelcomeScreen />}
      {currentStep === 2 && <TimelineInput />}
      {currentStep === 3 && <AnalysisResult />}
      {currentStep === 5 && <TimeThiefGame />}
      {currentStep === 6 && <FinalReport />}
    </div>
  );
}

export default App;
