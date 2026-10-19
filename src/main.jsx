import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/NovaCinematicPolish.css";
import "./styles/NovaStorytellingEnhancements.css";
import "./styles/NovaInnerPageCinematic.css";
import "./styles/NovaFinalStoryPolish.css";
import "./styles/NovaHomeAboutFinal.css";
import "./styles/NovaCinematicFinishing.css";
import "./styles/NovaCinematicNextPass.css";
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

import "./styles/NovaVisibleMotionFinal.css";

// Step 25: ensure the motion stylesheet is loaded after the legacy theme layers.
import "./styles/NovaStep25MotionActivation.css";
import "./styles/NovaStep26TypographyMatch.css";
// Final About-page overrides must be part of the entry stylesheet chain.
import "./styles/NovaStep27CompactAbout.css";

import "./styles/NovaCinematicExperience.css";
import "./pages/AboutHeroCenterFix.css";
import "./pages/AboutHardVisibilityFix.css";
import "./styles/NovaRequestedFeatures.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

import "./pages/AboutNeatLayoutFix.css";

// Targeted polish for About page sections below the hero; hero styling intentionally untouched.
import "./pages/AboutBelowHeroPolish.css";
import "./styles/NovaPremiumStoryMotion.css";

// Site-wide responsive premium motion and interaction polish.
import "./styles/NovaAllPagesPremiumMotion.css";

// Final public-site polish: accessibility, card interactions, forms and mobile behavior.
import "./styles/NovaInternshipFinalPolish.css";
import "./styles/NovaAccessibilityAndFinish.css";
import "./styles/NovaStorytellingChapterUpgrade.css";
import "./styles/NovaPatientFAQ.css";
import "./styles/NovaStep28VisualBalance.css";
