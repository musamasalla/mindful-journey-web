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
const Meditations = lazy(() => import('./pages/meditations'))
const Journal = lazy(() => import('./pages/journal'))
const MoodTracker = lazy(() => import('./pages/mood-tracker'))
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
        <Route path="/meditations" element={
          <Suspense fallback={<LoadingPage />}>
            <Meditations />
          </Suspense>
        } />
        <Route path="/journal" element={
          <Suspense fallback={<LoadingPage />}>
            <Journal />
          </Suspense>
        } />
        <Route path="/mood-tracker" element={
          <Suspense fallback={<LoadingPage />}>
            <MoodTracker />
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