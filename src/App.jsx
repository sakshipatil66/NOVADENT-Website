import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NovaInnerPageMotion from "./components/NovaInnerPageMotion";

import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Treatments from "./pages/Treatments";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorProfile from "./pages/DoctorProfile";
import VoiceAssistant from "./components/VoiceAssistant";
import RouteExperience from "./components/RouteExperience";
import NotFound from "./pages/NotFound";
import BackToTop from "./components/BackToTop";
import SiteSEO from "./components/SiteSEO";
import "./styles/NovaRequestedFixes.css";
import StoryProgressBar from "./components/StoryProgressBar";

export default function App() {
  return (
    <>
      <SiteSEO />
      <StoryProgressBar />
      <RouteExperience />
      <NovaInnerPageMotion />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorSlug" element={<DoctorProfile />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/admin/appointments" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <VoiceAssistant />
      <BackToTop />
    </>
  );
}
