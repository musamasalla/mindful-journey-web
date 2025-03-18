import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Layouts
import RootLayout from './components/layouts/root-layout'
import DashboardLayout from './components/layouts/dashboard-layout'

// Eagerly loaded pages
import Home from './pages/home'
import NotFound from './pages/not-found'
import LoadingPage from './pages/loading'

// Lazily loaded pages
const Dashboard = lazy(() => import('./pages/dashboard'))
const TherapySession = lazy(() => import('./pages/therapy/session'))
const TherapySessions = lazy(() => import('./pages/therapy/sessions'))
const Journal = lazy(() => import('./pages/journal'))
const EmotionalWellness = lazy(() => import('./pages/emotional-wellness'))
const Resources = lazy(() => import('./pages/resources'))
const SignIn = lazy(() => import('./pages/auth/sign-in'))
const SignUp = lazy(() => import('./pages/auth/sign-up'))
const Profile = lazy(() => import('./pages/profile'))

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-in" element={
          <Suspense fallback={<LoadingPage />}>
            <SignIn />
          </Suspense>
        } />
        <Route path="/auth/sign-up" element={
          <Suspense fallback={<LoadingPage />}>
            <SignUp />
          </Suspense>
        } />
      </Route>
      
      {/* Protected routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
          <Suspense fallback={<LoadingPage />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/therapy" element={
          <Suspense fallback={<LoadingPage />}>
            <TherapySessions />
          </Suspense>
        } />
        <Route path="/therapy/session/:sessionId" element={
          <Suspense fallback={<LoadingPage />}>
            <TherapySession />
          </Suspense>
        } />
        <Route path="/journal" element={
          <Suspense fallback={<LoadingPage />}>
            <Journal />
          </Suspense>
        } />
        <Route path="/emotional-wellness" element={
          <Suspense fallback={<LoadingPage />}>
            <EmotionalWellness />
          </Suspense>
        } />
        <Route path="/resources" element={
          <Suspense fallback={<LoadingPage />}>
            <Resources />
          </Suspense>
        } />
        <Route path="/profile" element={
          <Suspense fallback={<LoadingPage />}>
            <Profile />
          </Suspense>
        } />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App