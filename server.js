import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORS_ORIGIN || "*";
const model = process.env.MODEL || "gpt-4o";

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const profile = `
Name: Mashiur Rahman
Role: UI/UX Designer | Web & Mobile Design Specialist
Location: Bangladesh (open to remote)
Education: Post Graduate Diploma, Web and Mobile Application Design (Langara College, Vancouver, Jan 2025). Bachelor of Fine Arts (University of Development Alternative, Bangladesh, Jan 2012).
Summary: UI/UX Designer with 3+ years of visual design experience. Skilled in Figma, prototyping, scalable design systems. Focus on usability, accessibility, and visual impact.
Skills: UX Design (User Flows, Wireframes, Prototyping, Usability Testing, Heuristic Evaluation). UI Design (Figma Auto Layout, Components, Variables), Design Systems, Style Guides. Accessibility (WCAG, Inclusive Design). Collaboration (Agile, Design Reviews, Developer Handoff). Tools: Figma, Tailwind CSS, Framer, Adobe Creative Suite, Jira, Trello, ClickUp. Web Fundamentals: HTML, CSS, WordPress, Mobile-First Design.
Experience:
- Web and Multimedia Designer, Stallions Cricket Academy (Oct 2024 - Present): Website redesign improved booking/registration and boosted sign-ups by 30%. Created visual assets and design system elements. Managed multimedia assets for 1,000-person Gala Night 2025.
- Marketing Specialist, Global Pet Foods (May 2024 - Jan 2025): Optimized Shopify/Amazon journeys. Increased traffic 75%, retention 60%, organic engagement 67%, reduced paid CPC 80%.
- Lead Designer, StreetSight (Academic Project, Jan 2025 - Apr 2025): Designed dashboard for billboard asset management. Conducted research, mapping, testing. Built responsive Figma prototype and collaborated with developers.
- UI/UX Designer, Kyntra (Capstone, Apr 2025 - Aug 2025): Designed mobile app for injury recovery and exercise. Built design system, applied WCAG and mobile-first principles, created high-fidelity prototypes.
- Lead Creative Designer, BProperty.Com Ltd (Aug 2018 - Dec 2023): Led team of 7, built cohesive design systems, oversaw UX/UI for internal and consumer apps.
Volunteering: Web Summit, Vancouver (May 2025).

Interview-style Q&A (use these verbatim or lightly paraphrase when they match the question):
Q: Tell me about yourself.
A: I’m a multidisciplinary UI/UX, visual, and product designer with a background in fine arts and over five years of professional experience across branding, digital products, and marketing-driven design. I started my journey with drawing and painting, which shaped my visual sensitivity, and over time I transitioned into digital design, UI/UX, and product thinking. Today, I design user-centered interfaces, scalable design systems, and visual assets that balance aesthetics, usability, and business goals.

Q: What is your design background?
A: My foundation is in Fine Arts—drawing and painting—which gave me a strong understanding of composition, color, form, and storytelling. Professionally, I’ve worked in graphic design, environmental and retail branding, UI/UX design, and digital marketing. This mix allows me to think both visually and strategically, from brand identity to user journeys and conversion-focused interfaces.

Q: What is your academic background?
A: I hold a Bachelor’s degree in Fine Arts with a focus on drawing and painting, and I recently completed a Postgraduate Diploma in Web and Mobile Application Design in Canada. My academic journey helped me bridge traditional art principles with modern UI/UX, interaction design, and front-end awareness.

Q: How does your education help your design work?
A: Fine arts trained my eye; UI/UX education trained my thinking. I understand visual harmony, but I also understand usability, accessibility, responsive design, and how users interact with digital products. This combination helps me design work that looks good and works well.

Q: What kind of design experience do you have?
A: I’ve worked across branding, UI/UX, product design, marketing visuals, and content creation. My experience includes designing websites, mobile apps, dashboards, landing pages, social media campaigns, and print assets. I’ve collaborated with developers, marketers, and business stakeholders, which helped me understand the full product lifecycle.

Q: Have you worked on real products or apps?
A: Yes. I’ve worked on multiple product-based projects such as dashboard interfaces, service apps, and CRM-style platforms. I’ve handled user flows, wireframes, high-fidelity UI, design systems, and handoff to developers, ensuring consistency and usability across devices.

Q: What design tools do you use?
A: For UI/UX and product design, I primarily use Figma for wireframing, prototyping, components, variables, and auto layout. For visual design, I use Adobe Illustrator, Photoshop, and InDesign. For motion and video, I use After Effects and Premiere Pro.

Q: Do you have any technical or front-end knowledge?
A: Yes, I have a working understanding of HTML, CSS, and responsive behavior. While I’m not a full-time developer, this knowledge helps me design realistic, developer-friendly interfaces and communicate clearly during handoff.

Q: Do you work with photography and videography?
A: Yes. I have hands-on experience in photography and videography for branding and marketing. I understand composition, lighting, framing, and how visuals translate across digital platforms. This helps me create more cohesive and authentic design systems.

Q: Do you have experience with motion design?
A: Yes. I create basic to intermediate motion graphics using After Effects—such as UI animations, social media videos, brand intros, and explainer-style visuals. I strongly believe motion enhances user experience when used with purpose, not decoration.

Q: Do you have any hobbies related to design?
A: Yes, painting and drawing are still an important part of my life. They keep my creativity sharp and help me stay connected to fundamentals like composition, color harmony, and storytelling, which directly influence my digital design work.

Q: What are your strengths as a designer?
A: My key strengths are: strong visual foundation, user-centered thinking, ability to balance creativity with business goals, and clear communication with both technical and non-technical teams. I’m also adaptable—I can work on branding, UI/UX, or product design depending on the project’s needs.

Q: What is your weakness?
A: Earlier in my career, I used to spend too much time perfecting visuals. Now, I manage this by setting clear priorities, validating designs early, and focusing on impact rather than perfection. It’s made me faster and more effective.

Q: Describe a challenging situation you handled.
A: I’ve worked with clients who had unclear requirements or frequent feedback changes. In those situations, I focused on asking the right questions, documenting decisions, and presenting design logic instead of just visuals. This helped align expectations and turn feedback into constructive collaboration.

Q: How do you handle criticism?
A: I see criticism as part of the design process. I listen carefully, ask clarifying questions, and evaluate feedback against user needs and project goals. If feedback improves the design, I apply it. If not, I explain my reasoning respectfully.

Q: What is your design process?
A: My process usually follows: understanding the problem and goals, research and user understanding, wireframing and structure, visual design and interaction, feedback, iteration, and handoff. The process is flexible, depending on timelines and project scope.

Q: What are your future career goals?
A: My goal is to grow as a product-focused designer—working on meaningful digital products, contributing to strategy, and eventually leading design initiatives. I’m especially interested in how design, technology, and AI can work together to improve user experiences.

Q: Why should we hire you?
A: Because I bring a rare mix of artistic foundation, modern UI/UX skills, and real-world product experience. I don’t just design screens—I think about users, systems, and outcomes. I’m reliable, curious, and committed to delivering thoughtful, high-quality work.

Q: How would you summarize yourself as a designer?
A: I’m a designer who blends art, usability, and strategy. I believe good design should be visually strong, easy to use, and meaningful—both for users and for the business.
`;

const systemPrompt = `You are the AI portfolio assistant for Mashiur Rahman. Use only the profile data provided. Prefer the Q&A section when the question matches it, and answer in a specific, personal tone. Be concise (2-4 sentences). If asked about projects or case studies, suggest checking the Projects or Case Study pages. If asked for images or videos, explain that visuals are shown on the page and offer to guide the visitor to the relevant section. If a question is outside the profile or is personal (age, family, salary), say you don't have that detail and invite the visitor to contact Mashiur.`;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const message = typeof req.body.message === "string" ? req.body.message.trim() : "";
  if (!message) {
    return res.status(400).json({ reply: "Please enter a question about Mashiur's skills, work, or projects." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ reply: "Server is missing the OpenAI API key." });
  }

  try {
    const response = await client.responses.create({
      model,
      input: [
        { role: "system", content: systemPrompt },
        { role: "system", content: `PROFILE:\n${profile}` },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_output_tokens: 300
    });

    const reply = response.output_text || "I can help with skills, projects, or the case study. What would you like to know?";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Sorry, I could not reach the AI service right now. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
