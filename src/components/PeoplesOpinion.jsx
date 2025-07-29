import React from "react";

const PeoplesOpinion = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ovi Norman",
      title: "CEO, Pixani",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      testimonial:
        "Working with Majeedah was transformative for our product line. Her user-centric approach and keen eye for detail resulted in designs that not only looked exceptional but significantly improved our customer experience metrics. Her ability to balance aesthetics with functionality made all the difference",
    },
    {
      id: 2,
      name: "Iyeah Yusuf",
      title: "CEO, Zortis Technologies",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      testimonial:
        "Omatiwa brings an incredible blend of creative vision and practical problem-solving to every design challenge. Her research-driven process and intuitive understanding of user needs helped us create a product that exceeded our engagement targets by 43%. She is simply the best product designer I've worked with.",
    },
    {
      id: 3,
      name: "Ayotayo Badejo",
      title: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      testimonial:
        "I've collaborated with numerous designers, but Majeedah's work stands out for its thoughtfulness and innovation. She has a remarkable ability to translate complex requirements into elegant, usable designs. Her collaborative spirit and dedication to iteration resulted in a product our users genuinely love.",
    },
  ];

  return (
    <div className="pt-[80px] pb-[40px] ">
      <div className=" mx-auto">
        <h2 className="md:text-[30px] text-[24px] font-[600] mb-16">People's Opinions</h2>

        <div className="space-y-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col dark:bg-[#152528] bg-[#D7EFF4] md:p-8 p-4  gap-4"
            >
              <div className="flex-shrink-0 flex gap-4  ">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="md:w-[80px] md:h-[80px] w-[60px] h-[60px] rounded-full object-cover"
                />
                <div className="mb-3">
                  <h3 className="font-[600] text-[20px] md:text-[24px]">{testimonial.name}</h3>
                  <p className=" text-[14px] md:text-[16px]">{testimonial.title}</p>
                </div>
              </div>

              <div className="flex-1">
                <p className=" md:font-[500] text-[14px] md:text-[18px] xl:text-[20px] leading-relaxed">{testimonial.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeoplesOpinion;
