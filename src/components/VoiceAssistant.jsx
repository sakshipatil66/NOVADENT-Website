import { useEffect, useRef, useState } from "react";
import { Mic, Volume2, VolumeX, X, Sparkles, MessageCircle, RotateCcw, CalendarCheck, Users, Stethoscope } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// NOVA currently uses a local intent/FAQ matcher (no external AI API required).
// Keep answers specific, avoid inventing clinic details, and navigate only on request.
const intents = [
  {
    test: (q) => /\b(sensitive teeth|tooth sensitivity|sensitive tooth|hot and cold|cold drinks|sensitivity)\b/.test(q),
    answer: "Tooth sensitivity can have several causes, such as enamel wear, gum recession or a cavity. Use a soft toothbrush and avoid triggers for now, but arrange a dental check if it persists or is severe. I can't diagnose the cause here.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(wisdom teeth|wisdom tooth|third molar)\b/.test(q),
    answer: "Wisdom teeth are the last molars to come through. They can sometimes cause pain, swelling or become impacted. A dentist can examine the area and advise whether treatment is needed. Seek prompt care for facial swelling, fever, or difficulty opening your mouth.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(child dental|children.?s teeth|children teeth|kids teeth|child teeth|pediatric dentistry|paediatric dentistry|baby teeth)\b/.test(q),
    answer: "For children's dental health, brush twice daily with age-appropriate fluoride toothpaste, supervise brushing, and arrange regular dental visits. A dentist can tailor advice to your child's age and needs.",
    path: "/appointment",
  },
  {
    test: (q) => /\b(tooth extraction|remove a tooth|removing a tooth|pull a tooth|tooth removal|extraction)\b/.test(q),
    answer: "A tooth extraction is recommended only when a dentist determines it is necessary after an examination. Follow the dentist's aftercare instructions; ongoing heavy bleeding, worsening swelling or severe pain needs prompt dental advice.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(after treatment|aftercare|after a filling|after extraction|post treatment|post-treatment|after dental surgery)\b/.test(q),
    answer: "After dental treatment, follow the specific instructions given by your dentist and take medicines only as directed. Contact the clinic if pain or swelling worsens. Severe facial swelling or trouble breathing or swallowing needs urgent medical care.",
    path: "/contact",
  },
  {
    test: (q) => /\b(appointment|book|booking|schedule|reserve)\b/.test(q),
    answer: "You can request an appointment through our Appointment page. Choose the service and preferred date, then submit your details. Would you like me to open the appointment page?",
    path: "/appointment",
  },
  {
    test: (q) => /\b(timing|timings|opening hours|hours|open today|close today|when are you open)\b/.test(q),
    answer: "I don't have verified clinic hours available in my voice FAQ, so I don't want to give you an incorrect time. Please check the Contact page for the latest clinic information.",
    path: "/contact",
  },
  {
    test: (q) => /\b(price|cost|fee|fees|how much|charges|pricing)\b/.test(q),
    answer: "Treatment costs can vary depending on your dental needs. The website doesn't provide a confirmed price for every treatment, so please contact the clinic for an accurate estimate or book a consultation.",
    path: "/contact",
  },
  {
    test: (q) => /\b(pain|toothache|tooth ache|emergency|swelling|bleeding)\b/.test(q),
    answer: "I'm sorry you're dealing with that. I can't diagnose symptoms. Please contact a dentist promptly for advice; if you have severe facial swelling, trouble breathing or swallowing, seek urgent medical care.",
  },
  {
    test: (q) => /\b(braces|aligner|aligners|orthodontic|crooked teeth)\b/.test(q),
    answer: "Braces and clear aligners can help correct tooth alignment, but the right option depends on an examination. Open Treatments to explore services, or book a consultation to discuss what's suitable for you.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(whitening|white teeth|yellow teeth|bleaching)\b/.test(q),
    answer: "Professional teeth whitening may help with some types of tooth discolouration. Suitability and results vary, so a dentist should assess your teeth first. You can explore options on the Treatments page.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(implant|implants|missing tooth|missing teeth)\b/.test(q),
    answer: "Dental implants can be an option for replacing missing teeth, depending on your oral health and bone condition. A dentist needs to assess your case before recommending treatment. See the Treatments page for more information.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(root canal|root-canal|rct|endodontic)\b/.test(q),
    answer: "A root canal treatment is used when the soft tissue inside a tooth (the pulp) becomes inflamed or infected. A dentist removes the affected pulp, cleans and disinfects the inside of the tooth, then seals it. It may help save a natural tooth. Whether you need one depends on an examination and sometimes an X-ray. If you have severe swelling, fever, or trouble swallowing or breathing, seek urgent care. Would you like to explore treatments or request an appointment?",
    path: "/treatments",
  },
  {
    test: (q) => /\b(root canal|root-canal|rct|cavity|filling|cleaning|scaling|gum|denture|crown|bridge)\b/.test(q),
    answer: "NOVADENT's Treatments page is the best place to explore dental service options. The right treatment depends on a dentist's examination, so I can't confirm a diagnosis from a voice question alone.",
    path: "/treatments",
  },
  {
    test: (q) => /\b(doctor|dentist|doctors|team|specialist|who works)\b/.test(q),
    answer: "You can learn about the clinic's dental team on the Doctors page. Would you like me to open it?",
    path: "/doctors",
  },
  {
    test: (q) => /\b(contact|phone|call|whatsapp|email|address|location|where are you)\b/.test(q),
    answer: "The Contact page has the clinic's available contact options and location information. Would you like me to open it?",
    path: "/contact",
  },
  {
    test: (q) => /\b(gallery|photos|pictures|images)\b/.test(q),
    answer: "You can view the website's clinic and treatment photos in the Gallery. Would you like me to open it?",
    path: "/gallery",
  },
  {
    test: (q) => /\b(about|clinic|novadent|your clinic)\b/.test(q),
    answer: "You can read more about NOVADENT and its approach on the About page. Would you like me to open it?",
    path: "/about",
  },
  {
    test: (q) => /\b(thank you|thanks)\b/.test(q),
    answer: "You're welcome! I'm here to help you explore NOVADENT's website.",
  },
  {
    test: (q) => /\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(q),
    answer: "Hello! I'm NOVA, your website assistant. You can ask me about treatments, appointments, the dental team, contact details or teeth whitening.",
  },
];

