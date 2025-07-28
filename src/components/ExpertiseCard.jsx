"use client";

import { useState } from "react";

export default function ExpertiseCards() {
  const [isHovered, setIsHovered] = useState(false);

  const cards = [
    {
      id: "tools",
      title: "Tools",
      items: [
        "Figma",
        "Framer",
        "Adobe Creative Suite",
        "UserTesting.com",
        "HTML and CSS",
      ],
      border:"border-solid border-t-[1px] border-[#193B41] border-r-[1px] border-b-[8px] border-l-[8px] dark:border-[#BCD7DC]",
      bgColor: "dark:bg-[#BCD7DC4D] bg-[#0E191B4D]",
      textColor: "text-[#0E191B]  dark:text-white",
    },
    {
      id: "skills",
      title: "Skills",
      items: [
        "UX Design",
        "UX Research",
        "UI Design",
        "Interaction Design",
        "Basic Frontend Dev",
      ],
      border:"border-solid border-t-[8px] border-r-[1px] border-b-[1px] border-l-[8px] border-[#85B0B8] dark:border-[#BCD7DC]",
      bgColor: "bg-[#467C86] dark:bg-[#8AB9C2]",
      textColor: "text-white dark:text-black",
    },
    {
      id: "industries",
      title: "Industries",
      items: [
        "Fintech",
        "E-Commerce",
        "Crypto and Web 3",
        "Hospitality",
        "Lifestyle and Home",
      ],
      border:"border-solid border-t-[1px] border-r-[8px] border-b-[8px] border-l-[1px] border-[#193B41] dark:border-[#BCD7DC]",
      bgColor:"dark:bg-[#BCD7DC4D] bg-[#0E191B4D]",
      textColor: " text-[#0E191B]  dark:text-white",
    },
  ];

  return (
    <div className="min-h-screen  border-y-2 mt-[100px] py-[100px] ">
      <div className=" mx-auto">
        <h1 className="font-[600] text-[20] md:text-[32px] mb-4">My Expertise</h1>
        <p className="text-[18px] md:text-[20px] md:leading-[46px] leading-[30px] mt-4  ">
          Interested in knowing the tools I use, the skills I have developed,
          and the industries I have had a chance to design for? See how I work,
          where I have made an impact, and the ways I keep growing as a
          designer.
        </p>

        <div className="flex   mt-24   min-h-96">
         

          <div
            className="relative flex-1 flex justify-center items-center  h-96"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`
                  absolute w-[350px] h-96 rounded-2xl p-6 
                  transition-all duration-700 ease-out cursor-pointer
                  ${card.bgColor} ${card.textColor}  ${card.border}
                  ${
                    isHovered
                      ? index === 0
                        ? "transform rotate-0  left-[1.5vw] top-0 z-10"
                        : index === 1
                        ? "transform rotate-0  top-0 z-20"
                        : "transform rotate-0   right-[1.5vw] top-0 z-10"
                      : index === 0
                      ? "transform -rotate-[25deg] left-[18vw] translate-y-4 z-10"
                      : index === 1
                      ? "transform rotate-0 -top-[30px] -translate-y-2 z-30"
                      : "transform rotate-[25deg] right-[18vw] translate-y-4 z-20"
                  }
                `}
                style={{
                  transformOrigin: "center center",
                }}
              >
                <h3 className="text-[24px] font-[500] mb-4">{card.title}</h3>
                <div className="space-y-2">
                  {card.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-[28px] font-[500]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
