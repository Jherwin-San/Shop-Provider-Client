import React, { useState, useEffect } from "react";
import {
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { StoreLogoB, StoreLogoW } from "../images";

const Footer = ({ darkMode }) => {
  const SITEMAP = [
    {
      title: "Company",
      links: [
        {
          label: "About",
          popoverTitle: "About",
          popoverContent: `PlantShop is a solo React JS project made for educational purposes only.`,
          enabled: true, // Enable or disable the popover
        },
        {
          label: "Projects",
          popoverTitle: "Projects",
          popoverContent: "Content for Projects popover",
          enabled: false, // Enable or disable the popover
        },
      ],
    },
    {
      title: "Help Center",
      links: [
        {
          label: "Discord",
          popoverTitle: "Discord",
          popoverContent: "Content for Discord popover",
          enabled: false, // Enable or disable the popover
        },
        {
          label: "Contact Us",
          popoverTitle: "Contact Us",
          popoverContent: "Content for Contact Us popover",
          enabled: false, // Enable or disable the popover
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          label: "Blog",
          popoverTitle: "Blog",
          popoverContent: "Content for Blog popover",
          enabled: false, // Enable or disable the popover
        },
        {
          label: "Newsletter",
          popoverTitle: "Newsletter",
          popoverContent: "Content for Newsletter popover",
          enabled: false, // Enable or disable the popover
        },
      ],
    },
    {
      title: "Products",
      links: [
        {
          label: "Templates",
          popoverTitle: "Templates",
          popoverContent: "Content for Templates popover",
          enabled: false, // Enable or disable the popover
        },
        {
          label: "Growing Kits",
          popoverTitle: "Meal Kits",
          popoverContent: "Content for Meal Kits popover",
          enabled: false, // Enable or disable the popover
        },
      ],
    },
  ];
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="relative w-full bg-white  dark:bg-shogun-950">
        <div className="mx-auto w-full max-w-7xl px-8">
          {!darkMode ? (
            <img
              className="w-full h-60 bg-transparent rounded-lg p-10 object-scale-down"
              src={StoreLogoB}
              alt="Store Logo"
            />
          ) : (
            <img
              className="w-full h-60 bg-transparent rounded-lg p-10 object-scale-down"
              src={StoreLogoW}
              alt="Store Logo"
            />
          )}
          <div className="mx-auto grid w-full gap-8 py-12 grid-cols-2 lg:grid-cols-4">
            {SITEMAP.slice(0, 2).map(({ title, links }, key) => (
              <div key={key} className="w-full">
                <Typography
                  variant="small"
                  className="mb-4 font-bold uppercase opacity-50 text-black dark:text-white"
                >
                  {title}
                </Typography>
                <ul className="space-y-1">
                  {links.map((link, index) => (
                    <Typography
                      key={index}
                      as="li"
                      className="font-normal text-black dark:text-white"
                    >
                      {link.enabled ? (
                        <Popover key={index}>
                          <PopoverHandler key={index}>
                            <p
                              className="inline-block transition-transform hover:scale-105 bg-transparent text-black dark:text-white cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {link.label}
                            </p>
                          </PopoverHandler>
                          <PopoverContent className="z-[999] grid w-[28rem] grid-flow-col overflow-hidden p-0">
                            <div className="p-4">
                              <Typography
                                color="blue-gray"
                                className="mb-2 text-lg font-bold"
                              >
                                {link.popoverTitle}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="mb-14 font-normal text-black"
                              >
                                {link.popoverContent}
                              </Typography>
                            </div>

                            {/* <div className="min-h-full !w-full p-3">
                              <img
                                src={link.image}
                                alt="image"
                                className="h-full w-full rounded-lg object-cover"
                              />
                            </div> */}
                          </PopoverContent>
                        </Popover>
                      ) : (
                        // Render disabled link
                        <p>{link.label}</p>
                      )}
                    </Typography>
                  ))}
                </ul>
              </div>
            ))}

            {SITEMAP.slice(2, 4).map(({ title, links }, key) => (
              <div key={key} className="w-full">
                <Typography
                  variant="small"
                  className="mb-4 font-bold uppercase opacity-50 text-black dark:text-white"
                >
                  {title}
                </Typography>
                <ul className="space-y-1">
                  {links.map((link, index) => (
                    <Typography
                      key={index}
                      as="li"
                      className="font-normal text-black dark:text-white"
                    >
                      {link.enabled ? (
                        <Popover key={index}>
                          <PopoverHandler key={index}>
                            <p
                              className="inline-block transition-transform hover:scale-105 bg-transparent text-black dark:text-white cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {link.label}
                            </p>
                          </PopoverHandler>
                          <PopoverContent className="z-[999] grid w-[28rem] grid-flow-col overflow-hidden p-0">
                            <div className="p-4">
                              <Typography
                                color="blue-gray"
                                className="mb-2 text-lg font-bold"
                              >
                                {link.popoverTitle}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="mb-14 font-normal text-black"
                              >
                                {link.popoverContent}
                              </Typography>
                            </div>

                            {/* <div className="min-h-full !w-full p-3">
                              <img
                                src={link.image}
                                alt="image"
                                className="h-full w-full rounded-lg object-cover"
                              />
                            </div> */}
                          </PopoverContent>
                        </Popover>
                      ) : (
                        // Render disabled link
                        <p>{link.label}</p>
                      )}
                    </Typography>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-black dark:text-white md:mb-0"
            >
              &copy; {currentYear} - Made by San Juan, All info and images that
              came from Swansons Nursery are used for educational purposes.
            </Typography>
            <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
              {/* Social media icons */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
