import { AppContent } from "./components/app-content";
import { Toaster } from "./components/ui/sonner";
import Context from "./lib/context";

function App() {
  return (
    <div className="h-screen w-screen relative bg-app-background flex justify-center items-center">
      <Context>
        <AppContent />
        <Toaster className="font-jetbrains-mono" />
      </Context>
    </div>
  );
}

export default App;
