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
    tags: ["Solidity", "Web3"],
  },
  // {
  //   name: "Sellercraft App",
  //   description: "An Ecommerce omnichannel platform in Southeast Asia",
  //   repoLink: "",
  //   demoLink: "https://sellercraft.co",
  //   demoLinkRel: "nofollow noopener noreferrer",
  //   tags: ["ECommerce", "Saas"],
  // },
  // {
  //   name: "Gaji.id App",
  //   description: "Payroll and HR Management Information System",
  //   repoLink: "",
  //   demoLink: "https://sellercraft.co",
  //   demoLinkRel: "nofollow noopener noreferrer",
  //   tags: ["HRIS", "Saas"],
  // },
];
