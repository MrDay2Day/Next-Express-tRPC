"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import React, { JSX, SVGProps } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { LinkOptions, sideOptions } from "./pages";
import Image from "next/image";
import { Settings } from "lucide-react";

export default function ResponsiveNav() {
  const companyName = "Company Name";
  const singleLinkCSS =
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 sticky top-0 bg-inherit">
      {/* Compact Navigation Menu */}
      <Sheet>
        <div className="flex w-full items-center justify-between xl:hidden">
          <Link href="/" prefetch={false}>
            <LogoSVGIcon className="h-6 w-6" />
            <span className="sr-only">{companyName}</span>
          </Link>
          <div className="relative mx-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full max-w-96"
            />
          </div>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="xl:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="right">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Sidebar</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <Link href="#" prefetch={false}>
            <LogoSVGIcon className="h-6 w-6" />
            <span className="sr-only">{companyName}</span>
          </Link>
          <div className="flex w-full align-middle justify-center py-6">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full"
              />
            </div>
          </div>
          <div className="flex w-full align-middle justify-center">
            <ModeToggle />
          </div>
          <div className="grid gap-2 py-6">
            {LinkOptions.map((linkOp, index_0) => {
              if (linkOp.linkChildren.length > 0) {
                return (
                  <Collapsible
                    key={`level_1_${index_0}`}
                    className="grid gap-4 py-2"
                  >
                    <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                      {linkOp.name}{" "}
                      <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="-mx-6 grid gap-6 bg-muted p-6">
                        {linkOp.linkChildren.map((linkOp2, index_1) => {
                          if ("title" in linkOp2) {
                            return (
                              <Link
                                key={`level_2_${linkOp2.title}_${index_0}_${index_1}`}
                                href="#"
                                className="group grid h-auto w-full justify-start gap-1"
                                prefetch={false}
                              >
                                <div className="text-sm font-medium leading-none group-hover:underline">
                                  {linkOp2.title}
                                </div>
                                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {linkOp2.overview}
                                </div>
                              </Link>
                            );
                          } else {
                            return (
                              <Link
                                key={`level_2_${linkOp2.name}_${index_0}_${index_1}`}
                                href="#"
                                className="group grid h-auto w-full justify-start gap-1"
                                prefetch={false}
                              >
                                <div className="text-sm font-medium leading-none group-hover:underline">
                                  {linkOp2.name}
                                </div>
                                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {linkOp2.description}
                                </div>
                              </Link>
                            );
                          }
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              } else {
                return (
                  <Link
                    key={`level_1_${index_0}`}
                    href={linkOp.href}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    {linkOp.name}
                  </Link>
                );
              }
            })}
            <br />
          </div>
        </SheetContent>
      </Sheet>

      {/* Expanded Navigation Menu */}
      <div className="w-full shrink-0 items-center hidden xl:flex ">
        <Link
          href="/"
          className="mr-6 hidden align-middle xl:flex"
          prefetch={false}
        >
          <LogoSVGIcon className="h-6 w-6" />
          <h1 className="ml-4 font-bold">{companyName}</h1>
        </Link>
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {LinkOptions.map((linkOp, index_0) => {
              if (linkOp.linkChildren.length > 0) {
                return (
                  <NavigationMenuItem key={`level_1_${index_0}_${linkOp.name}`}>
                    <NavigationMenuTrigger>{linkOp.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]">
                        {linkOp.linkChildren.map((linkOp2, index_1) => {
                          if ("title" in linkOp2) {
                            return (
                              <li
                                key={`level_2_${linkOp2.title}_${index_0}_${index_1}`}
                                className="row-span-3"
                              >
                                <NavigationMenuLink asChild>
                                  <Link
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                    href="/"
                                    // legacyBehavior
                                    // passHref
                                  >
                                    {linkOp2.imageLink && (
                                      <Image
                                        src={linkOp2.imageLink}
                                        alt={linkOp2.overview}
                                        width={200}
                                        height={200}
                                        //   style={{ width: "100%" }}
                                      />
                                    )}
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                      {linkOp2.title}
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      {linkOp2.overview}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          } else {
                            return (
                              <ListItem
                                key={`level_2_${linkOp2.name}_${index_0}_${index_1}`}
                                href={linkOp2.href}
                                title={linkOp2.name}
                              >
                                {linkOp2.description || ""}
                              </ListItem>
                            );
                          }
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              } else {
                return (
                  <NavigationMenuLink key={`level_1_${index_0}`} asChild>
                    <Link
                      href={linkOp.href}
                      className={`${singleLinkCSS}`}
                      prefetch={false}
                    >
                      {linkOp.name}
                    </Link>
                  </NavigationMenuLink>
                );
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mr-4" variant="outline" size="icon">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent className="w-[300px] p-4"> */}
          <div className="relative mr-4">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full"
            />
          </div>
          {/* </DropdownMenuContent>
          </DropdownMenu> */}
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-4">
                <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Settings className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Select Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function LogoSVGIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
