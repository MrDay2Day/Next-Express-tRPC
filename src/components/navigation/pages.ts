export type BannerLinkType = {
  imageLink?: string;
  title: string;
  overview: string;
  hrefLink: string;
};

export type SinglePageLinkType = {
  name: string;
  href: string;
  description?: string;
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

LinkOptions.push({ name: "Home", href: "/", linkChildren: [] });
LinkOptions.push({
  name: "Getting Started",
  href: "#",
  linkChildren: [
    {
      title: "Check This out",
      imageLink:
        "https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2024/07/Civic-Sedan-Lineup-2407.webp",
      overview:
        "This is just a sample overview for the link in the navbar to help users get an understanding of what is being offered here",
      hrefLink: "/",
    },
    {
      name: "Place",
      href: "/place",
      description:
        "This is a link to server component that has a client component lazy load in.",
    },
    { name: "Client Page", href: "/client-page" },
    {
      name: "State Page",
      href: "/hook-page",
      description:
        "This is just a short description for the state page which shows example of app wide state management using redux toolkit.",
    },
    {
      title: "Documents",
      imageLink:
        "https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2024/07/Civic-Sedan-Lineup-2407.webp",
      hrefLink: "/docs",
      overview: "Nothing much to say here just a description for the link.",
    },
  ],
});
LinkOptions.push({ name: "Place", href: "/place", linkChildren: [] });
LinkOptions.push({ name: "Map", href: "/map", linkChildren: [] });
LinkOptions.push({ name: "Books", href: "/books", linkChildren: [] });
LinkOptions.push({
  name: "Options",
  href: "#",
  linkChildren: [{ name: "Editor", href: "/editor" }],
});
LinkOptions.push({
  name: "Others",
  href: "#",
  linkChildren: [
    { name: "Client Page", href: "/client-page" },
    { name: "State Page", href: "/hook-page" },
    { name: "Documents", href: "/docs" },
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
  action: (x?: any) => any;
};

const sideOptions: SinglePageLinkType & {
  linkChildren: (SinglePageLinkType | ActionOptionType)[];
} = {
  name: "Settings",
  href: "",
  linkChildren: [
    { name: "Home", href: "/" },
    { name: "Map", href: "/map" },
    {
      title: "Custom Action 1",
      action: () => {
        alert("Custom Action 1");
      },
    },
    {
      title: "Custom Action 2",
      description: "This is just a description for the custom action",
      action: () => {
        alert("Custom Action 2");
      },
    },
  ],
};

export { LinkOptions, sideOptions };
