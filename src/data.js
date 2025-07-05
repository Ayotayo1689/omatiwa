import Fivani from "../src/assets/Fivanimg.svg";
import BuddyApp from "../src/assets/BuddyApp.svg";
import Zorft from "../src/assets/Zorft.svg";
import HomeVolt from "../src/assets/HomeVolt.svg";
import BuddyAppBanner from "../src/assets/BuddyAppBanner.svg";
import FivaniBanner from "../src/assets/FivaniBanner.svg";
import Afinity from "../src/assets/Afinity.svg";
import UserStory from "../src/assets/UserStory.svg";
import UserFlow from "../src/assets/UserFlow.svg";
import Tolu from "../src/assets/Tolu.svg";
import Thomas from "../src/assets/Thomas.svg";

import IterationOne from "../src/assets/IterationOne.svg";
import IterationTwo from "../src/assets/IterationTwo.svg";

import IterationThree from "../src/assets/IterationThree.svg";

import WireFrame from "../src/assets/WireFrame.svg";
import StyleGuide from "../src/assets/StyleGuide.svg";

import InsightOne from "../src/assets/InsightOne.svg";
import InsightTwo from "../src/assets/InsightTwo.svg";
import InsightThree from "../src/assets/InsightThree.svg";
import InsightFour from "../src/assets/InsightFour.svg";
import InsightFive from "../src/assets/InsightFive.svg";
import InsightSix from "../src/assets/InsightSix.svg";
import InsightSeven from "../src/assets/InsightSeven.svg";
import InsightEight from "../src/assets/InsightEight.svg";
import InsightNine from "../src/assets/InsightNine.svg";
import InsightTen from "../src/assets/InsightTen.svg";
import CompetitiveAnalysis from "../src/assets/CompetitiveAnalysis.svg";

import FivaniDashboard from "../src/assets/FivaniDashboard.svg";
import FreelanceTemplate from "../src/assets/FreelanceTemplate.svg";
import PaymentManagement from "../src/assets/PaymentManagement.svg";
import ProjectManagement from "../src/assets/ProjectManagement.svg";
import MobileResponsiveness from "../src/assets/MobileResponsiveness.svg";

