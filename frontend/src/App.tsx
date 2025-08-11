import { Outlet } from "react-router-dom"; // Outlet renders child routes

// This is the root layout component. You can add shared UI like navbars here.
function App() {
  return (
    <div className="min-h-screen">
      {/* Add any global header, footer, or layout here */}
      <Outlet /> {/* This will render the matched child route */}
    </div>
  );
}

export default App;
