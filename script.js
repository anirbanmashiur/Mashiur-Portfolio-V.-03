const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const apiBase = document.body && document.body.dataset ? document.body.dataset.apiBase : "";
const apiEndpoint = apiBase ? `${apiBase.replace(/\/$/, "")}/api/chat` : "";

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
}

const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const mediaGrid = document.querySelector("[data-media-grid]");
const mediaStatus = document.getElementById("mediaStatus");
const chipButtons = document.querySelectorAll("[data-prompt]");

const mediaLibrary = [
  { title: "FlowFund Dashboard", type: "image", tags: ["finance", "dashboard", "work", "project"] },
  { title: "CityCare Booking Flow", type: "gif", tags: ["health", "mobile", "process", "project"] },
  { title: "Arcade Commerce Hero", type: "image", tags: ["retail", "web", "branding"] },
  { title: "RoutePilot Map View", type: "video", tags: ["logistics", "maps", "b2b"] },
  { title: "StudyLoop Lessons", type: "gif", tags: ["education", "mobile", "ui"] },
  { title: "Design System Tokens", type: "image", tags: ["system", "ui", "work"] }
];

const responses = [
  {
    match: ["name", "who are you", "where are you from", "about you"],
    reply: "Hi My Name is Mashiur Rahman, I am From Bangladesh",
    actions: [
      { label: "View Projects", href: "projects.html" }
    ],
    tags: ["work", "project"]
  },
  {
    match: ["tell me about yourself", "introduce yourself", "about yourself"],
    reply: "I am a multidisciplinary UI/UX, visual, and product designer with a fine arts background and over five years of experience across branding, digital products, and marketing-driven design. I started with drawing and painting, then moved into digital design and product thinking. Today I build user-centered interfaces, scalable design systems, and visual assets that balance aesthetics, usability, and business goals.",
    tags: ["work"]
  },
  {
    match: ["design background", "your background", "background in design"],
    reply: "My foundation is in Fine Arts, which gave me a strong sense of composition, color, and storytelling. Professionally I have worked in graphic design, branding, UI/UX, and digital marketing, so I think both visually and strategically from brand identity to user journeys.",
    tags: ["work"]
  },
  {
    match: ["academic background", "education", "study", "degree"],
    reply: "I hold a Bachelor’s degree in Fine Arts and a Postgraduate Diploma in Web and Mobile Application Design from Canada. My education helped me connect art principles with modern UI/UX, interaction design, and front-end awareness.",
    tags: ["work"]
  },
  {
    match: ["how does your education help", "education help design", "education helps"],
    reply: "Fine arts trained my eye; UI/UX education trained my thinking. I understand visual harmony and also usability, accessibility, and responsive design, which helps me create work that looks good and works well.",
    tags: ["work"]
  },
  {
    match: ["design experience", "kind of experience", "your experience"],
    reply: "I have worked across branding, UI/UX, product design, marketing visuals, and content creation. That includes websites, mobile apps, dashboards, landing pages, social media campaigns, and print assets, collaborating with developers and marketers.",
    tags: ["work"]
  },
  {
    match: ["real products", "real apps", "worked on apps", "product based"],
    reply: "Yes. I have worked on product-based projects like dashboard interfaces, service apps, and CRM-style platforms. I handle user flows, wireframes, high-fidelity UI, design systems, and developer handoff to ensure consistency across devices.",
    tags: ["work"]
  },
  {
    match: ["design tools", "tools do you use", "software"],
    reply: "For UI/UX I primarily use Figma for wireframing, prototyping, components, variables, and auto layout. For visual design I use Adobe Illustrator, Photoshop, and InDesign. For motion I use After Effects and Premiere Pro.",
    tags: ["work"]
  },
  {
    match: ["front end knowledge", "technical knowledge", "html css"],
    reply: "Yes, I have a working understanding of HTML, CSS, and responsive behavior. It helps me design developer-friendly interfaces and communicate clearly during handoff.",
    tags: ["work"]
  },
  {
    match: ["photography", "videography", "photo", "video"],
    reply: "Yes, I have hands-on experience in photography and videography for branding and marketing. I understand composition, lighting, and framing, which helps me create more cohesive visual systems.",
    tags: ["work"]
  },
  {
    match: ["motion design", "animation", "after effects"],
    reply: "Yes. I create basic to intermediate motion graphics using After Effects, such as UI animations, social media videos, brand intros, and explainer visuals. I use motion to enhance UX, not just decoration.",
    tags: ["work"]
  },
  {
    match: ["hobbies", "hobby", "free time"],
    reply: "Painting and drawing are still important in my life. They keep my creativity sharp and reinforce fundamentals like composition, color harmony, and storytelling.",
    tags: ["work"]
  },
  {
    match: ["strengths", "your strengths"],
    reply: "My strengths are a strong visual foundation, user-centered thinking, balancing creativity with business goals, and clear communication with technical and non-technical teams. I am adaptable across branding, UI/UX, and product design.",
    tags: ["work"]
  },
  {
    match: ["weakness", "your weakness"],
    reply: "Earlier in my career I spent too much time perfecting visuals. Now I set clear priorities, validate early, and focus on impact rather than perfection, which makes me faster and more effective.",
    tags: ["work"]
  },
  {
    match: ["challenging situation", "difficult situation", "problem solving"],
    reply: "I have worked with clients who had unclear requirements or frequent feedback changes. I asked the right questions, documented decisions, and presented design logic to align expectations and turn feedback into collaboration.",
    tags: ["work"]
  },
  {
    match: ["handle criticism", "feedback"],
    reply: "I see criticism as part of the design process. I listen, ask clarifying questions, and evaluate feedback against user needs and project goals. If it improves the design, I apply it; if not, I explain my reasoning.",
    tags: ["work"]
  },
  {
    match: ["design process", "your process"],
    reply: "My process usually follows: understanding the problem and goals, research and user understanding, wireframing and structure, visual design and interaction, then feedback, iteration, and handoff. It is flexible based on scope and timeline.",
    tags: ["process"]
  },
  {
    match: ["future goals", "career goals"],
    reply: "My goal is to grow as a product-focused designer, contribute to strategy, and eventually lead design initiatives. I am especially interested in how design, technology, and AI can improve user experiences.",
    tags: ["work"]
  },
  {
    match: ["why should we hire you", "why hire you"],
    reply: "Because I bring a mix of artistic foundation, modern UI/UX skills, and real-world product experience. I think about users, systems, and outcomes, and I am reliable, curious, and committed to thoughtful work.",
    tags: ["work"]
  },
  {
    match: ["summarize yourself", "summary as a designer", "moral"],
    reply: "I blend art, usability, and strategy. I believe good design should be visually strong, easy to use, and meaningful for both users and the business.",
    tags: ["work"]
  },
  {
    match: ["project", "portfolio", "work", "samples"],
    reply: "I can show you a few highlighted projects and visuals. Want the full list?",
    actions: [
      { label: "View Projects", href: "projects.html" }
    ],
    tags: ["work", "project"]
  },
  {
    match: ["case study", "case", "story"],
    reply: "The CityCare Mobile case study walks through research, flows, and final UI.",
    actions: [
      { label: "Open Case Study", href: "case-study.html" }
    ],
    tags: ["health", "process"]
  },
  {
    match: ["service", "services", "offer"],
    reply: "Services include UX audits, product strategy, UI systems, and rapid prototyping. Want a tailored scope?",
    actions: [
      { label: "Contact", href: "index.html#contact" }
    ],
    tags: ["system", "ui"]
  },
  {
    match: ["experience", "background", "about"],
    reply: "I have 6+ years in product design, focused on fintech, health, and B2B platforms. I bridge research with expressive UI.",
    tags: ["work"]
  },
  {
    match: ["skills", "skill", "tools"],
    reply: "Skills: user research, UX strategy, UI design, design systems, and prototyping. Tools: Figma, FigJam, Maze.",
    tags: ["system", "ui"]
  },
  {
    match: ["fintech", "finance"],
    reply: "For fintech work, I designed a forecasting dashboard and approval flow for FlowFund Analytics.",
    actions: [
      { label: "See Projects", href: "projects.html" }
    ],
    tags: ["finance", "dashboard"]
  },
  {
    match: ["process", "ux", "research"],
    reply: "My UX process: discovery, journey mapping, wireframes, usability testing, then refined UI and motion.",
    tags: ["process"]
  }
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(text, keywords) {
  return keywords.some((word) => text.includes(normalizeText(word)));
}

function addMessage(type, text, actions = []) {
  if (!chatMessages) return null;
  const message = document.createElement("li");
  message.className = `message ${type}`;
  message.textContent = text;
  appendActions(message, actions);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

function appendActions(message, actions = []) {
  if (!actions.length) return;
  const actionWrap = document.createElement("div");
  actionWrap.className = "message-actions";
  actions.forEach((action) => {
    const link = document.createElement("a");
    link.className = "btn btn-small";
    link.textContent = action.label;
    link.href = action.href;
    actionWrap.appendChild(link);
  });
  message.appendChild(actionWrap);
}

async function fetchAiResponse(message) {
  if (!apiEndpoint) return null;
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data && data.reply ? data.reply : null;
}

function renderMedia(items, title) {
  if (!mediaGrid) return;
  mediaGrid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = `media-card media-${item.type}`;
    const label = document.createElement("div");
    label.className = "media-label";
    label.textContent = item.title;
    card.appendChild(label);
    mediaGrid.appendChild(card);
  });
  if (mediaStatus) {
    mediaStatus.textContent = title;
  }
}

