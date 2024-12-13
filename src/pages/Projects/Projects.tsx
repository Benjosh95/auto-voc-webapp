import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { useNavigate } from "react-router-dom"
import { Plus, ArrowUpDown } from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Project } from "@/types/project"
import { useProjects } from "@/hooks/useProjects"
import { useStore } from "@/store/useStore"
import { cn } from "@/lib/utils"
import { useState } from "react"

const Projects = () => {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const { projects = [] } = useProjects()
  const setCurrentProject = useStore((state) => state.setCurrentProject)

  const handleProjectSelect = (project: Project) => {
    setCurrentProject(project)
    navigate(`/projects/${project.id}`)
  }

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "projectNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-[#003B5C] font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projekt-Nr.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-[#003B5C]">
          {row.getValue("projectNumber")}
        </div>
      ),
    },
    {
      accessorKey: "projectName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-[#003B5C] font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projektname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("projectName")}
        </div>
      ),
    },
    {
      accessorKey: "projectManager",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-[#003B5C] font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projektleiter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "medium",
      header: "Medium",
    },
    {
      accessorKey: "length",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-[#003B5C] font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Länge (km)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("length")}
        </div>
      ),
    },
    {
      accessorKey: "commissioningDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-[#003B5C] font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inbetriebnahme
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("commissioningDate")
        return date ? <div>{new Date(date as string).toLocaleDateString('de-DE')}</div> : null
      },
    },
  ]

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="px-2 max-w-[1600px] mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              { label: "Projekte" }
            ]}
          />
          <Button
            onClick={() => navigate("/projects/new")}
            className="shadow-[0_4px_10px_rgb(0,60,116,0.2)] hover:shadow-[0_6px_20px_rgb(0,60,116,0.3)] 
              transition-all duration-300 bg-[#003c74] hover:bg-[#003c74]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Neues Projekt
          </Button>
        </div>

        <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
          transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50 max-h-[calc(100vh-220px)] overflow-y-auto">
          <CardContent className="p-8">
            <div className="overflow-auto">
              <div className="rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          onDoubleClick={() => handleProjectSelect(row.original)}
                          className={cn(
                            "cursor-pointer transition-colors",
                            "hover:bg-[#003B5C]/5",
                            "active:bg-[#003B5C]/10",
                          )}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center text-[#003B5C]/60"
                        >
                          Keine Projekte vorhanden
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Projects
