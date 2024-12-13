import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart } from "lucide-react"

const inflationData = [
  { year: "2014", value: "1.0" },
  { year: "2015", value: "0.5" },
  { year: "2016", value: "0.5" },
  { year: "2017", value: "1.5" },
  { year: "2018", value: "1.8" },
  { year: "2019", value: "1.4" },
  { year: "2020", value: "0.5" },
  { year: "2021", value: "3.1" },
  { year: "2022", value: "6.9" },
  { year: "2023", value: "5.9" },
]

const InflationData = () => {
  return (
    <div className="px-2 max-w-[1600px] mx-auto ">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumb
            items={[
              { label: "Inflationsdaten" }
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Table Card */}
          <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
            transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
            <CardHeader className="px-8 py-8">
              <CardTitle className="text-xl font-medium text-[#003B5C]">
                Vergangene Inflationsraten
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Jahr</TableHead>
                      <TableHead>Veränderung zum Vorjahr (in %)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inflationData.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell className="font-medium">{row.year}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Chart Card */}
          <Card className="shadow-[0_8px_30px_rgb(0,60,116,0.12)] hover:shadow-[0_20px_50px_rgb(0,60,116,0.25)] 
            transition-all duration-500 bg-white/80 backdrop-blur-sm border border-slate-200/50">
            <CardHeader className="px-8 py-8">
              <CardTitle className="text-xl font-medium text-[#003B5C]">
                Inflationsentwicklung
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="flex items-center justify-center h-[400px] bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-400 flex flex-col items-center gap-4">
                  <BarChart className="w-16 h-16" />
                  <span className="text-sm font-medium">Diagramm-Platzhalter</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InflationData 