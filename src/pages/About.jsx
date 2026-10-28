import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, HeartHandshake, ShieldCheck, Sparkles, Play, Stethoscope } from 'lucide-react';
import './AboutCinematic.css';
import './AboutContrastFix.css';
import './AboutVisualRework.css';
import './AboutProfessionalColorPass.css';
import './AboutVisibilityFix.css';
import './AboutBelowHeroPolish.css';
import './AboutResponsiveFinal.css';
import observeElementsOnce from '../utils/observeElementsOnce';

const chapters=[
 {n:'01',label:'ARRIVE',title:'A clinic that feels considered.',text:'From the first welcome to the final follow-up, NOVADENT is designed to make modern dental care feel calm, clear and human.',image:'/images/gallery/gallery-01.jpg'},
 {n:'02',label:'UNDERSTAND',title:'Clarity before treatment.',text:'We explain what we see, why it matters and which options may suit you, so every decision starts with understanding.',image:'/images/gallery/gallery-04.jpg'},
 {n:'03',label:'CARE',title:'Precision with a personal touch.',text:'Contemporary equipment, experienced clinicians and thoughtful communication come together around your individual needs.',image:'/images/gallery/gallery-08.jpg'}
];
const values=[
 {icon:HeartHandshake,n:'01',title:'Human first',text:'Your concerns, comfort and goals shape the conversation.'},
 {icon:Sparkles,n:'02',title:'Modern by design',text:'A contemporary clinic experience without making care feel complicated.'},
 {icon:ShieldCheck,n:'03',title:'Clear at every step',text:'Simple explanations and a visible plan from consultation to aftercare.'}
];

