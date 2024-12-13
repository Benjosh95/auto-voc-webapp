import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute"; 

// Lazy load the pages
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Projects = lazy(() => import("../pages/Projects/Projects"));
const NewProject = lazy(() => import("../pages/Projects/NewProject"));
const ProjectDetails = lazy(() => import("../pages/Projects/ProjectDetails"));
const Settings = lazy(() => import("../pages/Settings"));
const Help = lazy(() => import("../pages/Help"));
const UserProfile = lazy(() => import("../pages/UserProfile")); 
const CostTypes = lazy(() => import("../pages/Reports/CostTypes"));
const PSPElements = lazy(() => import("../pages/Reports/PSPElements"));
const CostEscalation = lazy(() => import("../pages/Reports/CostEscalation"));
const InflationData = lazy(() => import("../pages/InflationData"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/new" element={<NewProject />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/cost-reporting/cost-types" element={<CostTypes />} />
      <Route path="/cost-reporting/psp-elements" element={<PSPElements />} />
      <Route path="/cost-reporting/escalation" element={<CostEscalation />} />
      <Route path="/inflation-data" element={<InflationData />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/user-profile" element={<UserProfile />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/protected/settings" element={<Settings />} />
      </Route>
    </Route>
  )
);

export default router;
