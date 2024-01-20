import { AppContent } from "./components/app-content";
import AppDrawerContent from "./components/app-drawer-content";
import { Drawer } from "./components/ui/drawer";

function App() {
  return (
    <div className="h-screen w-screen relative bg-app-background flex justify-center items-center">
      <Drawer>
        <AppContent />
        <AppDrawerContent />
      </Drawer>
    </div>
  );
}

export default App;
