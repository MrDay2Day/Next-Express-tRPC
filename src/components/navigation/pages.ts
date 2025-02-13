type BannerLinkType = {
  imageLink: string;
  title: string;
  overview: string;
  hrefLink: string;
};

type SinglePageLinkType = {
  name: string;
  href: string;
  description?: string;
};

type LinkOptionType = SinglePageLinkType & {
  linkChildren: (BannerLinkType | SinglePageLinkType)[];
};

const LinkOptions: LinkOptionType[] = [];

LinkOptions.push({ name: "Home", href: "/", linkChildren: [] });
LinkOptions.push({
  name: "Getting Started",
  href: "/place",
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
  ],
});
// LinkOptions.push({ name: "Place", href: "/place", linkChildren: [] });
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

const sideOptions: SinglePageLinkType & {
  linkChildren: (BannerLinkType | SinglePageLinkType)[];
} = {
  name: "Settings",
  href: "",
  linkChildren: [
    { name: "Home", href: "/" },
    { name: "Home", href: "/" },
  ],
};

export { LinkOptions, sideOptions };
