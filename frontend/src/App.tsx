import "./App.css";
import { AppRouter } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="antialiased text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-slate-700">
      <AppRouter />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
