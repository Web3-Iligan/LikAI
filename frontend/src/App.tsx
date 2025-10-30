import { LayoutWrapper } from "@/components/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import React from "react";
import { useAuth } from "./hooks/use-auth";

console.log("Environment variables check:");
console.log("DFX_NETWORK:", import.meta.env.DFX_NETWORK);
console.log(
  "CANISTER_ID_INTERNET_IDENTITY:",
  import.meta.env.CANISTER_ID_INTERNET_IDENTITY
);

// Root layout component with shared UI
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen font-sans antialiased">
        <LayoutWrapper>
          <Outlet /> {/* This will render the matched child route */}
        </LayoutWrapper>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <>{children}</>;
}

export function ProtectedOutlet() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default App;
