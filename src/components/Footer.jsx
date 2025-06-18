const Footer = () => {
  return (
    <footer className=" border-t mt-16 py-16 px-6">
      <div className="md:container mx-auto">
        {/* Connect Section */}
        <div className="text-center ">
          <h2 className="md:text-[32px] text-[24px] font-[600] mb-4">
            Let's connect
          </h2>
          <p className=" mb-8   md:text-[20px] text-[16px] font-[400] mx-auto">
            Whether for collaboration, opportunities, or just a friendly chat
            about design
          </p>
          <a
            href="mailto:contact@omatiwa.com"
            className="inline-block bg-black dark:bg-white text-white dark:text-black py-3 px-8 rounded-full text-[14px] md:text-[20px] font-[500] hover:bg-[#acacac] transition-colors"
          >
            Send an Email
          </a>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start pt-12 border-gray-800">
          <div className="mb-0 mt-8 md:mt-0 border-t-2 pt-4 md:pt-0 md:border-none flex-1 w-[100%] md:w-fit ">
            <p>© Omatiwa 2024</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-right">
            <a
              href="https://linkedin.com"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com"
              className="hover:text-cyan-400 transition-colors"
            >
              Dribbble
            </a>
            <a
              href="https://behance.net"
              className="hover:text-cyan-400 transition-colors"
            >
              Behance
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-cyan-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
