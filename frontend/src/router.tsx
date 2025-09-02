import { createBrowserRouter } from "react-router-dom";
import App, { ProtectedOutlet } from "./App";

// Import all your existing pages
import Auth from "./pages/Auth";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";

// Admin pages
import AdminAssessment from "./pages/AdminAssessment";
import AdminCoach from "./pages/AdminCoach";
import AdminDashboard from "./pages/AdminDashboard";
import AdminKnowledge from "./pages/AdminKnowledge";
import AdminPlan from "./pages/AdminPlan";
import AdminProgress from "./pages/AdminProgress";
import AdminReports from "./pages/AdminReports";
import AdminResources from "./pages/AdminResources";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      // Onboarding route - accessible to both authenticated and anonymous users
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      
      // Protected routes - all routes below need authentication
      {
        element: <ProtectedOutlet />,
        children: [
          {
            path: "/help",
            element: <Help />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          // Admin routes
          {
            path: "/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/assessment",
            element: <AdminAssessment />,
          },
          {
            path: "/coach",
            element: <AdminCoach />,
          },
          {
            path: "/plan",
            element: <AdminPlan />,
          },
          {
            path: "/progress",
            element: <AdminProgress />,
          },
          {
            path: "/reports",
            element: <AdminReports />,
          },
          {
            path: "/resources",
            element: <AdminResources />,
          },
          {
            path: "/knowledge",
            element: <AdminKnowledge />,
          },
        ]
      }
    ],
  },
]);

export default router;