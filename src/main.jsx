
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Main stylesheet
import "./index.css";

// Cinematic polish and storytelling
import "./styles/NovaCinematicPolish.css";
import "./styles/NovaStorytellingEnhancements.css";
import "./styles/NovaInnerPageCinematic.css";
import "./styles/NovaFinalStoryPolish.css";
import "./styles/NovaHomeAboutFinal.css";
import "./styles/NovaCinematicFinishing.css";
import "./styles/NovaCinematicNextPass.css";

// Step-based enhancements
import "./styles/NovaStep8Polish.css";
import "./styles/NovaStep9BrandAndStory.css";
import "./styles/NovaStep10CinematicRefinement.css";
import "./styles/NovaStep11AboutVideo.css";
import "./styles/NovaStep13VisualHarmony.css";
import "./styles/NovaStep14LocalAssets.css";
import "./styles/NovaStep15Finishing.css";
import "./styles/NovaStep16InteractionPolish.css";
import "./styles/NovaStep17AboutHarmony.css";
import "./styles/NovaStep19ContentBalance.css";
import "./styles/NovaStep22FinalPolish.css";
import "./styles/NovaStep23Consolidated.css";
import "./styles/NovaStep25MotionActivation.css";
import "./styles/NovaStep26TypographyMatch.css";
import "./styles/NovaStep27CompactAbout.css";
import "./styles/NovaStep28VisualBalance.css";

// Cinematic experience and motion
import "./styles/NovaVisibleMotionFinal.css";
import "./styles/NovaCinematicExperience.css";
import "./styles/NovaPremiumStoryMotion.css";
import "./styles/NovaAllPagesPremiumMotion.css";

// About page styling
import "./pages/AboutHeroCenterFix.css";
import "./pages/AboutHardVisibilityFix.css";
import "./pages/AboutNeatLayoutFix.css";
import "./pages/AboutBelowHeroPolish.css";

// Requested features and final polish
import "./styles/NovaRequestedFeatures.css";
import "./styles/NovaInternshipFinalPolish.css";
import "./styles/NovaAccessibilityAndFinish.css";
import "./styles/NovaStorytellingChapterUpgrade.css";
import "./styles/NovaPatientFAQ.css";

import "./styles/NovaTypographyFinal.css";
import "./styles/NovaResponsiveRefinements.css";

// Load the final page-level fixes after the global responsive rules above.
import "./pages/AboutResponsiveFinal.css";
import "./pages/DoctorsResponsiveFinal.css";
import "./pages/TreatmentsResponsiveFinal.css";
import "./styles/NovaSitewideResponsiveFinish.css";
import "./styles/NovaPremiumReferencePass.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
