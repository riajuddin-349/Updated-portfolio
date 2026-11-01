export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  year: string;
  client: string;
  role: string;
  description: string;
  challenge: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "pixizen",
    slug: "pixizen",
    title: "Pixizen",
    category: "AI-Powered Creative Marketing Platform",
    image: "/images/projects/pixizen-cover.png",
    gallery: ["/images/projects/pixizen-01.png", "/images/projects/pixizen-02.jpg", "/images/projects/pixizen-03.jpg"],
    year: "2026",
    client: "Zenbitx LLC",
    role: "Lead UI/UX Designer",
    description: "Pixizen is an AI-powered platform that helps businesses create product images, marketing videos, ad creatives, social media posts, and marketing copy from one place. My focus was designing a workflow that makes powerful AI tools feel simple and approachable for everyday users.",
    challenge: "The biggest challenge was organizing multiple AI features into a clear and predictable experience. Each tool had different inputs and outputs, so the interface needed to stay consistent without slowing users down.",
    outcome: "I designed the end-to-end product experience, including user flows, dashboard layouts, AI generation screens, reusable components, and responsive interfaces, creating a more consistent and intuitive product across the platform."
  },
  {
    id: "zenbify",
    slug: "zenbify",
    title: "Zenbify",
    category: "Shopify-Inspired Multi-Tenant SaaS E-commerce Platform",
    image: "/images/projects/zenbify-cover.png",
    gallery: ["/images/projects/zenbify-01.png", "/images/projects/zenbify-02.png", "/images/projects/zenbify-03.png"],
    year: "2026",
    client: "Zenbitx LLC",
    role: "UI/UX Designer",
    description: "Zenbify is a business management platform designed to bring everyday operations into a single workspace. The product covers different business functions, so the interface needed to remain clear even as the system grew.",
    challenge: "The platform contained large amounts of information across multiple modules. The goal was to improve navigation, reduce visual complexity, and help users complete everyday tasks with less effort.",
    outcome: "I redesigned key product screens, established a reusable design system, and created responsive layouts that made the product more structured, consistent, and easier for both users and developers to work with."
  },
  {
    id: "rasits",
    slug: "rasits",
    title: "Rasits",
    category: "Fashion E-commerce",
    image: "/images/projects/rasits-cover.png",
    gallery: ["/images/projects/rasits-01.png", "/images/projects/rasits-02.jpg", "/images/projects/rasits-03.jpg"],
    year: "2025",
    client: "Rasits",
    role: "UI/UX Designer",
    description: "Rasits is a fashion e-commerce website created to deliver a premium online shopping experience. The design focused on highlighting products while keeping browsing and purchasing simple across different devices.",
    challenge: "Create a shopping experience that feels modern and premium without distracting users from the products. Product discovery, navigation, and checkout needed to feel effortless on both desktop and mobile.",
    outcome: "I designed responsive shopping pages, improved the product browsing experience, refined the visual hierarchy, and built a clean interface that better reflects the brand while supporting a smoother customer journey."
  },
  {
    id: "zenbichat",
    slug: "zenbichat",
    title: "ZenbiChat",
    category: "AI Customer Engagement & Omnichannel Messaging",
    image: "/images/projects/placeholder.svg",
    gallery: ["/images/projects/placeholder.svg"],
    year: "2026",
    client: "Zenbitx LLC",
    role: "Lead Product Designer",
    description: "ZenbiChat is a business AI assistant designed to connect website chat with Facebook, Instagram, and WhatsApp messaging in a unified customer engagement workflow.",
    challenge: "Bring multiple customer communication channels and AI-assisted replies into a coherent experience that helps businesses manage conversations, leads, and orders.",
    outcome: "Designed the product experience and information architecture for a unified inbox and connected AI-assisted customer engagement workflows."
  },
  {
    id: "pixizen-editor",
    slug: "pixizen-editor",
    title: "Pixizen Editor",
    category: "AI Creative Editing Tool",
    image: "/images/projects/placeholder.svg",
    gallery: ["/images/projects/placeholder.svg"],
    year: "2026",
    client: "Zenbitx LLC",
    role: "Lead Product Designer",
    description: "Pixizen Editor is a creative editing experience within the Pixizen ecosystem, supporting users as they prepare visual assets for marketing and ecommerce.",
    challenge: "Make creative editing workflows approachable and clear while keeping key controls and output options easy to discover.",
    outcome: "Contributed to the product UI and interaction patterns for a more consistent creative workflow within the Pixizen ecosystem."
  },
  {
    id: "heygymbo",
    slug: "heygymbo",
    title: "HeyGymbo",
    category: "Fitness Platform — Website Redesign",
    image: "/images/projects/placeholder.svg",
    gallery: ["/images/projects/placeholder.svg"],
    year: "2025",
    client: "HeyGymbo",
    role: "UI/UX Designer",
    description: "HeyGymbo is a fitness platform for which I worked on a website redesign to improve clarity, visual hierarchy, and the overall user experience.",
    challenge: "Present the platform's value clearly and make the website easier to navigate for visitors exploring its fitness offering.",
    outcome: "Redesigned key website experiences with a clearer structure and a more polished, user-focused interface."
  }
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
