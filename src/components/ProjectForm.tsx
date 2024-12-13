import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Project } from "@/types/project"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Move the schema to a separate file if used in multiple places
export const projectFormSchema = z.object({
  projectName: z.string().min(1, {
    message: "Projektname ist erforderlich",
  }),
  projectNumber: z.union([
    z.string().regex(/^[A-Za-z]{2}-\d{5}$/, {
      message: "Projektnummer muss dem Format XX-00000 entsprechen (z.B. MR-23033)",
    }),
    z.string().length(0)
  ]).optional(),
  projectManager: z.string().optional(),
  department: z.string().optional(),
  supervisor: z.string().optional(),
  commissioningDate: z.date().optional(),
  notes: z.string().optional(),
  medium: z.enum(["Erdgas", "Wasserstoff", "CO2"]).optional(),
  length: z.coerce.number().positive({
    message: "Leitungslänge muss eine positive Zahl sein.",
  }).int({
    message: "Bitte geben Sie eine ganze Zahl ein.",
  }).optional(),
  nominalWidth: z.enum([
    "DN200", "DN300", "DN400", "DN500", "DN600", "DN700",
    "DN800", "DN900", "DN1000", "DN1100", "DN1200", "DN1400"
  ]).optional(),
  pressureLevel: z.enum([
    "16", "25", "40", "67.5", "70", "80", "84", "100"
  ]).optional(),
  roadCrossings: z.coerce.number().min(0).int().optional(),
  railwayCrossings: z.coerce.number().min(0).int().optional(),
  riverCrossings: z.coerce.number().min(0).int().optional(),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormData>
  onSubmit: (data: ProjectFormData) => void
  onCancel?: () => void
  submitLabel: string
}

export const ProjectForm = ({ defaultValues, onSubmit, onCancel, submitLabel }: ProjectFormProps) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues || {
      projectName: "",
      projectNumber: "",
      projectManager: "",
      department: "",
      supervisor: "",
      notes: "",
      medium: undefined,
      length: undefined,
      nominalWidth: undefined,
      pressureLevel: undefined,
      commissioningDate: undefined,
      roadCrossings: undefined,
      railwayCrossings: undefined,
      riverCrossings: undefined,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Projektname</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="Projektname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Projekt-Nr.</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="XX-00000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectManager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Projektleiter</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="Projektleiter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Abteilung</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="Abteilung"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Vorgesetzter</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="Vorgesetzter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commissioningDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Inbetriebnahme</FormLabel>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full pl-3 text-left font-normal shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C]"
                              >
                                <div className="flex items-center justify-between w-full pr-8">
                                  <span className={!field.value ? "text-[#003B5C]/60" : "text-[#003B5C]"}>
                                    {field.value ? format(field.value, "P", { locale: de }) : "Datum auswählen"}
                                  </span>
                                </div>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={field.onChange}
                              initialFocus
                              locale={de}
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {field.value && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                field.onChange(undefined)
                              }}
                              className="hover:text-[#003B5C] text-[#003B5C]/70 transition-colors"
                              aria-label="Clear selection"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <CalendarIcon className="h-4 w-4 text-[#003B5C]/50" />
                        </div>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-[#003B5C] font-medium">Notizen</FormLabel>
                      <FormControl>
                        <Textarea
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60 resize-none h-24"
                          placeholder="Notizen"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Medium</FormLabel>
                      <div className="relative">
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C]">
                              <div className="flex items-center justify-between w-full pr-8">
                                <SelectValue placeholder="Medium auswählen" className="text-[#003B5C]/60" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white text-[#003B5C]">
                            <SelectItem value="Erdgas">Erdgas (CH4)</SelectItem>
                            <SelectItem value="Wasserstoff">Wasserstoff (H2)</SelectItem>
                            <SelectItem value="CO2">CO2</SelectItem>
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              field.onChange("")
                            }}
                            className="absolute right-9 top-1/2 transform -translate-y-1/2 hover:text-[#003B5C] text-[#003B5C]/70 transition-colors"
                            aria-label="Clear selection"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Leitungslänge (km)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C] placeholder:text-[#003B5C]/60"
                          placeholder="Leitungslänge"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nominalWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Nennweite</FormLabel>
                      <div className="relative">
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C]">
                              <div className="flex items-center justify-between w-full pr-8">
                                <SelectValue placeholder="Nennweite auswählen" className="text-[#003B5C]/60" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {[
                              "DN200", "DN300", "DN400", "DN500", "DN600", "DN700",
                              "DN800", "DN900", "DN1000", "DN1100", "DN1200", "DN1400"
                            ].map((size) => (
                              <SelectItem 
                                key={size} 
                                value={size}
                                className="text-[#003B5C] hover:bg-[#003B5C]/5 focus:bg-[#003B5C]/5"
                              >
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              field.onChange("")
                            }}
                            className="absolute right-9 top-1/2 transform -translate-y-1/2 hover:text-[#003B5C] text-[#003B5C]/70 transition-colors"
                            aria-label="Clear selection"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pressureLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003B5C] font-medium">Druckstufe (bar)</FormLabel>
                      <div className="relative">
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="shadow-sm hover:shadow transition-all duration-200 bg-white/80 text-[#003B5C]">
                              <div className="flex items-center justify-between w-full pr-8">
                                <SelectValue placeholder="Druckstufe auswählen" className="text-[#003B5C]/60" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {[
                              "16", "25", "40", "67.5", "70", "80", "84", "100"
                            ].map((pressure) => (
                              <SelectItem 
                                key={pressure} 
                                value={pressure}
                                className="text-[#003B5C] hover:bg-[#003B5C]/5 focus:bg-[#003B5C]/5"
                              >
                                {pressure}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              field.onChange("")
                            }}
                            className="absolute right-9 top-1/2 transform -translate-y-1/2 hover:text-[#003B5C] text-[#003B5C]/70 transition-colors"
                            aria-label="Clear selection"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormItem className="col-span-2">
                  <FormLabel className="text-[#003B5C] font-medium mb-4">Sonderbauwerke</FormLabel>
                  <div className="rounded-lg p-4 border border-[#003B5C]/10 bg-gray-50">
                    <div className="grid grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="roadCrossings"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[#003B5C]/90 text-sm">
                              Straßenquerungen
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                className="shadow-sm hover:shadow transition-all duration-200 bg-white text-[#003B5C] placeholder:text-[#003B5C]/60"
                                placeholder="Anzahl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="railwayCrossings"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[#003B5C]/90 text-sm">
                              Bahnquerungen
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                className="shadow-sm hover:shadow transition-all duration-200 bg-white text-[#003B5C] placeholder:text-[#003B5C]/60"
                                placeholder="Anzahl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="riverCrossings"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-[#003B5C]/90 text-sm">
                              Flussquerungen
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                className="shadow-sm hover:shadow transition-all duration-200 bg-white text-[#003B5C] placeholder:text-[#003B5C]/60"
                                placeholder="Anzahl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormItem>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="shadow-sm shadow-[0_8px_30px_rgb(0,60,116,0.12)] border border-slate-200/50 
                hover:shadow transition-all duration-200 text-[#003B5C] bg-white"
            >
              Abbrechen
            </Button>
          )}
          <Button
            type="submit"
            className="shadow-[0_4px_10px_rgb(0,60,116,0.2)] hover:shadow-[0_6px_20px_rgb(0,60,116,0.3)] 
              transition-all duration-300 bg-[#003c74] hover:bg-[#003c74]/90"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
} 