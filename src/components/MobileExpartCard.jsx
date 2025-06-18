"use client";

export default function MobileExpertiseCards() {
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
      border:
        "border-solid border-t-[1px] border-[#193B41] border-r-[1px] border-b-[8px] border-l-[8px] dark:border-[#BCD7DC]",
      bgColor: "dark:bg-[#BCD7DC4D] bg-[#0E191B4D]",
      textColor: "text-[#0E191B] dark:text-white",
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
      border:
        "border-solid border-t-[8px] border-r-[1px] border-b-[1px] border-l-[8px] border-[#85B0B8] dark:border-[#BCD7DC]",
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
      border:
        "border-solid border-t-[1px] border-r-[8px] border-b-[8px] border-l-[1px] border-[#193B41] dark:border-[#BCD7DC]",
      bgColor: "dark:bg-[#BCD7DC4D] bg-[#0E191B4D]",
      textColor: "text-[#0E191B] dark:text-white",
    },
  ];

  return (
    <div className="min-h-screen border-y-2 mt-[100px] py-[100px]">
      <div className="mx-auto md:px-4">
        <h1 className="font-[600] md:text-[40px] text-[24px] mb-4">
          My Expertise
        </h1>
        <p className="text-[18px] md:text-[24px] md:leading-[46px] leading-[30px] mt-4 mb-8">
          Interested in knowing the tools I use, the skills I have developed,
          and the industries I have had a chance to design for? See how I work,
          where I have made an impact, and the ways I keep growing as a
          designer.
        </p>

        {/* Scrollable Cards Container */}
        <div className="overflow-x-auto mt-16 pb-4">
          <div className="flex  gap-6 w-max">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  w-80 h-80 rounded-2xl p-8 flex-shrink-0
                  ${card.bgColor} ${card.textColor} ${card.border}
                `}
              >
                <h3 className="text-[16px] font-[500] mb-8">{card.title}</h3>
                <div className="space-y-4">
                  {card.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-[18px] font-[500]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
