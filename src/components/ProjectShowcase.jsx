const ProjectShowcase = ({
  // Image props
  image,
  imageAlt,
  imageBackgroundColor,

  // Content props
  smallHeading,
  bigHeading,
  subHeading,
  description,

  // Button props
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,

  // Layout props
  imagePosition = "left",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col md:max-h-[480px] lg:flex-row w-full ${className}`}
    >
      <div
        style={{
          // backgroundImage: `url('${image}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: imageBackgroundColor,
        }}
        className={`w-full min-h-[250px]  lg:w-1/2 p-8 flex items-center justify-center ${
          imagePosition === "right" ? "lg:order-2" : ""
        }`}
      >
       <img src={image} alt="" className="h-[90%]" /> 
      </div>

      {/* Content Section */}
      <div
        className={`w-full lg:w-1/2 p-4 lg:p-12 flex flex-col justify-center bg-black dark:bg-white  ${
          imagePosition === "right" ? "lg:order-1" : ""
        }`}
      >
        <div className=" flex flex-col">
          {smallHeading && (
            <p className="text-[#53BDD1]  dark:text-[#2C4D54] mb-8 font-[700] text-[14px] md:text-[18px]">
              {smallHeading}
            </p>
          )}

          {bigHeading && (
            <h2 className="text-[24px] text-white dark:text-[#000] md:text-[36px] font-[700] mb-2">
              {bigHeading}
            </h2>
          )}

          {subHeading && (
            <h3 className="md:text-[20px] text-[16px] font-[500] text-[#BCD7DC] dark:text-[#697F83] mb-6">
              {subHeading}
            </h3>
          )}

          {description && (
            <p className="dark:text-[#000] text-white md:text-[20px] text-[16px] mb-8 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex  mt-4  gap-4">
            {primaryButtonText && (
              <button
                onClick={onPrimaryButtonClick}
                className="dark:bg-black text-[12px] md:text-[14px] bg-white dark:text-white text-black hover:bg-gray-100 rounded-full md:px-8 md:py-3 py-[14px] px-[18px] font-[500] transition-colors"
              >
                {primaryButtonText}
              </button>
            )}

            {secondaryButtonText && (
              <button
                onClick={onSecondaryButtonClick}
                className="border border-white text-[12px] md:text-[14px] dark:bg-white bg-black dark:text-black text-white dark:border-black bg-transparent hover:bg-white/10 rounded-full md:px-8 md:py-3 py-[14px] px-[18px] font-[500] transition-colors"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