export default function About(){
 const videoRef=useRef(null);
 const aboutRef=useRef(null);
 useEffect(()=>{
  const root=aboutRef.current;
  if(!root) return;
  const items=root.querySelectorAll('[data-about-reveal]');
  return observeElementsOnce(items,(item)=>item.classList.add('is-visible'),{threshold:.08,rootMargin:'0px 0px 280px 0px'});
 },[]);
 const [videoPlaying,setVideoPlaying]=useState(false);
 const toggleVideo=()=>{ const v=videoRef.current; if(!v) return; if(v.paused){v.play();setVideoPlaying(true)}else{v.pause();setVideoPlaying(false)} };
 return <main ref={aboutRef} className="novaAbout novaAboutCinematic novaAboutFinal">
<section className="aboutFinalHero">
 <div className="aboutFinalHeroGlow"/><div className="aboutFinalHeroGrid">
  <div className="aboutFinalHeroCopy">
   <span className="aboutEyebrow aboutEyebrowLight"><i/> THE NOVADENT STORY</span>
   <h1>Where modern dentistry<br/><em>meets a calmer experience.</em></h1>
   <p>Designed for people who want excellent dental care, thoughtful guidance and a clinic experience that feels reassuring from the moment they arrive.</p>
   <div className="aboutHeroActions"><Link to="/appointment" className="aboutButton aboutButtonLight">Begin your journey <ArrowUpRight size={17}/></Link><Link to="/doctors" className="aboutTextLink aboutTextLinkLight">Meet the care team <ArrowRight size={16}/></Link></div>
  </div>
  <div className="aboutFinalHeroCollage">
   <div className="aboutCollageMain"><img src="/images/gallery/gallery-01.jpg" alt="Modern NOVADENT treatment room"/></div>
   <div className="aboutCollageSmall one"><img src="/images/doctors/doctor-02.jpg" alt="NOVADENT dental specialist"/></div>
   <div className="aboutCollageSmall two"><img src="/images/gallery/gallery-08.jpg" alt="Dental consultation at NOVADENT"/></div>
   <span className="aboutCollageTag">NOVADENT<br/><b>DENTAL CARE</b></span>
  </div>
 </div>
 <div className="aboutFinalHeroMeta"><span>01 / ABOUT</span><span>MODERN · PERSONAL · CLEAR</span></div>
</section>

<section className="aboutFinalIntro aboutSection" data-about-reveal="left"><div className="aboutContainer"><div className="aboutCinematicHeading"><div><span className="aboutEyebrow"><i/> OUR APPROACH</span><h2>A better dental visit is built from <span>small, thoughtful details.</span></h2></div><p>We believe premium care should not feel intimidating. NOVADENT brings together a calm environment, modern treatment spaces and communication that keeps you informed.</p></div><div className="aboutFinalChapters">{chapters.map((c,i)=><article className="aboutFinalChapter" key={c.n}><div className="aboutFinalChapterImage"><img src={c.image} alt={c.title}/><span>{c.n}</span></div><div><small>{c.label}</small><h3>{c.title}</h3><p>{c.text}</p><div className="aboutChapterLine"><i style={{width:`${40+i*24}%`}}/></div></div></article>)}</div></div></section>

<section className="aboutFinalVideo aboutVideoReworked" data-about-reveal="scale"><div className="aboutVideoBackdrop"><div className="aboutVideoGlow"/></div><div className="aboutContainer"><div className="aboutVideoIntro"><span className="aboutEyebrow aboutEyebrowLight"><i/> THE NOVADENT EXPERIENCE</span><h2>Modern technology.<br/><span>A calmer experience.</span></h2><p>See how thoughtful design and precision care come together.</p></div><div className="aboutFinalVideoGrid"><div className="aboutFinalVideoFrame"><video ref={videoRef} muted loop playsInline preload="metadata" poster="/images/gallery/gallery-07.jpg"><source src="/videos/clinic-hero.mp4.mp4" type="video/mp4"/></video><div className="aboutVideoFrameShade"/><button type="button" className="aboutVideoPlayButton" onClick={toggleVideo} aria-label={videoPlaying ? "Pause clinic video" : "Play clinic video"}>{videoPlaying ? <span style={{fontSize:20}}>Ⅱ</span> : <Play size={26} fill="currentColor"/>}</button><div className="aboutVideoCaption"><span className="aboutVideoLabelIcon"><Play size={13}/></span><span>Inside NOVADENT</span><b>{videoPlaying ? 'Playing film' : 'Play film'}</b></div></div><div className="aboutFinalVideoCopy"><span className="aboutEyebrow aboutEyebrowLight"><i/> INSIDE NOVADENT</span><h2>Technology should make care <em>feel simpler.</em></h2><p>Precision equipment, calm spaces and thoughtful design come together so the clinical experience feels clear, not clinical.</p><div className="aboutVideoFacts"><span><b>01</b> Calm spaces</span><span><b>02</b> Modern precision</span><span><b>03</b> Human guidance</span></div><Link to="/gallery" className="aboutButton aboutButtonOutline">Explore the gallery <ArrowUpRight size={17}/></Link></div></div></div></section>

<section className="aboutValuesCinematic aboutFinalValues" data-about-reveal="right"><div className="aboutContainer"><div className="aboutValuesIntro"><span className="aboutEyebrow aboutEyebrowLight"><i/> OUR PHILOSOPHY</span><h2>Care is more than <span>what happens in the chair.</span></h2><p>It is how we welcome you, explain your options and help you feel confident about the choices ahead.</p></div><div className="aboutValuesCinematicGrid">{values.map(({icon:Icon,n,title,text})=><article className="aboutValueCinematicCard" key={n}><span className="aboutValueNumber">{n}</span><Icon size={26}/><h3>{title}</h3><p>{text}</p><ArrowUpRight size={18}/></article>)}</div></div></section>

<section className="aboutFinalClinic" data-about-reveal="left"><div className="aboutContainer aboutFinalClinicGrid"><div><span className="aboutEyebrow"><i/> THE CLINIC EXPERIENCE</span><h2>From reception to treatment, <span>every space has a purpose.</span></h2><p>Walk into a clinic designed to feel welcoming, organised and focused on your comfort.</p><Link to="/gallery" className="aboutButton aboutButtonDark">See our spaces <ArrowUpRight size={17}/></Link></div><div className="aboutFinalClinicImages"><img className="large" src="/images/gallery/gallery-07.jpg" alt="NOVADENT patient care"/><img className="small" src="/images/gallery/gallery-03.jpg" alt="NOVADENT dental chair"/></div></div></section>

<section className="aboutTeamCinematic aboutFinalTeam" data-about-reveal="right"><div className="aboutContainer"><div className="aboutCinematicHeading light"><div><span className="aboutEyebrow aboutEyebrowLight"><i/> PEOPLE BEHIND THE CARE</span><h2>Meet the team <span>behind your smile.</span></h2></div><Link to="/doctors" className="aboutButton aboutButtonOutline">Meet our doctors <ArrowUpRight size={17}/></Link></div><div className="aboutTeamFilm">{[['Dr. Rohan Mehta','Lead Dental Surgeon','doctor-01.jpg','dr-rohan-mehta'],['Dr. Ananya Sharma','Cosmetic Dental Specialist','doctor-02.jpg','dr-ananya-sharma'],['Dr. Priya Deshmukh','Orthodontic Consultant','doctor-03.jpg','dr-priya-deshmukh']].map(([name,role,image,id],i)=><Link to={`/doctors/${id}`} className="aboutTeamFilmCard" key={id}><img src={`/images/doctors/${image}`} alt={name}/><div><span>0{i+1} / NOVADENT</span><h3>{name}</h3><p>{role}</p></div><ArrowUpRight size={19}/></Link>)}</div></div></section>

<section className="aboutClosing aboutFinalClosing aboutCtaReworked" data-about-reveal="scale"><video className="aboutCtaVideo" autoPlay muted loop playsInline preload="metadata" poster="/images/gallery/gallery-07.jpg"><source src="/videos/novadent-hero.mp4" type="video/mp4"/></video><div className="aboutClosingImage"/><div className="aboutClosingOverlay"/><div className="aboutCtaFrame"><div className="aboutContainer aboutClosingContent"><span className="aboutEyebrow aboutEyebrowLight"><i/> YOUR NEXT CHAPTER</span><h2>Your smile deserves <span>a better story.</span></h2><p>Start with a conversation and let NOVADENT help you discover a clear, comfortable next step.</p><div className="aboutHeroActions"><Link to="/appointment" className="aboutButton aboutButtonLight"><Stethoscope size={17}/> Plan your visit</Link><Link to="/contact" className="aboutTextLink aboutTextLinkLight">Talk to NOVADENT <ArrowRight size={16}/></Link></div></div></div></section>
</main>}
