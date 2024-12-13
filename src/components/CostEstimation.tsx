import { useStore } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
import { EuroIcon, FolderDot } from "lucide-react"
import CountUp from 'react-countup'
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CostEstimation = () => {
  const navigate = useNavigate()
  const currentProject = useStore((state) => state.currentProject)
  const [value, setValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (currentProject) {
      setValue(73000)
      setIsAnimating(true)
    } else {
      setShowText(false)
      setIsAnimating(false)
    }
  }, [currentProject])

  const handleCountEnd = () => {
    setIsAnimating(false)
    setShowText(true)
  }

  if (!currentProject) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate("/projects")}
              className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-200/50 
                shadow-sm text-slate-500 hover:bg-slate-100 transition-colors duration-200"
            >
              <EuroIcon className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">Kein Projekt ausgewählt</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-slate-800 text-white border-none">
            <p>Wählen Sie ein Projekt aus, um die Kostenschätzung anzuzeigen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span 
        className={cn(
          "text-gray-600 transition-opacity duration-1000",
          !showText && "opacity-0",
          showText && "opacity-100"
        )}
      >
        Geschätzte Projektkosten:
      </span>
      <div className="flex items-center gap-1 bg-blue-50 rounded-full px-4 py-1.5">
        <span className="font-medium text-[#003c74] text-lg">
          {isAnimating ? (
            <CountUp
              start={0}
              end={value}
              duration={2.5}
              separator="."
              decimal=","
              decimals={2}
              prefix=""
              suffix=" EUR"
              easingFn={(t, b, c, d) => {
                return c * (1 - Math.pow(1 - t / d, 4)) + b
              }}
              onEnd={handleCountEnd}
            />
          ) : (
            new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
              currencyDisplay: 'code'
            }).format(value).replace('EUR', 'EUR')
          )}
        </span>
      </div>
    </div>
  )
}

export default CostEstimation