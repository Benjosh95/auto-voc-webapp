import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./routes/AppRoutes"
import "./index.css"
import { Toaster } from "./components/ui/toaster"
import { ReactQueryProvider } from "./providers/ReactQueryProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>
)