function getResponse(message) {
  const normalized = normalizeText(message);
  for (const response of responses) {
    if (containsAny(normalized, response.match)) {
      return response;
    }
  }
  return {
    reply: "I can share projects, services, skills, or a case study. What would you like to explore?",
    tags: ["work"]
  };
}

async function handleChatSubmit(message) {
  addMessage("user", message);
  const pending = addMessage("bot", "Thinking...");
  const fallback = getResponse(message);
  let reply = null;
  try {
    reply = await fetchAiResponse(message);
  } catch (error) {
    reply = null;
  }

  if (pending) {
    pending.textContent = reply || fallback.reply;
    appendActions(pending, fallback.actions || []);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  const selected = mediaLibrary.filter((item) => fallback.tags && item.tags.some((tag) => fallback.tags.includes(tag)));
  const mediaItems = selected.length ? selected.slice(0, 4) : mediaLibrary.slice(0, 4);
  renderMedia(mediaItems, "Suggested samples based on your question.");
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    handleChatSubmit(message);
    chatInput.value = "";
  });
}

chipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.getAttribute("data-prompt");
    if (prompt) {
      handleChatSubmit(prompt);
    }
  });
});

if (mediaGrid) {
  renderMedia(mediaLibrary.slice(0, 4), "Highlighted visuals from recent work.");
}

const revealTargets = document.querySelectorAll(".chat-card, .media-panel, .media-card, .feature-card, .feature-card-wide, .project-card, .case-card, .contact-card, .video-card, .locked-card, .booking-panel, .booking-card, .booking-slots, .section-title, .page-hero");

if ("IntersectionObserver" in window) {
  revealTargets.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
  );

  revealTargets.forEach((item) => observer.observe(item));
}
