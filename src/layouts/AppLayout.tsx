import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50/50 via-white to-slate-50/50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
