import { Button } from "@/components/ui/button";
import { users } from "@/data";
import React from "react";
import { useParams } from "react-router-dom";

import PinImg from "../assets/Pin.svg";

const Work = () => {
  const { id } = useParams();
  const workItem = users.find((item) => item.id === Number(id));
  console.log(workItem);

  return (
    <div className="md:w-[90%] m-auto">
      <div className="  flex flex-col items-center justify-center gap-6 border-b pb-20">
        <h1 className="text-[50px] font-[700]">{workItem?.name}</h1>
        <q className="max-w-7xl text-center text-[22px]">
          <i>{workItem?.Description}</i>
        </q>

        <Button className=" mb-16 p-6 w-[200px] text-[18px] rounded-full bg-black dark:bg-white text-white dark:text-black   ">
          {workItem?.BtnText}
        </Button>

        <div className="   bg-[#D7EFF4] dark:bg-[#152528] min-w-full justify-center flex">
          <img src={workItem?.bannerImg} alt="" />
        </div>
      </div>
      <div className="text-center text-[20px] my-8 text-[#2C4D54] dark:text-[#53BDD1] ">
        Introduction |1
      </div>
      <h1 className="text-[32px] font-[600]">Overview</h1>
      <p className="text-[20px]">{workItem?.overViewDescription}</p>
      <div className=" my-20 p-6 flex justify-evenly gap-4 flex-wrap">
        {workItem?.overViewCategory?.map((data, index) => (
          <div key={index}>
            <p className="text-[18px] font-[500] ">{data.name}</p>
            <div className="">
              {data.children.map((d, i) => (
                <p key={i} className="text-[18px] mt-2 font-[500] ">
                  {d}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className=" mb-[80px] ">
        <h1 className="text-[32px] mb-4 font-[600]">
          {workItem?.sectionTwo.name}
        </h1>
        <p className="text-[20px]">{workItem?.sectionTwo.description}</p>
      </div>
      <div className=" mb-[80px] ">
        <h1 className="text-[32px] mb-4 font-[600]">
          {workItem?.sectionThree.name}
        </h1>
        <p className="text-[20px]">{workItem?.sectionThree.description}</p>
      </div>{" "}
      <div className="text-center text-[20px] my-20 text-[#2C4D54] dark:text-[#53BDD1] ">
        Research Phase |2
      </div>
      {workItem?.phaseTwo.map((data, i) => (
        <div key={i} className=" mb-[80px] ">
          <h1 className="text-[32px] mb-4 font-[600]">{data.title}</h1>
          <p className="text-[20px]">{data.description}</p>
          <div className="mt-10">
            {data.list.map((d, i) => (
              <div key={i} className="mb-6 items-start  flex text-[20px] gap-4">
                {" "}
                <img src={PinImg} className="w-8" />
                {d}
              </div>
            ))}
          </div>

          <div
            className={`flex mt-16 gap-8 ${
              data?.images?.length === 1
                ? "md:grid-cols-1"
                : "md:grid-cols-2 overflow-auto "
            } md:grid  md:gap-8 pb-4 md:pb-0`}
          >
            {data?.images?.map((x, i) => (
              <img key={i} src={x} alt="" />
            ))}

            {/* <div className="border border-red-500"></div>
            <div className="border border-red-500"></div> */}
          </div>
        </div>
      ))}
      <div className="text-center text-[20px] mt-20 mb-10 text-[#2C4D54] dark:text-[#53BDD1] ">
        {workItem?.phaseThree.heading} Phase |3
      </div>
      {workItem?.phaseThree.question && (
        <div className="p-6 mb-20 w-fit m-auto text-[20px] font-[400] dark:bg-[#152528] bg-[#D7EFF4]">
          <i>{workItem?.phaseThree.question}</i>
        </div>
      )}
      <div className=" ">
        {workItem?.phaseThree.data.map((d, i) => (
          <div key={i} className="  mb-[80px]">
            <h1 className="text-[32px] mb-4 font-[600]">{d.name}</h1>
            <p className="text-[20px]">{d.description}</p>
            {d.images.map((i, x) => (
              <img key={x} src={i} className="mt-10" alt="" />
            ))}

            {d?.story && (
              <div className="">
                {d.story.map((s, c) => (
                  <div
                    key={c}
                    className="bg-[#D7EFF4] mb-16 dark:bg-[#152528] p-16 "
                  >
                    <p>{s.text}</p>
                    <img src={s.img} alt="" />
                    <p>{s.userName}</p>
                    <div className="flex flex-wrap items-center text-sm gap-x-2">
                      {s.experience?.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span>{item}</span>
                          {index < s.experience.length - 1 && (
                            <span className="mx-2">|</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div
                      className={`flex mt-16 gap-8 md:grid-cols-2 overflow-auto  md:grid  md:gap-8 pb-4 md:pb-0`}
                    >
                      <div className="border border-red-500">
                        <h1>Pain Points</h1>

                        {s.painPoints.map((txt, index) => (
                          <p>{txt}</p>
                        ))}
                      </div>
                      <div className="border border-red-500">
                        <h1>Goals</h1>
                        {s.goals.map((txt, index) => (
                          <p>{txt}</p>
                        ))}
                      </div>

                      {/* {data?.images?.map((x, i) => (
              <img key={i} src={x} alt="" />
            ))} */}

                      {/* <div className="border border-red-500"></div>
            <div className="border border-red-500"></div> */}
                    </div>
                    <p>{s.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-[20px] mt-20 mb-10 text-[#2C4D54] dark:text-[#53BDD1] ">
        {workItem?.phaseFour.heading} Phase |4
      </div>
      <div className=" ">
        {workItem?.phaseFour.data.map((d, i) => (
          <div key={i} className="  mb-[80px]">
            <h1 className="text-[32px] mb-4 font-[600]">{d.name}</h1>
            <p className="text-[20px]">{d.description}</p>
            {d.images.map((i, x) => (
              <img key={x} src={i} className="mt-10" alt="" />
            ))}
            {d.children && (
              <div className="px-16">
                {d.children.map((ch, index) => (
                  <div key={index} className="">
                    <h1 className="text-[26px] mb-4 font-[600]">{ch.name}</h1>
                    <p className="text-[18px]">{ch.description}</p>
                    <img src={ch.image} className="mt-10 border mb-16" alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {workItem?.prototype && (
        <div className=" ">
          <div className="text-center text-[20px] mt-20 mb-10 text-[#2C4D54] dark:text-[#53BDD1] ">
            Prototype Phase |5
          </div>

          {workItem?.prototype.map((d, i) => (
            <div key={i} className="  mb-[80px]">
              <h1 className="text-[32px] mb-4 font-[600]">{d.name}</h1>
              <p className="text-[20px]">{d.description}</p>

              <img src={d.images} className="mt-10" alt="" />
            </div>
          ))}
        </div>
      )}
      {workItem?.testing && (
        <div className=" ">
          <div className="text-center text-[20px] mt-20 mb-10 text-[#2C4D54] dark:text-[#53BDD1] ">
            Testing Phase |6
          </div>

          {workItem?.testing.map((d, i) => (
            <div key={i} className="  mb-[80px]">
              <h1 className="text-[32px] mb-4 font-[600]">{d.name}</h1>
              <p className="text-[20px]">
                {d?.description?.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </p>

              {d?.images?.map((v, k) => (
                <div
                  key={k}
                  className=" p-16 pt-8 mt-20  bg-[#D7EFF4] dark:bg-[#152528] flex gap-6"
                >
                  <div className="mt-8">
                    <i className="text-[26px] mb-8 text-[#0BBBDB] underline  font-[500]">
                      {v.title}
                    </i>
                    <p className="text-[22px] mt-6   leading-relaxed ">
                      {v.description}
                    </p>
                  </div>

                  <img src={v.image} className="mt-10" alt="" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {workItem?.iteration && (
        <div className=" ">
          <div className="text-center text-[20px] mt-20 mb-10 text-[rgb(44,77,84)] dark:text-[#53BDD1] ">
            Iteration Phase |7
          </div>

          {workItem?.iteration.map((d, i) => (
            <div key={i} className="  mb-[80px]">
              <h1 className="text-[32px] mb-4 font-[600]">{d.name}</h1>
              <p className="text-[20px]">
                {d?.description?.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </p>

              {d?.images?.map((v, k) => (
                <div
                  key={k}
                  className={` p-16 pt-8 mt-20 dark:bg-[#152528]  bg-[#D7EFF4] flex overflow-x-clip ${
                    i === 0 ? "flex-row-reverse items-center " : "flex-row"
                  } gap-8`}
                >
                  <div className="mt-8 min-w-[45%]">
                    <div
                      className={`text-[26px] mb-6  ${
                        i === 0 ? "" : "text-[#0BBBDB] italic underline"
                      } font-[500]`}
                    >
                      {v.title}
                    </div>
                    <p className="text-[22px] mt-6   leading-relaxed ">
                      {v.description}
                    </p>
                  </div>

                  <img src={v.image} className="mt-10" alt="" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div  className=" mb-[80px] ">
        <div className="text-center text-[20px] mt-20 mb-10 text-[rgb(44,77,84)] dark:text-[#53BDD1] ">
          Conclusion
        </div>

        {workItem?.Conclusion?.map((item, ind) => (
          <div key={ind}>
            <h1   className="text-[32px] mb-4 font-[600]">
              {item.name}
            </h1>

            <div className="mt-10">
              {item.list.map((d, i) => {
                const [boldPart, ...rest] = d.split(":");
                return (
                  <div
                    key={i}
                    className="mb-6 items-start flex text-[20px] gap-4"
                  >
                    <img src={PinImg} className="w-8" />
                    <span>
                      <strong className="font-[600]">{boldPart}:</strong>
                      {rest.join(":")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
