import React from "react";
import Majeedat from "../assets/Majeedat.svg";
import WorkExperience from "@/components/WorkExperience";
import PeoplesOpinion from "@/components/PeoplesOpinion";
import ExpertiseCards from "@/components/ExpertiseCard";
import MobileExpertiseCards from "@/components/MobileExpartCard";

const About = () => {
  return (
    <div className="md:w-[90%] m-auto">
<div className="">
 <div className="md:text-[40px] text-[24px] font-[600] mt-8">
        A Quick Peek into My World
      </div>
      <p className="text-[16px] md:text-[28px] md:leading-[46px] leading-[30px] mt-8 ">
        I’m <span className="font-[600]">Mustapha Mojeedat</span> , popularly
        known as <span className="font-[600]">Omatiwa</span> . with four (4)
        years of experience creating{" "}
        <span className="font-[600]">
          thoughtful, user-centered digital experiences.
        </span>{" "}
        My work spans across Fintech, SaaS, CRM, Hospitality platforms, and
        more. These projects are always driven by empathy, clarity, and a deep
        interest in solving real problems through design. Each one of them push
        me to think smarter, design better, and grow as both a creator and a
        communicator. I love turning complex ideas into clean, intuitive
        interfaces that feel effortless to use.
      </p>
      <img src={Majeedat} alt="" className="m-auto my-8" />
      <p className="text-[16px] md:text-[28px] md:leading-[46px] leading-[30px]">
        With a background in Sociology (BSc) and Criminology (MSc & PhD in
        progress), I approach design with deep empathy and psychological
        insight, always thinking about how to merge user needs with business
        goals. I love crafting experiences that connect emotionally while
        solving real problems.{" "}
      </p>{" "}
      <p className="text-[16px] md:text-[28px] md:leading-[46px] leading-[30px]">
        As an introvert and observer, I’m especially drawn to understanding user
        psychology and designing with purpose. My work blends research,
        intuition, and visual clarity to create experiences that feel both human
        and intentional.
      </p>{" "}
      <p className="text-[16px] md:text-[28px] md:leading-[46px] leading-[30px]">
        Currently, I’m exploring motion design and diving into user psychology
        through both design and reading. When I’m not designing, you’ll find me
        in my room lost in a romance or thriller novel, writing essays on
        societal issues, or binge-watching a good Korean series.
      </p>

</div>

<WorkExperience/>

      <div className="hidden md:block">
                       <ExpertiseCards />
                     </div>
                     <div className="block md:hidden">
                       <MobileExpertiseCards />
                     </div>

<PeoplesOpinion />
    </div>
  );
};

export default About;
