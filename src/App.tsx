import "./App.css";
import { Header } from "./components/header";
import { TaskContent } from "./components/content";
import { AlertModal } from "./components/alertModal/alertModal";
import { CreateModal } from "./components/alertModal/createModal";
import { ModalProvider } from "./components/contextAPI";
function App() {
  return (
    <ModalProvider>
      <div className="app flex items-center h-screen w-full justify-center">
        <div className="app-container w-3/5 border-2 rounded-3xl max-[600px]:w-[85%]">
          <Header />
          <TaskContent />
          <AlertModal />
          <CreateModal />
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
