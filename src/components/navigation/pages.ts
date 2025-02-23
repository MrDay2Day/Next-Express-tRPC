export type BannerLinkType = {
  imageLink?: string;
  title: string;
  overview: string;
  hrefLink: string;
  auth: boolean;
};

export type SinglePageLinkType = {
  name: string;
  href: string;
  description?: string;
  auth: boolean;
};

export type LinkOptionType = SinglePageLinkType & {
  linkChildren: (BannerLinkType | SinglePageLinkType)[];
};

const LinkOptions: LinkOptionType[] = [];

/**
 *
 * PAGES
 *  These can either be:
 *  - BannerLinkType - These carry images
 *    - These can contain SinglePageLinks with NO LinkOptions
 *  - SinglePageLinks with LinkOptions
 *    - These can contain SinglePageLinks with NO LinkOptions
 *
 */

LinkOptions.push({ name: "Home", href: "/", auth: false, linkChildren: [] });
LinkOptions.push({
  name: "Getting Started",
  href: "#",
  auth: false,
  linkChildren: [
    {
      title: "Check This out",
      imageLink:
        "https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2024/07/Civic-Sedan-Lineup-2407.webp",
      overview:
        "This is just a sample overview for the link in the navbar to help users get an understanding of what is being offered here",
      hrefLink: "/",
      auth: false,
    },
    {
      name: "Place",
      href: "/place",
      description:
        "This is a link to server component that has a client component lazy load in.",
      auth: false,
    },
    { name: "Client Page", href: "/client-page", auth: true },
    {
      name: "State Page",
      href: "/hook-page",
      description:
        "This is just a short description for the state page which shows example of app wide state management using redux toolkit.",
      auth: false,
    },
    {
      title: "Documents",
      imageLink:
        "https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2024/07/Civic-Sedan-Lineup-2407.webp",
      hrefLink: "/docs",
      overview: "Nothing much to say here just a description for the link.",
      auth: true,
    },
  ],
});
LinkOptions.push({
  name: "Place",
  href: "/place",
  linkChildren: [],
  auth: true,
});
LinkOptions.push({ name: "Map", href: "/map", linkChildren: [], auth: true });
LinkOptions.push({
  name: "Books",
  href: "/books",
  linkChildren: [],
  auth: true,
});
LinkOptions.push({
  name: "Options",
  auth: true,
  href: "#",
  linkChildren: [{ name: "Editor", href: "/editor", auth: true }],
});
LinkOptions.push({
  name: "Others",
  href: "#",
  auth: false,
  linkChildren: [
    { name: "Client Page", href: "/client-page", auth: false },
    { name: "State Page", href: "/hook-page", auth: true },
    { name: "Documents", href: "/docs", auth: true },
  ],
});

/**
 *
 * PAGES
 *
 */

export type ActionOptionType = {
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (x?: any) => void;
  auth: boolean;
};

const sideOptions: SinglePageLinkType & {
  linkChildren: (SinglePageLinkType | ActionOptionType)[];
} = {
  name: "Settings",
  href: "",
  auth: false,
  linkChildren: [
    { name: "Login", href: "/login", auth: false },
    { name: "Map", href: "/map", auth: true },
    {
      title: "Custom Action 1",
      action: () => {
        alert("Custom Action 1");
      },
      auth: true,
    },
    {
      title: "Custom Action 2",
      description: "This is just a description for the custom action",
      action: () => {
        alert("Custom Action 2");
      },
      auth: true,
    },
  ],
};

export { LinkOptions, sideOptions };
