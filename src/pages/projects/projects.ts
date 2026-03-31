export interface Project {
  name: string;
  repoLink: string;
  demoLink?: string;
  tags?: string[];
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
  wip?: boolean;
  category?: "featured" | "learning" | "open-source"; // New property
}

export const projects: Project[] = [
  // Featured Projects - Real World Applications
  {
    name: "Lens Reputation",
    description: "On-chain reputation system in Lens Network. +100k mints testnet, +10k mints mainnet",
    repoLink: "https://github.com/lens-reputation",
    demoLink: "https://lensreputation.xyz",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Smart Contracts", "Lens Protocol", "DeFi"],
    category: "featured",
  },
  {
    name: "Lens Forum",
    description: "Decentralized forum built on Lens Protocol. Community-driven discussion platform for Web3 enthusiasts",
    repoLink: "https://github.com/lens-forum",
    demoLink: "https://lens-forum.xyz",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Lens Protocol", "Community"],
    category: "featured",
  },
  {
    name: "Pixelens",
    description: "NFT-based image sharing protocol built on Lens Network. Enabling creators to monetize and distribute visual content",
    repoLink: "https://github.com/danitome24/pixelens",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "NFT", "Lens Protocol"],
    category: "featured",
  },
  {
    name: "Betpool",
    description: "Decentralized betting application. First decentralized sports betting protocol enabling peer-to-peer wagering on Web3",
    repoLink: "https://github.com/betpoolxyz/betpool-xyz",
    demoLink: "https://betpool.xyz",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "DeFi", "Betting"],
    category: "featured",
  },
  {
    name: "Kiddo Perks",
    description: "Family-focused DApp that rewards kids with a token for completing household and school tasks. Teaching kids about blockchain and incentives",
    repoLink: "https://github.com/danitome24/bc-kiddo-perks",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "React", "Smart Contracts"],
    category: "featured",
  },
  {
    name: "Key Safe",
    description: "Secure key management solution for Web3. Managing cryptocurrency wallets and private keys with enterprise-grade security",
    repoLink: "https://github.com/danitome24/key-safe",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["TypeScript", "Web3", "Security", "Backend"],
    category: "featured",
  },

  // Learning Projects - Blockchain Learning Path
  {
    name: "Blockchain Learning Path",
    description: "Comprehensive collection of 11 blockchain projects demonstrating progression from basic to advanced concepts. Includes smart contracts, DeFi protocols, and Web3 applications",
    repoLink: "https://github.com/danitome24/blockchain-learning-path",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Learning", "Smart Contracts"],
    category: "learning",
  },
  {
    name: "Simple Lottery",
    description: "A decentralized lottery project built with Solidity for learning purposes, exploring the basics of smart contracts and blockchain technology",
    repoLink: "https://github.com/danitome24/blockchain-learning-path",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Learning"],
    category: "learning",
  },
  {
    name: "Simple Kickstarter",
    description: "A decentralized Kickstarter-like platform built with Solidity, allowing users to create and fund campaigns securely through smart contracts",
    repoLink: "https://github.com/danitome24/blockchain-learning-path",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "React", "Web3", "Learning"],
    category: "learning",
  },
  {
    name: "Voting App",
    description: "A decentralized voting application built with Solidity, allowing users to securely vote for candidates through smart contracts",
    repoLink: "https://github.com/danitome24/blockchain-learning-path",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "NextJS", "Web3", "Learning"],
    category: "learning",
  },
  {
    name: "UOC Master Studies",
    description: "Master's degree program projects in Web Development. Demonstrates progression in frontend development, design patterns, and software architecture",
    repoLink: "https://github.com/danitome24/uoc-master-studies",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["TypeScript", "HTML/CSS", "React", "Web Development"],
    category: "learning",
  },

  // Open Source Contributions
  {
    name: "Pass the Block",
    description: "Open source contribution to community-driven blockchain project",
    repoLink: "https://github.com/danitome24/pass-the-block",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Open Source"],
    category: "open-source",
  },
  {
    name: "OpenFort Position",
    description: "Position management system for OpenFort protocol. Contribution to Web3 infrastructure",
    repoLink: "https://github.com/danitome24/openfort-position",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3", "Open Source"],
    category: "open-source",
  },
];
