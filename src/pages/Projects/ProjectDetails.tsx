import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ChartNoAxesCombined, Edit2 } from "lucide-react"
import { useProjects } from "@/hooks/useProjects"
import { useState } from "react"
import { ProjectForm, ProjectFormData } from "@/components/ProjectForm"
import { useProjectMutations } from "@/hooks/useProjectMutations"

// Create simple read-only components instead of using form components
const ReadOnlyField = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className="space-y-2">
    <div className="text-sm font-medium text-[#003B5C]">
      {label}
    </div>
    <div className="h-10 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-[#003B5C]">
      {value || '—'}
    </div>
  </div>
)

const ReadOnlyTextarea = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="space-y-2">
    <div className="text-sm font-medium text-[#003B5C]">
      {label}
    </div>
    <div className="min-h-[96px] px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-[#003B5C]">
      {value || '—'}
    </div>
  </div>
)

const ProjectDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { projects = [] } = useProjects()
  const [isEditing, setIsEditing] = useState(false)
  const { updateProject } = useProjectMutations()

  // Find the project from our data
  const project = projects.find(p => p.id === id) || {
    projectName: "Pipeline Erweiterung Nord",
    projectNumber: "MR-23001",
    projectManager: "Thomas Schmidt",
    department: "Infrastruktur Nord",
    supervisor: "Dr. Müller",
    notes: "Wichtige Anmerkungen zum Projekt",
    medium: "Erdgas",
    length: 45,
    nominalWidth: "DN400",
    pressureLevel: "67.5",
    commissioningDate: "2024-06-15",
    roadCrossings: 3,
    railwayCrossings: 1,
    riverCrossings: 2,
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (values: ProjectFormData) => {
    if (project.id) {
      await updateProject({ id: project.id, project: values })
      setIsEditing(false)
    }
  }

  return (
    <div className="px-2 max-w-[1600px] mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              { label: "Projekte", href: "/projects" },
              { label: project.projectName }
            ]}
          />
          
          <div className="flex items-center gap-4">
            <div>
              <Button
                variant="outline"
                className="shadow-[0_4px_10px_rgb(0,60,116,0.20)] hover:shadow-[0_4px_10px_rgb(0,60,116,0.12)] 
                  transition-all duration-300 bg-white border-none
                  text-[#003B5C] hover:text-[#003B5C] hover:bg-[#003B5C]/20"
              >
                <ChartNoAxesCombined className="mr-2 h-5 w-5 text-[#003B5C]/70" />
                <span className="font-medium">Kostenreporting</span>
              </Button>
            </div>

            {!isEditing && (
              <Button
                onClick={handleEdit}
                className="shadow-[0_4px_10px_rgb(0,60,116,0.2)] hover:shadow-[0_6px_20px_rgb(0,60,116,0.3)] 
                  transition-all duration-300 bg-[#003c74] hover:bg-[#003c74]/90"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Bearbeiten
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <ProjectForm
            defaultValues={project}
            onSubmit={handleSave}
            onCancel={() => setIsEditing(false)}
            submitLabel="Speichern"
          />
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {/* Projektdaten Card */}
            <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
              transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
              <CardHeader className="px-8 py-8">
                <CardTitle className="text-xl font-medium text-[#003B5C]">
                  Projektdaten
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-2 gap-4">
                  <ReadOnlyField label="Projektname" value={project.projectName} />
                  <ReadOnlyField label="Projekt-Nr." value={project.projectNumber} />
                  <ReadOnlyField label="Projektleiter" value={project.projectManager} />
                  <ReadOnlyField label="Abteilung" value={project.department} />
                  <ReadOnlyField label="Vorgesetzter" value={project.supervisor} />
                  <ReadOnlyField
                    label="Inbetriebnahme"
                    value={project.commissioningDate ? new Date(project.commissioningDate).toLocaleDateString('de-DE') : undefined}
                  />

                  <div className="col-span-2">
                    <ReadOnlyTextarea label="Notizen" value={project.notes} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technische Daten Card */}
            <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
              transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
              <CardHeader className="px-8 py-8">
                <CardTitle className="text-xl font-medium text-[#003B5C]">
                  Technische Daten
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid grid-cols-2 gap-4">
                  <ReadOnlyField label="Medium" value={project.medium} />
                  <ReadOnlyField label="Leitungslänge (km)" value={project.length} />
                  <ReadOnlyField label="Nennweite" value={project.nominalWidth} />
                  <ReadOnlyField label="Druckstufe (bar)" value={project.pressureLevel} />

                  <div className="col-span-2 space-y-2">
                    <div className="text-sm font-medium text-[#003B5C] mb-4">Sonderbauwerke</div>
                    <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#003B5C]/10">
                      <div className="grid grid-cols-3 gap-6">
                        <ReadOnlyField label="Straßenquerungen" value={project.roadCrossings} />
                        <ReadOnlyField label="Bahnquerungen" value={project.railwayCrossings} />
                        <ReadOnlyField label="Flussquerungen" value={project.riverCrossings} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-start">
          <Button
            onClick={() => navigate("/projects")}
            variant="outline"
            className="shadow-sm shadow-[0_8px_30px_rgb(0,60,116,0.12)] border border-slate-200/50 
              hover:shadow transition-all duration-200 text-[#003B5C] bg-white px-8 py-6 text-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
