import React from "react";
import { Button } from "./ui/button";

const experiences = [
  {
    company: "Fivani",
    role: "Lead Product Designer",
    date: "November, 2024 till Date",
  },
  {
    company: "Zorfts Technologies",
    role: "Product Designer",
    date: "September, 2023 - July, 2024",
  },
  {
    company: "UltaInfinity Global Group",
    role: "Product Designer",
    date: "February, 2023 – May, 2023",
  },
  {
    company: "Suitroh Nigeria Limited",
    role: "Junior Product Designer",
    date: "November, 2022 – April, 2023",
  },
  {
    company: "ITC Advisory Limited",
    role: "Product Designer (Intern)",
    date: "January, 2022 – September, 2022",
  },
  {
    company: "Nupat Technologies",
    role: "Product Designer (Intern)",
    date: "June, 2021 – December, 2021",
  },
];

const WorkExperience = () => {
  return (
    <section className="  px-4 md:px-0 py-[80px] md:py-[120px] border-t-2 mt-[100px]">
      <div className="  mx-auto">
        <h2 className="text-[20px] md:text-[40px] font-semibold mb-16">
          My Work Experience
        </h2>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border-b dark:border-[#1F2B2B] border-[#4AA3B4] pb-6"
            >
              <div className="flex flex-col py-2 md:flex-row justify-between items-start gap-4">
                <p className="text-[20px] md:text-[25px] font-[500]">
                  {exp.company}
                </p>
                <div className="text-left  min-w-[350px] md:text-left">
                  <p className="text-[18px] md:text-[25px] font-[500]">
                    {exp.role}
                  </p>
                  <p className="text-[14px] md:text-[20px] font-[400]">
                    {exp.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button className="rounded-full px-6 py-2 md:px-12 md:py-4 text-[14px] md:text-[16px] font-[400]">
            View Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
