import { BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/profile/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import ContactUs from './pages/ContactUs'
import Service from './pages/Service'
import Footer from './components/Footer'
import { ToastContainer, toast } from "react-toastify";
import UserList from './pages/profile/UserList';
import ShowPost from './pages/ShowPost'
import Amenities from './pages/post listing/Amenities'
import PropertyDetail from './pages/post listing/PropertyDetail'
import CreateAccount from './pages/post listing/CreateAccount'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import SearchBar from './pages/SearchBar'
import Mortagage_Calc from './pages/Loan calc/Mortgage_Calc'
import Affordability_Calc from './pages/Loan calc/Affordability_Calc'
import LoanForm from './pages/Loan Approval/LoanForm'
import Property from './pages/admin/Property'
import AdminDashboard from './pages/admin/AdminDashboard'
import ListingItem1 from './components/ListingItem1'
import Wishlist from './pages/profile/Wishlist/Wishlist'
import PredictorForm from './loan-predictor/PredictorForm'
import User from './pages/admin/User'
import UserEdit from './pages/admin/UserEdit'
import DetailProperty from './pages/admin/DetailProperty'
import APropertyDetail from './pages/admin/post-property/ApropertyDetail'
import AAmenities from './pages/admin/post-property/AAmenities'
import Home1 from './pages/payment/Home1'
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import LoanHistory from './pages/profile/LoanHistory'
import HomeLoan from './pages/admin/HomeLoan'
import LoanPage from './pages/profile/LoanPage'
import LoanDetail from './pages/admin/LoanDetail'
import Payment from './pages/admin/Payment'
import NotificationPage from './pages/admin/NotificationPage'
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";


function App() {
  // const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>

          <Routes>
          <Route path="/admin/*" element={<AdminLayout />}/>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

function AdminLayout() {
  return (
    <>

      <Routes>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/property" element={<Property/>}/>
        <Route path="/user-edit/:userId" element={<UserEdit/>}/>
        <Route path="/detail-property/:propertyId" element={<DetailProperty/>}/>
        <Route path="/post-listing/property-detail" element={<APropertyDetail/>}/>
        <Route path="/home-loan" element={<HomeLoan/>}/>
        <Route path ="/loan-detail/:loanId" element={<LoanDetail/>}/>
        <Route path = "/post-listing/update-property/:propertyId" element={<AAmenities/>} />
        <Route path ="/payment" element={<Payment/>} />
        <Route path="/notification" element={<NotificationPage/> } />
      </Routes>
   
    </>
  )
}

function DefaultLayout() {
  return (
    <>
      <Header />
      <Routes>
        
      <Route path = "/sign-in" element={<SignIn />}/>
      <Route path = "/sign-up" element={<SignUp />}/>
      <Route path = "/forget-password" element={<ForgetPassword/>}/>
      <Route path = "/reset-password" element={<ResetPassword/>}/>
      <Route path= "/payment-home" element={<Home1/> } />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      
      <Route path = "/loan-predictor" element={<PredictorForm/>}/>

      <Route path = "/about" element={<About />}/>
      <Route path = "/contact" element={<ContactUs />}/>
      <Route path = "/services" element={<Service />}/>
      <Route path = "/search-bar" element={<SearchBar />}/>

      <Route path = "/listing/:listingId" element={<Listing />}/>
      
      <Route path = "/mortgage-loan-calculator" element={<Mortagage_Calc/>}/>
      <Route path = "/affordability-loan-calculator" element={<Affordability_Calc/>}/>
 
      <Route element={<PrivateRoute/>}>
      <Route path = "/" element={<Home /> }/>
      <Route path = "/profile" element={<Profile />}/>
       {/* loan approval */}
       <Route path = "/property/:propertyId" element={<ShowPost/>}/>
       <Route element={<ListingItem1/>}/>
       <Route path = "/loan-form" element={<LoanForm/>}/>
    
      <Route path = "/profile/saved-home" element={<Wishlist/>}/>
      <Route path = "/profile/show-userList" element={<UserList/>}/>
      <Route path = "/profile/create-listing" element={<CreateListing/>}/>
      <Route path = "/profile/show-loan" element={<LoanHistory/>}/>
      <Route path = "/profile/loan-detail/:loanId" element={<LoanPage/>}/>

      <Route path = "/update-listing/:listingId" element={<UpdateListing/>}/>
      <Route path = "/post-listing/create-listing" element={<CreateListing/>}/>
      <Route path = "/post-listing/create-account" element={<CreateAccount/>}/>
      <Route path = "/post-listing/property-detail" element={<PropertyDetail/>}/>
      <Route path = "/post-listing/update-property/:propertyId" element={<Amenities/>} />
      </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
