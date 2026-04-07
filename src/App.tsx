import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import CalendarPage from './pages/CalendarPage';
import AIPage from './pages/AIPage';
import BetaPage from './pages/BetaPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import OllamaPage from './pages/OllamaPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import FAQPage from './pages/FAQPage';
import SecurityPage from './pages/SecurityPage';
import BlogPage from './pages/BlogPage';
import RoadmapPage from './pages/RoadmapPage';
import DocsPage from './pages/DocsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features/notes" element={<NotesPage />} />
          <Route path="/features/tasks" element={<TasksPage />} />
          <Route path="/features/projects" element={<ProjectsPage />} />
          <Route path="/features/calendar" element={<CalendarPage />} />
          <Route path="/features/ai" element={<AIPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ollama" element={<OllamaPage />} />
          <Route path="/beta" element={<BetaPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
