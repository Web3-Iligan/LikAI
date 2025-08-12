import { LayoutWrapper } from "@/components/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

// Root layout component with shared UI
function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <LayoutWrapper>
        <Outlet /> {/* This will render the matched child route */}
      </LayoutWrapper>
      <Toaster />
    </div>
  );
}

export default App;