export const projectsData = [
  {
    id: 1,
    image: Fivani,
    imageAlt: "Fivani dashboard on laptop and mobile devices",
    imageBackgroundColor: "#5046e5",
    smallHeading: "Saas Platform",
    bigHeading: "Fivani",
    subHeading: "Web, Dashboard, and Mobile Design",
    description:
      "Empowering freelancers to manage contracts, projects, and payments seamlessly, all in one secure platform",
    primaryButtonText: "View Case-Study",
    secondaryButtonText: "Check Website Link",
    // primaryButtonLink: "/case-study/fivani",
    secondaryButtonLink: "https://fivani.com",
    imagePosition: "left",
  },
  {
    id: 2,
    image: BuddyApp,
    imageAlt: "BuddyApp mobile interface showing travel connections",
    imageBackgroundColor: "#c084fc",
    smallHeading: "Hospitality",
    bigHeading: "BuddyApp",
    subHeading: "Mobile App",
    description:
      "Connecting solo travelers for safer, more enjoyable journeys filled with shared experiences",
    primaryButtonText: "View Case-Study",
    secondaryButtonText: "Check Figma Link",
    // primaryButtonLink: "/case-study/buddyapp",
    secondaryButtonLink: "https://figma.com/buddyapp",
    imagePosition: "left",
  },
  {
    id: 3,
    image: Zorft,
    imageAlt: "Zorfts Technologies website on laptop and mobile",
    imageBackgroundColor: "#3b82f6",
    smallHeading: "Portfolio Website",
    bigHeading: "Zorfts Technologies",
    subHeading: "Web and Mobile Design",
    description:
      "Bringing fresh produce and essentials directly to your doorstep with convenience and reliability",
    primaryButtonText: "View Case-Study",
    secondaryButtonText: "Check Website Link",
    // primaryButtonLink: "/case-study/zorfts",
    secondaryButtonLink: "https://zorfts.com",
    imagePosition: "left",
  },
  {
    id: 4,
    image: HomeVolt,
    imageAlt: "HomeVolt property and energy platform interface",
    imageBackgroundColor: "#06b6d4",
    smallHeading: "Lifestyle and Home",
    bigHeading: "HomeVolt",
    subHeading: "Web, Dashboard and Mobile Design",
    description:
      "Simplifying Property Rentals, Sales, and Renewable Energy Solutions",
    primaryButtonText: "View Case-Study",
    secondaryButtonText: "Check Website Link",
    // primaryButtonLink: "/case-study/homevolt",
    secondaryButtonLink: "https://homevolt.com",
    imagePosition: "left",
  },
];
export const users = [
  {
    id: 1,
    name: "Fivani",
    Description:
      "Why juggle contracts, projects, and payments manually when you can streamline it all in one place? With Fivani, freelancers get an AI-powered workspace designed to simplify operations, reduce risks, and grow client relationships with ease",
    BtnText: "View Website",
    bannerImg: FivaniBanner,
    overViewDescription:
      "An all-in-one AI-powered business management platform designed for freelancers. Fivani streamlines contract creation, project tracking, and payment processing, helping independent professionals stay organized, protected, and focused on what they do best.",
    overViewCategory: [
      { name: "Role", children: ["UX DESIGN ", "UI DESIGN", "UX WRITER"] },
      { name: "Category", children: ["SAAS", "FINTECH ", "PRODUCTIVITY TOOL"] },
      { name: "Timeline", children: ["NOVEMBER, 2024 - ", "TILL DATE"] },
      { name: "Tools", children: ["FIGMA", "GOOGLE FORM", "GOOGLE DOC"] },
      { name: "Skills", children: ["USER TESTING", "PROTOTYPING"] },
    ],
    sectionTwo: {
      name: "Identifying the Challenge",
      description:
        "Freelancers lose up to $12,000 annually to late payments, contract loopholes, and disorganized workflows. Many are tired of chasing payments, juggling multiple clients without structure, and stressing over unclear project scopes. Fivani was created to tackle these pain points, offering a streamlined, all-in-one platform that helps freelancers manage contracts, deadlines, and payments with confidence and clarity.",
    },
    sectionThree: {
      name: "My Role",
      description:
        "As the sole product designer on Fivani, I led the entire design process, from the research phase to high-fidelity prototypes and developer handoff. In addition to designing the user experience, I handled all UX writing across the platform, ensuring that the content was clear, helpful, and aligned with the brand’s voice. This project was executed in collaboration with Fivani’s Head of Product and a freelance Growth Consultant.",
      img: "",
    },
    phaseTwo: [
      {
        title: "User Interview",
        description:
          "To understand the real struggles freelancers face, I conducted semi-structured interviews with 18 freelancers ranging from graphic designers to writers and developers. These interviews were sent out in a Google Doc link and it focused on their workflow, contract challenges, payment issues, and what features they would find most useful in a business management tool. Some of the questions I asked included:",
        list: [
          "Please describe your usual process for creating and managing contracts ",
          "Briefly describe the tools you currently use to track project progress. What do you like or dislike about them?",
          "Briefly describe any challenges you face with payment tracking and processing",
          "What would be a “game-changing” feature or improvement for your workflow?",
        ],
      },
      {
        title: "User Interview Insights",
        description:
          "These are some of the insights gotten from the user interview,",
        list: [
          "Users want an efficient, all-in-one platform that reduces manual tasks by integrating project tracking, reminders, real-time collaboration, and automated updates to boost productivity and reduce tool-switching",
          "There is a strong need for features like instant global payments, local bank remittance, and seamless contract generation and review, to help freelancers manage finances and client agreements more easily.",
          "Time tracking, milestone reminders, and better deadline management tools are considered essential to help freelancers stay organized, deliver work on schedule, and avoid burnout.",
          "They also want a unified space where they can manage multiple projects, communicate with clients and team members, and track progress from a single, easy-to-navigate dashboard",
        ],
        images: [
          InsightOne,
          InsightTwo,
          InsightThree,
          InsightFour,
          InsightFive,
          InsightSix,
          InsightSeven,
          InsightEight,
          InsightNine,
          InsightTen,
        ],
      },

      {
        title: "Competitor Analysis",
        description:
          "I also conducted a series of competitive analyses based on the other competitors mentioned by the interviewees such as ClickUp, Asana, Salesforce and Jira. I studied these companies to learn their gaps and also the points we could improve. I also evaluated the weaknesses of some contracts generating platforms  such as AI Contract Generator and YesChat AI Contract Generator. The goal is to help improve Fivani in the areas they lacked.",
        list: [],
        images: [CompetitiveAnalysis],
      },

      {
        title: "Project Objectives",
        description:
          "By combining insights from user interviews and competitor analysis, I was able to clearly identify gaps in the freelance workflow experience. These findings directly shaped the project objectives which focused on simplifying contract creation, improving payment reliability, streamlining task management, and providing freelancers with a unified, stress-free workspace",
        list: [
          "Enable freelancers to generate legally sound contracts quickly and effortlessly, reducing the risk of disputes and misunderstandings.",
          "Provide a centralized dashboard for managing multiple clients, deadlines, and project milestones to eliminate workflow inefficiencies.",
          "Integrate secure and seamless payment solutions, including local and international options, to reduce delays and income loss.",
          "Incorporate tools like reminders, trackers, and automated updates to help freelancers stay on top of deliverables and project timelines.",
        ],
        images: [],
      },
    ],
    phaseThree: {
      heading: "Definition",
      question: "",
      data: [
        {
          name: "User Story",
          description:
            "With the insights gotten during the research phase, I developed two (2) user personas to accurately represent Fivani's target audience which are Freelancers and Clients",
          images: ["", ""],
          story: [
            {
              text: "User Story: As a freelancer, I need an all in one smart assistant to help generate contracts easily, track project progress, and receive payments on time, so I can focus more on delivering quality work and keep my workflow organized and secure instead of stressing over admin tasks and chasing clients.",
              img: Tolu,
              userName: "Tolu Ayeni",
              experience: [
                "28 years",
                "Freelance UX Designer",
                "4 Contracts per month",
                "Trello, Notion, Payoneer",
                "Lagos, Nigeria",
              ],
              painPoints: [
                "Constantly chasing payments",
                "Juggling multiple clients without centralized tools",
                "Manual project tracking causing disorganization",
              ],
              goals: [
                "Simplify contract creation",
                "Manage multiple projects with ease",
                "Get paid on time without disputes",
              ],
              comment:
                "‘I just want a stress-free system where I can handle contracts, communicate, and get paid—all in one place.’",
            },
            {
              text: "User Story: As a client, I want to create clear project agreements, monitor progress, and make milestone-based payments, so I can collaborate with freelancers confidently and ensure accountability throughout the project",
              img: Thomas,
              userName: "Thomas Freberg",
              experience: [
                "34 years",
                "Startup Founder (E-commerce)",
                "Clickup, Contract Generator",
                "Bristol, United Kingdom",
              ],
              painPoints: [
                "Difficulty managing contracts and deliverables",
                "Lack of clarity and communication with freelancers",
                "Concern over project delays and misaligned expectations",
              ],
              goals: [
                "Monitor hired freelancers easily",
                "Ensure transparency and accountability",
                "Pay securely and track project milestones",
              ],
              comment:
                "‘I want to work with freelancers confidently without worrying about miscommunication or legal grey areas’",
            },
          ],
        },
      ],
    },
    phaseFour: {
      heading: "Prototype",
      data: [
        {
          name: "High Fidelity Design",
          heading: "",
          description:
            "For the prototype phase, I refined the high-fidelity designs based on feedback from user testing sessions and stakeholders feedback. Key features like Contract Generation and Payment Management were polished for clarity and ease of use. Some screens were redesigned, and new ones added to support highly requested functionality, resulting in a more complete, user-centered experience.",
          children: [
            {
              name: "Overview Dashboard",
              description:
                "The overview dashboard was designed to give users a quick glance at all platform features based on the user insights gotten. From here, they can easily navigate to any product or tool they need",
              image: FivaniDashboard,
            },
            {
              name: "AI Contract Generation",
              description:
                "To tackle key pain points such as manually written contracts, signature issues, payments and contract disputes. I simplified the traditionally complex process of contract creation by designing a clean, user-friendly interface that allows freelancers to generate, send, add signatures and manage contracts easily.  This streamlined approach reduces confusion, builds client trust, and ensures smoother project workflows.",
              image: FreelanceTemplate,
            },
            {
              name: "Payment Management",
              description:
                "To solve the payment challenges, I designed the dashboard for transparency, ease of use, and security. Clear invoice statuses, simple layouts, and structured payment flows help users track earnings confidently. Design choices like status badges, filters, and secure action buttons were made to reinforce trust and ensure reliable, stress-free transactions.",
              image: PaymentManagement,
            },
            {
              name: "Project Management",
              description:
                "To address the challenges of manual workflows and tool-switching, I integrated time tracking, reminders, and task milestones into a unified system. By putting these features in one interface, users can easily track time, set reminders, and monitor milestones without switching between apps. This streamlined approach reduced inefficiency, friction, improved focus, and enhanced overall productivity.",
              image: ProjectManagement,
            },
          ],
          images: ["", ""],
        },

        {
          name: "Mobile Responsiveness",
          heading: "",
          description:
            "I also created responsive mobile layouts to enhance accessibility and maintain brand consistency throughout the user journey",

          images: [MobileResponsiveness],
        },
      ],
    },

    Conclusion: [
      {
        name: "Learnings and Takeaways",
        list: [
          "User-centered design is crucial: Freelancers value clarity and control. Features like contract automation, invoice tracking, and milestone-based reminders were most effective when simplified",
          "Reducing tool-switching improves focus: Integrating time tracking, payments, and contracts into one platform boosted user satisfaction and reduced workflow friction",
          "Trust is built through transparency: Clear statuses, secure flows, and professional layouts increased perceived credibility, especially for financial and legal tools.",
        ],
      },
      {
        name: "Project Impacts",
        list: [
          "50% Decrease in Drop-off Rate: Simplified user flows and faster load times reduced friction, encouraging users to complete tasks like contract creation or payment tracking.",
          "2× Improvement in Onboarding Completion: A more intuitive interface and guided steps helped new users quickly understand how to use the platform’s tools.",
          "45% Increase in Time Spent on Platform: By reducing tool-switching, users relied more on Fivani to manage end-to-end workflows, spending more time within the platform.",
          "35% More Returning Users: The polished and professional design increased trust and usability, encouraging freelancers to return and manage multiple projects over time.",
        ],
      },
    ],
  },

  {
    id: 2,
    name: "BuddyApp",
    Description:
      "Why travel solo when you can journey with like-minded companions? With BuddyApp, find travelers who share your destination and preferences, making your adventures safer, more enjoyable, and full of memorable connections.",
    BtnText: "View Prototype",
    bannerImg: BuddyAppBanner,
    overViewDescription:
      "A travel match mobile platform that connects solo travelers with other travelers based on preferences and destinations, BuddyApp enhances the overall travel experience making, making traveling enjoyable, safe and stress-free.",
    overViewCategory: [
      { name: "Role", children: ["PRODUCT DESIGN", "UX RESEARCH"] },
      { name: "Category", children: ["HOSPITALITY", "TRAVEL", "SOCIAL"] },
      { name: "Timeline", children: ["NOVEMBER, 2022 - ", "JUNE, 2023"] },
      { name: "Tools", children: ["FIGMA", "GOOGLE MEET", "GOOGLE DOC"] },
      {
        name: "Skills",
        children: ["UX Design", "Interaction Design", "USER TESTINGE"],
      },
    ],
    sectionTwo: {
      name: "Identifying the Challenge",
      description:
        "While many individuals love solo traveling, there are others, like me, who prefer to explore with others. Whether visiting familiar places or discovering new ones, the challenge of finding compatible travel partners with similar interests, and schedules often leaves travelers feeling discouraged necessitating BuddyApp.",
    },
    sectionThree: {
      name: "The Concept and Creation",
      description:
        "BuddyApp originated from a task assigned to me in late 2022 as part of Stutern Academy’s bootcamp scholarship for mid-level product designers. The challenge was to create a unique matching platform with a distinctive twist. While dating and ride-sharing apps were prevalent, there was no platform dedicated to matching travel companions. As someone who enjoys traveling but often prefers companionship over solo trips, the idea of BuddyApp came to me, aiming to solve a personal need and fill a gap in the travel experience.",
      img: "",
    },
    phaseTwo: [
      {
        title: "User Interview",
        description:
          "For deeper insights, I conducted in-depth interviews with 20 people, aged 18 to 60, exploring their travel habits, motivations, pain points, and desired features for the platform. Interviews were conducted both in person and via video calls on Google Meet and WhatsApp. Some of the questions asked included;",
        list: [
          "Have you ever traveled alone? If so, what were some of the challenges you faced during your solo travels?",
          "Have you ever wished you had a travel companion during your solo trips? If yes, what were the reasons behind that desire?",
          "What are some of the qualities or characteristics you would look for in a travel companion?",
          "What features or functionalities would you expect from an app that connect travelers together?",
        ],
      },
      {
        title: "Project Objectives",
        description:
          "The interviews yielded valuable insights that shaped the objectives of BuddyApp. Through the user feedback, I discovered the key challenges and user needs that highlighted the real potential for such a platform.",
        list: [
          "Match travelers with similar preferences, destinations, and schedules together to promote travel companionship, and safety",
          "Connect users on advanced filters such as interests, destinations, schedules, religion, location, ethnicity, or age group",
          "Offer messaging capabilities, travelers’ ratings and review system for potential companions and itinerary sharing features",
          "Most express concerns about safety, meeting strangers and the reliability of the app's matching algorithm with potential partners. ",
        ],
      },
      {
        title: "Business Prospects",
        description:
          "I also explored the potential avenues through which BuddyApp could generate revenue and grow as a sustainable business.",
        list: [
          "Having a plus and premium subscription will provide a recurring revenue stream for BuddyApp.",
          "Partnerships with travel agencies, hotels and airlines, will earn referral commissions and more income for the business",
          "Potential expansion into new markets after gaining traction and establishing a strong user base in one region or market.",
          "Curate and offer premium travel experiences (group trips or guided tours) tailored to the preferences and interests of its users. ",
        ],
        images: ["", "", ""],
      },
    ],
    phaseThree: {
      heading: "Definition",
      question:
        "How Might We simplify the process of finding and matching compatible travel partners?",
      data: [
        {
          name: "Affinity Mapping",
          description:
            "From the insights gotten, I conducted an affinity mapping exercise categorizing the key user needs, pain points, and trends identified from the findings.",
          images: [Afinity],
        },
        {
          name: "User Story",
          description:
            "I also developed a user story to accurately represent BuddyApp's target audience and a UX storyboard that illustrates the typical user journey from the moment they begin searching for travel companions to the completion of their trip, highlighting key touchpoints and experiences throughout.",
          images: [UserStory],
        },
      ],
    },
    phaseFour: {
      heading: "Ideation",
      data: [
        {
          name: "User Flow",

          description:
            "For a seamless experience, I designed a simple and intuitive flow that guides users from receiving recommendations to downloading the app, onboarding, and connecting with a travel partner. From there, users can embark on their trip, rate their partners and recommend BuddyApp to others.",

          images: [UserFlow],
        },
      ],
    },
    prototype: [
      {
        name: "Low Fidelity Wireframe",
        description:
          "The next step was sketching out the low-fidelity wireframes, guided by the user flow and focused on the core structure and functionality of the app. Throughout the process, I iteratively refined the wireframes based on user feedback and stakeholder input, ensuring that the design aligned with both usability and business objectives.",
        images: WireFrame,
      },
      {
        name: "Style Guide",
        description:
          "For a cohesive and visually unified experience, I developed a comprehensive style guide and it helped maintain consistency across all the design elements, from colors and typography to layout and interactions. By adhering to it, I was able to strengthen the app’s overall brand presence. ",
        images: StyleGuide,
      },
    ],
    testing: [
      {
        name: "First Iteration",
        description:
          "Afterwards, I designed the initial high-fidelity design, which was the Minimum Viable Product (MVP). While it successfully met some of the core requirements of the user needs and business goals, not all were covered. The visual design was simple and the interaction design had creative elements to enhance the overall user experience. ",
        images: [
          {
            title: "How do I get matched with other travelers?",
            description:
              "Users are requested to input their personal details and traveling preferences to match them perfectly with their travel partners.",
            image: IterationOne,
          },
        ],
      },
      {
        name: "User Testing and Feedback/ Stakeholders’ Input",
        description: `To ensure BuddyApp truly met user needs, I conducted several rounds of user testing and gathered valuable feedback from key stakeholders. During testing, users expressed confusion about the app's navigation, particularly with the home and matches screens. Many mistakenly believed the home screen was for matches, while the matches screen was perceived as the location screen. This highlighted a significant usability issue that needed to be addressed. \n sers also suggested new features, such as integrated trip planning and bookings, which would enhance the overall experience of coordinating travel with companions. Based on this feedback, I iterated on the design, refining the layout and flow to create a more intuitive and user-friendly experience. These updates led to the final high-fidelity design, which more effectively aligned with user expectations and needs at the time of this case study.`,
      },
    ],

    iteration: [
      {
        name: "Final Iteration",
        description:
          "For the final iteration, I refined the initial high-fidelity design based on user insights and stakeholder feedback. This polished version features clean, captivating visuals and smooth, intuitive interactions, ensuring a seamless user experience.  While some screens remained unchanged, others were redesigned, and new screens were added to incorporate highly requested features. This process has resulted in a comprehensive platform that effectively meets user needs and aligns with stakeholder objectives.",
        images: [
          {
            title: "1. Change the Logo",
            description:
              "The first step in enhancing BuddyApp was to change its logo. While the original design reflected the app’s goal, I received feedback from users who found it too childish. This led to the design of a new and more refined logo that resonated better with users. ",
            image: IterationTwo,
          },
        ],
      },
      {
        name: "New and Additional Features",
        description: "",
        images: [
          {
            title: "Details and booking option on destination",
            description:
              "Users can immerse themselves in their chosen destinations by exploring on the app, view maps, and effortlessly book their flights; all within the app.",
            image: IterationThree,
          },
        ],
      },
    ],
    Conclusion: [
      {
        name: "Learnings and Takeaways",
        list: [
          "User-Centric Design is Essential: Understanding users' needs and preferences through interviews provided valuable insights that guided the app’s features, ensuring a more relevant and tailored experience for travelers.",
          "Feedback Drives Improvement: Learnt the importance of iteration through the continuous user feedback, which helped with refining and expanding app features, ensuring that BuddyApp evolves to meet the changing needs of its users.",
          "Community Connection Enhances Experience: Facilitating connections between travelers fosters a sense of community, making trips more enjoyable and enriching. Users value the opportunity to share experiences with like-minded individuals.",
          "Simplicity in Booking is Key: Streamlined features for booking flights and accommodations significantly enhance user satisfaction, as convenience is a top priority for modern travelers.",
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Zorfts Technologies",
    Description:
      "‘Why settle for generic solutions when your business can thrive with tailored innovation? At Zorfts Technologies, we blend creativity and technology to build powerful digital experiences that move brands forward.’",
    BtnText: "View Website",
    bannerImg: "",
    overViewDescription:
      "A leading technology company providing comprehensive digital solutions to help businesses succeed in a fast-paced digital world. Specialized in brand and graphic design, web and app development, data analytics, software development, and IT consulting.",
    overViewCategory: [
      { name: "Role", children: ["VISUAL DESIGN ", "INTERACTION DESIGN"] },
      { name: "Category", children: ["PORTFOLIO"] },
      { name: "Timeline", children: ["MARCH, 2024 -", "APRIL, 2024"] },
      { name: "Tools", children: ["FIGMA", "SPLINE"] },
      { name: "Skills", children: ["UI Design", "PROTOTYPING"] },
    ],
    sectionTwo: {
      name: "My Role",
      description:
        "I and my partner; Adeolu Adelaja were tasked with providing a solution to the need for a comprehensive, one-stop digital solutions provider capable of meeting diverse business needs. While Adeolu handled the UX design of the project, I handled the UI and Interaction aspects. Other team members included 3 front-end developers, 3 backend developers, 1 project manager and 1 content writer.",
    },
    sectionThree: {
      name: "Identifying the Challenge",
      description:
        "While digitalization is essential for modern businesses, many struggle to find a single partner that can handle their diverse needs, such as branding and web development, data analytics, IT consulting and other services. This often leaves companies using different services from different providers, which can be inefficient and costly.",
      img: "",
    },
    phaseTwo: [
      {
        title: "Competitor Analysis",
        description:
          "We conducted a series of competitive analyses on to gain valuable insights into the market, understand users’ expectations, and industry standards.  Through our analysis of competitors such as Vetebra Limited, Digital Bananas, Wild Fusion, Softcom and Minimum Studio, we identified gaps in the existing companies, and opportunities for differentiation, such as: ",
        list: [
          "Noticeable gaps included lack of highly personalized features. This meant we needed to focus on the customization and user-tailored experiences, by meeting specific user needs.",
          "There were no smooth cross-platform experiences.  By addressing this gap could position our product as the more user-friendly option.",
          "There were complicated and lengthy onboarding, so there is a need to focus on simplicity and intuitive design, to provide a smoother entry for users.",
          "Insights revealed a gap in services for the Nigerian market. Therefore, such a product could help the Nigerian market, increase the product’s relevance and appeal to the target audience.",
        ],
        // images: ["", "", ""],
      },
      {
        title: "Project Objectives",
        description:
          "With the competitive analyses, the insights gotten helped frame our projects objectives which addressed all the gaps needed to be filled ",
        list: [
          "Create a unified digital solution platform that offers seamless services across branding, data analytics, and software solutions",
          "Deliver consistent IT consulting and support to help clients maintain digital infrastructure, ensuring stability and security.",
          "Provide efficient, user-friendly, scalable, and adaptable web and app development services to evolving business needs",
          "Recruit and outsource talented, passionate individuals to strengthen their team and support businesses worldwide",
        ],
        // images: ["", "", ""],
      },
    ],
    phaseThree: {
      question: "",
      heading: "Ideation",
      data: [
        {
          name: "Mid Fidelity Wireframe",
          description:
            "Next were the mid-fidelity wireframes, built on the insights gotten and project objectives. It focused on the core structure and functionality of the website. These wireframes were used for user testing sessions.  ",
          images: ["", ""],
        },
      ],
    },
    phaseFour: {
      heading: "Prototype",
      data: [
        {
          name: "High Fidelity Design",
          heading: "",
          description:
            "With the feedbacks from the user testing and stakeholders’ input, I improved on the mid fidelity wireframes, and iterated, ensuring the needs and goals of the users and stakeholders reflect in the final design. ",

          images: ["", ""],
        },
        {
          name: "Mobile Responsiveness",
          heading: "",
          description:
            "We also designed the mobile version of the entire website to maintain visual consistency and ensure full responsiveness across all devices",

          images: [""],
        },
      ],
    },

    Conclusion: [
      {
        name: "Project Impacts",
        list: [
          "65% Increase in Client Retention: By simplifying the user journey and creating a more intuitive and visually appealing interface, client retention on Zorfts Technologies’ website improved significantly.",
          "40% Boost in Service Inquiries: Post-launch, the platform saw a noticeable rise in the number of business inquiries, thanks to clearer call-to-actions and better service categorization.",
          "Stronger Brand Perception: The new design positioned Zorfts as a more modern, reliable, and versatile tech company and feedbacks from clients highlighted improved trust and brand credibility.",
          "Faster User Decision-Making:  With improved layout, content hierarchy, and seamless navigation, users were able to identify relevant services 2x faster than before.",
        ],
      },
    ],
  },
];