const normalise = (value) => value.toLowerCase()
  .replace(/दातदुखी|दात दुखणे|दात दुखतो|दात दुखत आहेत|दातात दुखत|दातात कळ/g, " tooth pain ")
  .replace(/हिरड्या सुजल्या|हिरड्यांतून रक्त|हिरड्यांचा त्रास/g, " gum swelling bleeding ")
  .replace(/दात संवेदनशील|थंड गरम लागते|थंड गरम खाल्ल्यावर/g, " tooth sensitivity ")
  .replace(/अक्कलदाढ|अक्कल दाढ/g, " wisdom teeth ")
  .replace(/मुलांचे दात|मुलांच्या दातांची काळजी|बाळाचे दात/g, " children teeth ")
  .replace(/दात काढणे|दात काढायचा/g, " tooth extraction ")
  .replace(/अपॉइंटमेंट|भेटीची वेळ|वेळ ठरव|भेट बुक|बुकिंग कर|नाव नोंदवा/g, " appointment ")
  .replace(/डॉक्टर|डॉक्टर्स|दंतवैद्य/g, " doctor ")
  .replace(/उपचार|ट्रीटमेंट/g, " treatment ")
  .replace(/दात पांढरे|व्हाइटनिंग|दात स्वच्छ करणे/g, " whitening cleaning ")
  .replace(/दात किडणे|किडलेला दात|कॅव्हिटी/g, " cavity ")
  .replace(/ब्रश कसा|दात घासणे|दातांची काळजी/g, " dental care ")
  .replace(/किंमत|खर्च|फी|किती रुपये/g, " cost ")
  .replace(/कुठे आहात|पत्ता|संपर्क/g, " contact ")
  .replace(/धन्यवाद/g, " thank you ")
  .replace(/नमस्कार|नमस्ते/g, " hello ")
  .replace(/[^a-z0-9\u0900-\u097F\s-]/g, " ").replace(/\s+/g, " ").trim();

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("Hi! I'm NOVA. Ask me about treatments, appointments, doctors, teeth whitening or contact information.");
  const [heard, setHeard] = useState("");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [language, setLanguage] = useState("en");
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => () => {
    recognitionRef.current?.stop();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  // The mobile quick bar owns the launcher on small screens so it never floats
  // over page copy or form controls. Keep the desktop launcher unchanged.
  useEffect(() => {
    const openAssistant = () => setOpen(true);
    window.addEventListener("nova:open-assistant", openAssistant);
    return () => window.removeEventListener("nova:open-assistant", openAssistant);
  }, []);

  // Keep the greeting relevant to the page the visitor is currently viewing.
  useEffect(() => {
    if (!open) return;
    const page = location.pathname.toLowerCase();
    if (page.includes("appointment")) {
      setMessage("The appointment page is open. Complete the form to request a visit.");
    } else if (page.includes("doctor")) {
      setMessage("Meet our dental team on this page. You can choose a doctor or ask me about treatments and appointments.");
    } else if (page.includes("treatment")) {
      setMessage("Explore the treatments on this page, or ask NOVA a question about dental care.");
    } else {
      setMessage("Hi! I'm NOVA. Ask me about treatments, appointments, doctors, teeth whitening or contact information.");
    }
  }, [location.pathname, open]);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = (language === "mr" || /[\u0900-\u097F]/.test(text)) ? "mr-IN" : "en-IN";
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const answer = (rawText) => {
    const query = normalise(rawText);
    setHeard(rawText);
    if (!query) {
      const reply = "I didn't catch a question. Please try again, or type your question below.";
      setMessage(reply); speak(reply); setListening(false); return;
    }
    const found = intents.find((item) => item.test(query));
    const marathi = language === "mr" || /[\u0900-\u097F]/.test(rawText);
    const marathiReply = found ? (() => {
      const q = query;
      if (/tooth pain|emergency|swelling|bleeding/.test(q)) return "दातदुखी, सूज किंवा रक्तस्राव असल्यास दंतवैद्यांशी लवकर संपर्क साधा. चेहऱ्यावर तीव्र सूज किंवा श्वास घेण्यास/गिळण्यास त्रास होत असल्यास तातडीची वैद्यकीय मदत घ्या.";
      if (/tooth sensitivity|sensitive teeth/.test(q)) return "गरम-थंड पदार्थांमुळे दात दुखत असतील तर enamel झिजणे, हिरड्या मागे जाणे किंवा cavity यांसारखी कारणे असू शकतात. soft toothbrush वापरा आणि त्रास कायम राहिल्यास दंतवैद्यांकडून तपासणी करून घ्या.";
      if (/wisdom teeth/.test(q)) return "अक्कलदाढ ही मागच्या बाजूची शेवटची दाढ असते. ती अडकणे, वेदना किंवा सूज होऊ शकते. दंतवैद्य तपासून उपचार आवश्यक आहेत का ते सांगू शकतात.";
      if (/children teeth/.test(q)) return "मुलांचे दात दिवसातून दोनदा वयानुसार fluoride toothpaste ने स्वच्छ करा, brushing करताना मदत करा आणि नियमित dental check-up ठेवा.";
      if (/tooth extraction/.test(q)) return "दात काढण्याची गरज आहे का हे तपासणीनंतर दंतवैद्य ठरवतात. उपचारानंतर दिलेल्या सूचनांचे पालन करा. जास्त रक्तस्राव, वाढती सूज किंवा तीव्र वेदना असल्यास त्वरित संपर्क साधा.";
      if (/appointment|book|booking/.test(q)) return "Appointment मागवण्यासाठी Appointment page उघडा, सेवा आणि पसंतीची तारीख निवडा आणि form submit करा.";
      if (/cost|price|fees/.test(q)) return "उपचाराचा खर्च गरजेनुसार बदलतो. अचूक अंदाजासाठी Contact page द्वारे क्लिनिकशी संपर्क साधा.";
      if (/doctor|dentist/.test(q)) return "दंतवैद्यांच्या टीमची माहिती Doctors page वर पाहू शकता.";
      if (/treatment|root canal|braces|whitening|implant|cavity|filling|cleaning/.test(q)) return "उपचारांची माहिती Treatments page वर पाहू शकता. योग्य उपचार ठरवण्यासाठी दंतवैद्यांची तपासणी आवश्यक आहे.";
      if (/contact/.test(q)) return "क्लिनिकचे उपलब्ध संपर्क पर्याय आणि पत्ता Contact page वर पाहू शकता.";
      if (/gum|bleeding/.test(q)) return "हिरड्यांतून रक्त येणे किंवा सूज असल्यास दंतवैद्यांकडून तपासणी करून घ्या. रक्तस्राव जास्त असल्यास किंवा सूज वाढत असल्यास लवकर वैद्यकीय सल्ला घ्या.";
      if (/dental care/.test(q)) return "दिवसातून दोनदा fluoride toothpaste ने दात घासा, दररोज दातांमधील जागा स्वच्छ करा आणि नियमित दंततपासणी करा. तुमच्या गरजेनुसार दंतवैद्य अधिक योग्य सल्ला देऊ शकतात.";
      if (/hello|thank you/.test(q)) return "नमस्कार! मी NOVA आहे. उपचार, appointment, डॉक्टर आणि दातांच्या काळजीबद्दल प्रश्न विचारा.";
      return found.answer;
    })() : "माफ करा, या प्रश्नाचे विश्वसनीय उत्तर माझ्याकडे सध्या नाही. Appointment, treatments, दातदुखी किंवा contact याबद्दल विचारा.";
    const wantsNavigation = /\b(open|go to|take me|show me|navigate to|visit)\b/.test(query) || /उघड|दाखव|जा|पान उघड/.test(rawText);
    let reply;
    if (!found) {
      reply = marathi
        ? "या प्रश्नाचे विश्वसनीय उत्तर माझ्या सध्याच्या FAQ मध्ये सापडले नाही. Appointment, treatments, दातदुखी, braces, whitening, डॉक्टर किंवा संपर्क याबद्दल विचारा."
        : "I didn't find a reliable answer to that question in my current FAQ. Try asking about appointments, treatments, braces, whitening, implants, doctors, contact details or clinic hours. You can also type your question here.";
    } else {
      reply = marathi ? marathiReply : found.answer;
      if (found.path && wantsNavigation) {
        navigate(found.path);
        reply = `${reply.split(" Would you like me to open")[0]} Opening that page now.`;
      }
    }
    setMessage(reply);
    setHistory((items) => [...items, { question: rawText, answer: reply }]);
    speak(reply);
    setListening(false);
  };

  const startListening = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      const reply = "Voice recognition isn't supported in this browser. Please use Google Chrome, or type your question below.";
      setMessage(reply); speak(reply); return;
    }
    try {
      const recognition = new Recognition();
      recognition.lang = language === "mr" ? "mr-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognition.onstart = () => { setListening(true); setMessage(language === "mr" ? "ऐकत आहे… तुमचा प्रश्न मराठीत विचारा." : "Listening now… ask your question in English."); };
      recognition.onresult = (event) => {
        const alternatives = Array.from(event.results[0] || []).map((result) => result.transcript);
        answer(alternatives[0] || "");
      };
      recognition.onerror = (event) => {
        setListening(false);
        const reply = event.error === "not-allowed"
          ? "Microphone permission is blocked. Allow microphone access in your browser settings, or type your question below."
          : "I couldn't hear that clearly. Please try again or type your question below.";
        setMessage(reply);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setListening(false);
      setMessage("I couldn't start the microphone. Please check browser permissions or type your question below.");
    }
  };

  const submitTyped = (event) => {
    event.preventDefault();
    if (!typedQuestion.trim()) return;
    answer(typedQuestion);
    setTypedQuestion("");
  };

  const clearChat = () => {
      const greeting = language === "mr" ? "नमस्कार! मी NOVA आहे. उपचार, appointment, डॉक्टर आणि संपर्काबद्दल प्रश्न विचारा." : "Hi! I'm NOVA. Ask me about treatments, appointments, doctors, teeth whitening or contact information.";
      setHistory([]); setHeard(""); setMessage(greeting); setTypedQuestion("");
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setSpeaking(false);
    };
    const askSuggestion = (q) => { answer(q); };

  return (
    <div className="novaVoiceAssistant">
      {open && <section id="nova-voice-panel" className="novaVoicePanel" aria-label="NOVA voice assistant">
        <div className="novaVoiceHeader">
          <span className="novaVoiceIcon"><Sparkles size={18}/></span>
          <div><strong>NOVA Assistant</strong><small>Dental care, made easier</small></div>
          <button className="novaVoiceUtility" onClick={clearChat} aria-label="Clear chat" title="Clear chat"><RotateCcw size={15}/></button>
          <button onClick={() => { setOpen(false); recognitionRef.current?.stop(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }} aria-label="Close assistant"><X size={18}/></button>
        </div>
        <div className="novaVoiceLanguage" role="group" aria-label="Assistant language">
          <span>{language === "mr" ? "भाषा" : "Language"}</span>
          <button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>English</button>
          <button type="button" className={language === "mr" ? "active" : ""} onClick={() => setLanguage("mr")}>मराठी</button>
        </div>
        {heard && <p className="novaVoiceHeard"><MessageCircle size={14}/> {language === "mr" ? "तुमचा प्रश्न:" : "You asked:"} {heard}</p>}
        <div className="novaVoiceHistory" aria-live="polite">
          {history.length === 0 ? <p className="novaVoiceMessage">{message}</p> : history.map((item, i) => <div className="novaVoiceTurn" key={`${i}-${item.question}`}>
            <p className="novaVoiceUserBubble"><strong>You</strong>{item.question}</p>
            <p className="novaVoiceMessage"><strong>NOVA</strong>{item.answer}</p>
          </div>)}
        </div>
        <div className="novaVoiceSuggestions" aria-label={language === "mr" ? "सुचवलेले प्रश्न" : "Suggested questions"}>
          <button onClick={() => askSuggestion(language === "mr" ? "दातदुखी" : "I have tooth pain")}>{language === "mr" ? "दातदुखी" : "Tooth pain"}</button>
          <button onClick={() => askSuggestion(language === "mr" ? "उपचार आणि braces" : "Tell me about braces")}>{language === "mr" ? "उपचार" : "Braces"}</button>
          <button onClick={() => askSuggestion(language === "mr" ? "अपॉइंटमेंट" : "How do I book an appointment?")}>{language === "mr" ? "अपॉइंटमेंट" : "Appointment"}</button>
        </div>
        <form className="novaVoiceTextForm" onSubmit={submitTyped}>
          <label className="novaVoiceQuestionLabel" htmlFor="nova-question">{language === "mr" ? "प्रश्न" : "Type a question"}</label>
          <input id="nova-question" value={typedQuestion} onChange={(e) => setTypedQuestion(e.target.value)} placeholder={language === "mr" ? "तुमचा प्रश्न लिहा…" : "Type your question…"} />
          <button type="submit" disabled={!typedQuestion.trim()}>{language === "mr" ? "विचारा" : "Ask"}</button>
        </form>
        <div className="novaVoiceQuickLinks">
          <button onClick={() => { navigate("/appointment"); setMessage(language === "mr" ? "अपॉइंटमेंट मागवण्यासाठी form पूर्ण करा." : "The appointment page is open. Complete the form to request a visit."); }}><CalendarCheck size={13}/> {language === "mr" ? "अपॉइंटमेंट" : "Book appointment"}</button>
          <button onClick={() => { navigate("/doctors"); setMessage(language === "mr" ? "येथे दंतवैद्यांच्या टीमची माहिती पाहू शकता." : "Here you can explore the dental team."); }}><Users size={13}/> {language === "mr" ? "डॉक्टर" : "Meet doctors"}</button>
          <button onClick={() => { navigate("/treatments"); setMessage(language === "mr" ? "येथे उपचारांचे पर्याय पाहू शकता." : "Here you can explore treatment options."); }}><Stethoscope size={13}/> {language === "mr" ? "उपचार" : "Treatments"}</button>
        </div>
        <button className={`novaVoiceListen ${listening ? "isListening" : ""}`} onClick={startListening} disabled={listening}><Mic size={18}/>{listening ? (language === "mr" ? "ऐकत आहे…" : "Listening…") : (language === "mr" ? "NOVA शी बोला" : "Talk to NOVA")}</button>
        <div className="novaVoiceAudioControls">
          <button className="novaVoiceSpeak" onClick={() => speak(history.length ? history[history.length - 1].answer : message)}><Volume2 size={15}/> {language === "mr" ? "उत्तर ऐका" : "Read response aloud"}</button>
          <button className="novaVoiceSpeak novaVoiceStop" onClick={() => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setSpeaking(false); }} disabled={!speaking}><VolumeX size={15}/> {language === "mr" ? "आवाज थांबवा" : "Stop audio"}</button>
        </div>
      </section>}
      <button className="novaVoiceLauncher" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="nova-voice-panel" aria-label={open ? "Close voice assistant" : "Open voice assistant"}>{open ? <X size={21}/> : <Sparkles size={18}/>}</button>
    </div>
  );
}
