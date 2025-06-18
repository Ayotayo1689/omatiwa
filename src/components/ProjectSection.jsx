import { projectsData } from "@/data"
import ProjectShowcase from "./ProjectShowcase"


const ProjectsSection = () => {
  const handlePrimaryClick = (link) => {
    // Handle case study navigation
    window.open(link, "_blank")
  }

  const handleSecondaryClick = (link) => {
    // Handle external link navigation
    window.open(link, "_blank")
  }

  return (
    // <section className="">
     

     
    // </section>

    <div className="flex flex-col gap-8">
    {projectsData.map((project, index) => (
      <ProjectShowcase
        key={project.id}
        image={project.image}
        imageAlt={project.imageAlt}
        imageBackgroundColor={project.imageBackgroundColor}
        smallHeading={project.smallHeading}
        bigHeading={project.bigHeading}
        subHeading={project.subHeading}
        description={project.description}
        primaryButtonText={project.primaryButtonText}
        secondaryButtonText={project.secondaryButtonText}
        onPrimaryButtonClick={() => handlePrimaryClick(project.primaryButtonLink)}
        onSecondaryButtonClick={() => handleSecondaryClick(project.secondaryButtonLink)}
        imagePosition={project.imagePosition}
        className={index > 0 ? "" : ""}
      />
    ))}
  </div>
  )
}

export default ProjectsSection
