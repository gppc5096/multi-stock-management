import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Registration from "./pages/Registration";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#d9ccba' }}>
            <Navbar />
            <main className="pt-4 flex-1">
              <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;