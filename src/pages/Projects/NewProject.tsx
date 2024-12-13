import { ProjectForm, ProjectFormData } from "@/components/ProjectForm"
import { useProjectMutations } from "@/hooks/useProjectMutations"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router-dom"

const NewProject = () => {
  const { createProject } = useProjectMutations()
  const navigate = useNavigate()

  const handleSubmit = async (values: ProjectFormData) => {
      const createdProject = await createProject(values)
      navigate(`/projects/${createdProject.id}`)
    }

  return (
    <div className="px-2 max-w-[1600px] mx-auto">
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Projekte", href: "/projects" },
            { label: "Neues Projekt" }
          ]}
        />
        
        <ProjectForm
          onSubmit={handleSubmit}
          submitLabel="Projekt anlegen"
          onCancel={() => navigate("/projects")}
        />
      </div>
    </div>
  )
}

export default NewProject 