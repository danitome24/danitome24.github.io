export interface Project {
  name: string;
  repoLink: string;
  demoLink?: string;
  tags?: string[];
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
}

export const projects: Project[] = [
  {
    name: "FootPool",
    description: "First decentralized betting application inspired by the popular Spanish 'Quiniela'",
    repoLink: "https://github.com/footpool-xyz/footpool-xyz",
    demoLink: "https://footpool.xyz",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3"],
  },
  {
    name: "Lottery",
    description: "A simple decentralized lottery project built with Solidity for learning purposes, exploring the basics of smart contracts and blockchain technology.",
    repoLink: "https://github.com/danitome24/bc-lottery",
    // demoLink: "https://sellercraft.co",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "Web3"],
  },

  {
    name: "Simple Kickstarter",
    description: "A decentralized Kickstarter-like platform built with Solidity, allowing users to create and fund campaigns securely through smart contracts.",
    repoLink: "https://github.com/danitome24/bc-kickstarter",
    // demoLink: "https://sellercraft.co",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "React", "Web3"],
  },
  {
    name: "Voting App",
    description: "A decentralized voting application built with Solidity, allowing users to securely vote for candidates through smart contracts.",
    repoLink: "https://github.com/danitome24/bc-voting-app/",
    // demoLink: "https://sellercraft.co",
    demoLinkRel: "nofollow noopener noreferrer",
    tags: ["Solidity", "NextJs", "Web3"],
  },
];
