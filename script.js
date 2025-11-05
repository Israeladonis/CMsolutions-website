// --------------------
// AI Chat Elements
// --------------------
const aiButton = document.getElementById('aiButton');
const aiChat = document.getElementById('aiChat');
const closeChat = document.getElementById('closeChat');
const langToggle = document.getElementById('langToggle');
const chatTitle = document.getElementById('chatTitle');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

let lang = 'es'; // default language

// --------------------
// Open / Close Chat
// --------------------
aiButton.addEventListener('click', () => {
    aiChat.style.display = 'flex';
});

closeChat.addEventListener('click', () => {
    aiChat.style.display = 'none';
});

// --------------------
// Toggle Language
// --------------------
langToggle.addEventListener('click', () => {
    if(lang === 'es') {
        lang = 'en';
        chatTitle.textContent = 'AI Help';
        chatBody.textContent = 'Hello! I am your AI assistant. How can I help you today?';
        langToggle.textContent = 'ES';
        aiButton.textContent = '🤖 AI Help';
    } else {
        lang = 'es';
        chatTitle.textContent = 'Ayuda AI';
        chatBody.textContent = '¡Hola! Soy tu asistente AI. ¿En qué puedo ayudarte hoy?';
        langToggle.textContent = 'EN';
        aiButton.textContent = '🤖 Ayuda AI';
    }
});

// --------------------
// FAQ Data
// --------------------
const faq = {
    // Spanish questions
    "como puedo traducir mis documentos": "Ofrecemos traducciones certificadas de actas, documentos legales y académicos.",
    "pueden ayudarme con mis impuestos": "Sí, podemos ayudar con impuestos personales y de negocio de forma clara y accesible.",
    "como solicito una visa o tarjeta de residencia": "Te guiamos paso a paso con formularios y renovaciones migratorias.",
    "pueden ayudarme con divorcios": "Sí, ofrecemos asistencia con divorcios simples y económicos.",
    "quienes son": "CM Solutions es un servicio dedicado a apoyar a inmigrantes y familias nuevas en EE. UU., con respeto y claridad en cada paso.",
    "como los contacto": "Puedes enviarnos WhatsApp, llamar al 555-555-5555, o escribirnos a cmsolutions@people.com.",

    // English questions
    "how can i translate my documents": "We provide certified translations of certificates, legal, and academic documents.",
    "can you help me with my taxes": "Yes, we can help with personal and business taxes in a clear and accessible way.",
    "how do i apply for a visa or green card": "We guide you step by step with forms and immigration renewals.",
    "can you help me with divorces": "Yes, we provide assistance with simple and affordable divorces.",
    "who are you": "CM Solutions is a service dedicated to supporting immigrants and new families in the U.S., with respect and clarity at every step.",
    "how can i contact you": "You can reach us via WhatsApp, call 555-555-5555, or email cmsolutions@people.com."
};

// --------------------
// Normalize Input Function
// --------------------
function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")                   // separate accents
        .replace(/[\u0300-\u036f]/g, "")   // remove accents
        .replace(/[?¿!.,]/g,"")            // remove punctuation
        .trim();
}

// --------------------
// Handle User Input
// --------------------
chatInput.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        const question = normalize(chatInput.value);

        // Select answer based on language
        let answer = faq[question];
        if(!answer) {
            answer = lang === 'es'
                ? "Lo siento, no entendí tu pregunta. Por favor intenta con otra consulta."
                : "Sorry, I didn't understand your question. Please try another one.";
        }

        // Display user message
        const userMessage = document.createElement('div');
        userMessage.textContent = "🧑 " + chatInput.value;
        userMessage.style.textAlign = "right";
        userMessage.style.margin = "5px 0";
        chatBody.appendChild(userMessage);

        // Display AI response
        const aiMessage = document.createElement('div');
        aiMessage.textContent = "🤖 " + answer;
        aiMessage.style.textAlign = "left";
        aiMessage.style.margin = "5px 0";
        chatBody.appendChild(aiMessage);

        // Clear input
        chatInput.value = "";

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});