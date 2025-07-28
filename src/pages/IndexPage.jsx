import ProjectsSection from "@/components/ProjectSection";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Suitor from "../assets/suitor.svg";
import Kudiwave from "../assets/kudiwave.svg";
import Onibata from "../assets/onibata.svg";
import Ulit from "../assets/ulit.svg";
import ExpertiseCards from "@/components/ExpertiseCard";
import PeoplesOpinion from "@/components/PeoplesOpinion";
import MobileExpertiseCards from "@/components/MobileExpartCard";

const IndexPage = () => {


  return (
    <div className="min-h-screen flex  flex-col">
      <div className="border-b min-h-[80dvh] flex justify-center items-center pb-[20px]">
        <div className="md:w-[90%] mx-auto  md:min-h-[500px]">
          <div className="font-[700] text-[20px] md:text-[40px] xl:text-[50px] md:leading-[65px] leading-[37px] tracking-[0.64px]">
            Crafting{" "}
            <span className="dark:text-[#53BDD1] text-[#4898A7]">
              user-centric digital products
            </span>{" "}
            that{" "}
            <span className="dark:text-[#53BDD1] text-[#4898A7]">delight</span>{" "}
            and{" "}
            <span className="dark:text-[#53BDD1] text-[#4898A7]">inspire</span>{" "}
            - I bring expertise and creativity to every{" "}
            <span className="dark:text-[#53BDD1] text-[#4898A7]">design</span>.
          </div>
          <p className="text-[14px] md:text-[18px] xl:text-[22px] md:leading-[40px]  xl:leading-[46px] leading-[30px] mt-6 xl:mt-6">
            Hi, I am Mojeedat, a UX designer with 4 years of experience creating
            user-centric designs that balance business goals and user needs.
            Skilled in Lean UX and Agile methods, I specialize in designing
            intuitive, engaging experiences for both B2B and B2C products. My
            approach combines strategic insights and creativity to deliver
            optimized, user-focused designs.
          </p>
          <div className="flex mt-10  md:mt-6 gap-4 md:gap-6 justify-between md:justify-center items-center ">
            <Button className="md:text-[18px]  md:max-w-fit flex-1 text-[14px] rounded-full font-[600] md:p-[26px] p-[10px]">
              Find out more
            </Button>
            <Button
              variant="outlined"
              className="border border-black flex-1  md:max-w-fit dark:border-white md:text-[18px] text-[14px] font-[600] md:p-[26px] p-[14px] rounded-full "
            >
              Send a Message
            </Button>
          </div>
        </div>
      </div>
      <div className="  mt-8   md:p-8">
        <h2 className="font-[600] mb-16 text-[20px] md:text-[32px]">
          Projects
        </h2>

        <ProjectsSection />
        <div className=" pt-20 mt-20">
          <h2 className="  md:text-[32px] text-[20px] mb-16  font-[600]">
            Visual Design Works
          </h2>
          <p className="text-[14px] md:text-[18px] xl:text-[22px] md:leading-[46px] leading-[30px] mt-4">
            Here are some designs that showcases my conceptual and creative
            work. Each piece reflects a balance of innovation, user-centric
            design principles, and strategic thinking. While they don’t include
            case studies, feel free to explore and enjoy the visuals.
          </p>

          <div className="flex flex-row  overflow-auto md:flex-col gap-6 mt-12">
            <div className=" flex gap-6">
              <div className="bg-[#023F7E] w-[100vw]  overflow-clip   md:flex-1   p-6 ">
                <h3 className="md:text-[32px] text-white text-[18px] font-[600]">
                  Suitroh
                </h3>
                <p className="text-[14px] md:text-[18px] xl:text-[22px] text-white   md:leading-[36px] leading-[20px] mt-2">
                  I believe great design balances user needs, visual appeal, and
                  seamless interacte With a degree in{" "}
                </p>
                <img
                  src={Suitor}
                  alt=""
                  className="max-w-[550px] m-auto mt-8"
                />
              </div>
              <div className="bg-white w-[100vw] md:max-h-[600px] max-h-[500px] overflow-clip sm:max-h-[400px]  md:flex-1   p-6  max-w-[45%]">
                {" "}
                <h3 className="md:text-[32px] text-black text-[18px] font-[600]">
                  Kudiwave
                </h3>
                <p className="text-[14px] md:text-[18px] xl:text-[22px] text-black  md:leading-[36px] leading-[20px] mt-2">
                  Looking to simplify your finances? Send, save, and manage your
                  money effortlessly with Kudiwave
                </p>
                <img
                  src={Kudiwave}
                  alt=""
                  className="max-w-[500px] m-auto mt-8"
                />
              </div>
            </div>
            <div className=" flex gap-6">
              <div className="bg-white w-[100vw]  md:flex-1 overflow-clip      p-6  max-w-[45%]">
                {" "}
                <h3 className="md:text-[32px] text-black text-[18px] font-[600]">
                  Onibata
                </h3>
                <p className="text-[14px] md:text-[18px] xl:text-[22px] text-black  md:leading-[36px] leading-[20px] mt-2">
                  Wants custom-made footwears? Onibata delivers handcrafted
                  shoes tailored to your style and fit, with a seamless AI
                  measuring experience.{" "}
                </p>
                <img
                  src={Onibata}
                  alt=""
                  className="max-w-[500px] m-auto mt-8"
                />
              </div>
              <div className="bg-[#060808] w-[100vw] overflow-clip    md:flex-1   p-6 ">
                {" "}
                <h3 className="md:text-[32px] text-white text-[18px] font-[600]">
                  Ulit
                </h3>
                <p className="text-[14px] md:text-[18px] xl:text-[22px] text-white md:leading-[36px] leading-[20px] mt-2">
                  Curious of digital currency? Ulit is a trusted, user-friendly
                  way to start cryptocurrency, making digital assets accessible
                  and secure{" "}
                </p>
                <img src={Ulit} alt="" className="max-w-[500px] m-auto mt-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <ExpertiseCards />
        </div>
        <div className="block md:hidden">
          <MobileExpertiseCards />
        </div>

        <PeoplesOpinion />
      </div>
    </div>
  );
};

export default IndexPage;
