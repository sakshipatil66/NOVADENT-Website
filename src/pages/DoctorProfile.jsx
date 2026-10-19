import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, Stethoscope } from "lucide-react";

const team = [
  { name: "Dr. Rohan Mehta", role: "Lead Dental Surgeon", qualification: "Advanced Dental Care", experience: "12+ Years", image: "doctor-01.jpg", description: "Focused on comprehensive dental care, patient comfort, and personalised treatment planning.", specialties: ["General Dentistry", "Smile Care"] },
  { name: "Dr. Ananya Sharma", role: "Cosmetic Dental Specialist", qualification: "Cosmetic & Smile Dentistry", experience: "10+ Years", image: "doctor-02.jpg", description: "Dedicated to creating confident smiles through thoughtful cosmetic dentistry and individual care.", specialties: ["Smile Design", "Cosmetic Dentistry"] },
  { name: "Dr. Priya Deshmukh", role: "Orthodontic Consultant", qualification: "Orthodontic Care", experience: "Experienced Specialist", image: "doctor-03.jpg", description: "Helps patients explore personalised options for tooth alignment and a healthier-looking smile.", specialties: ["Braces", "Tooth Alignment"] },
  { name: "Dr. Arjun Kulkarni", role: "Implant & Oral Care Specialist", qualification: "Dental Implant Care", experience: "Experienced Specialist", image: "doctor-04.jpg", description: "Supports patients through carefully planned restorative and implant-related dental treatments.", specialties: ["Dental Implants", "Restorative Care"] },
  { name: "Dr. Neha Patil", role: "Periodontic Specialist", qualification: "Gum Health & Care", experience: "Experienced Specialist", image: "doctor-05.jpg", description: "Emphasises gum health, preventive care, and treatment plans tailored to individual needs.", specialties: ["Gum Care", "Preventive Dentistry"] },
  { name: "Dr. Aditya Joshi", role: "Endodontic Specialist", qualification: "Root Canal Care", experience: "Experienced Specialist", image: "doctor-06.jpg", description: "Provides focused dental care for preserving natural teeth and supporting long-term oral health.", specialties: ["Root Canal Care", "Tooth Preservation"] },
];

export default function DoctorProfile() {
  const { doctorSlug } = useParams();
  const doctor = team.find((item) => item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === doctorSlug);
  if (!doctor) return <main className="doctorProfilePage"><h1>Doctor profile not found</h1><Link to="/doctors">Back to our doctors</Link></main>;
  return (
    <main className="doctorProfilePage">
      <div className="doctorProfileContainer">
        <Link to="/doctors" className="doctorProfileBack"><ArrowLeft size={17}/> All Doctors</Link>
        <section className="doctorProfileHero">
          <div className="doctorProfilePhoto"><img src={`${import.meta.env.BASE_URL}images/doctors/${doctor.image}`} alt={doctor.name}/></div>
          <div className="doctorProfileContent">
            <span className="doctorProfileEyebrow"><Stethoscope size={16}/> NOVADENT DENTAL TEAM</span>
            <h1>{doctor.name}</h1>
            <h2>{doctor.role}</h2>
            <p>{doctor.description}</p>
            <div className="doctorProfileFacts"><span><CheckCircle2 size={16}/>{doctor.qualification}</span><span><CheckCircle2 size={16}/>{doctor.experience}</span></div>
            <div className="doctorProfileTags">{doctor.specialties.map((item)=><span key={item}>{item}</span>)}</div>
            <Link className="doctorProfileBook" to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}><CalendarDays size={18}/> Book with {doctor.name}<span>↗</span></Link>
          </div>
        </section>
        <section className="doctorProfileNote"><span>PERSONALISED CARE</span><h2>A clear plan, built around your smile.</h2><p>Book a consultation to discuss your concerns, explore suitable options and understand the next steps with our dental team.</p><Link to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}>Request an appointment with {doctor.name} ↗</Link></section>
      </div>
    </main>
  );
}
