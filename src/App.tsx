import { AppContent } from "./components/app-content";
import AppDrawerContent from "./components/app-drawer-content";
import { Drawer } from "./components/ui/drawer";
import Context from "./lib/context";

function App() {
  return (
    <div className="h-screen w-screen relative bg-app-background flex justify-center items-center">
      <Context>
        <Drawer>
          <AppContent />
          <AppDrawerContent />
        </Drawer>
      </Context>
    </div>
  );
}

export default App;
