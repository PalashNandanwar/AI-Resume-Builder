import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SingInPage from './auth/Sign_In/index/SingInPage.jsx'
import Home from './Home/Home.jsx'
import DashBoard from './dashboard/DashBoard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/EditResume.jsx'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import ViewResume from './my-resume/[resume-id]/view/ViewResume.jsx'
// import ColorModeSwitcher from './ColorModeSwitcher.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/Sign_In',
    element: <SingInPage />
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      {/* <ColorModeSwitcher /> */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
