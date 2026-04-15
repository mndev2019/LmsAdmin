
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Dashboard from './Pages/Dashboard'
import CreateCourse from './Pages/Courses/CreateCourse'
import ViewCourse from './Pages/Courses/ViewCourse'
import Packages from './Pages/Packages/Packages'
import PackageBuilder from './Pages/Packages/PackageBuilder'
import Webinars from './Pages/Webinars/Webinars'
import CreateWebinar from './Pages/Webinars/CreateWebinar'
import DigitalProduct from './Pages/DigitalProduct/DigitalProduct'
import ShowProduct from './Pages/DigitalProduct/ShowProduct'
import Learners from './Pages/User/Learners/Learners'
import LearnerDetails from './Pages/User/Learners/LearnersDetails'
import  {Instructors} from './Pages/User/Instructor/Instructor'
import Leads from './Pages/User/Leads/Leads'
import Overview from './Pages/Reports/Overview'
import Transactions from './Pages/Reports/Transactions'
import Settlements from './Pages/Reports/Settlements'
import WebinarReport from './Pages/Reports/WebinarReport'
import Register from './Auth/Register'
import Login from './Auth/Login'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CourseDetails from './Pages/Courses/CourseDetails'
import PackageDetails from './Pages/Packages/PackageDetails'
import WebinarDetails from './Pages/Webinars/WebinarDetails'
import WhatsappCommunity from './Pages/WhatsappCommunity/WhatsappCommunity'
import CreateWhatsappCommunity from './Pages/WhatsappCommunity/CreateWhatsappCommunity'
import InstructorDashboard from './Pages/InstructorDashboard'









function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/instructor-dashboard' element={<InstructorDashboard/>}/>
          <Route path='/create-course' element={<CreateCourse />} />
       
          <Route path="/create-course/:id" element={<CreateCourse />} />
          <Route path='/courses' element={<ViewCourse />} />
      
          <Route path="/course/:id" element={<CourseDetails />} />
         
          
          <Route path='/packages' element={<Packages />} />
          <Route path="/packages-builder" element={<PackageBuilder />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/create-webinar" element={<CreateWebinar />} />
          <Route path="/edit-webinar/:id" element={<CreateWebinar />} />
          <Route path="/webinar/:id" element={<WebinarDetails />} />
          <Route path='/create-product' element={<DigitalProduct />} />
          <Route path='/digital-product' element={<ShowProduct />} />
          <Route path='/whatsapp-community' element={<WhatsappCommunity />} />
          <Route path='/create-community' element={<CreateWhatsappCommunity />} />

          {/* users */}
          <Route path='/learners' element={<Learners />} />
          <Route path='/learners-detail' element={<LearnerDetails />} />
          <Route path='/instructors' element={<Instructors />} />
          <Route path='/leads' element={<Leads />} />

          {/* Report */}
          <Route path='/overview' element={<Overview />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/settlements' element={<Settlements />} />
          <Route path='/webinar-report' element={<WebinarReport />} />



        </Route>


      </>
    )
  )

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
