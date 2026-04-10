import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Lazy load pages for code splitting & better performance
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Destinations = lazy(() => import('@/pages/Destinations'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Tips = lazy(() => import('@/pages/Tips'));
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const Gastronomia = lazy(() => import('@/pages/Gastronomia'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="wp-shell flex items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-700 dark:border-primary-900 dark:border-t-sun-400 rounded-full animate-spin" />
        <p className="text-ink-600 dark:text-slate-300 text-sm font-medium">Cargando...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Profile without Navbar/Footer */}
            <Route path="/profile" element={<Profile />} />

            {/* All other routes with shared layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/gastronomia" element={<Gastronomia />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
