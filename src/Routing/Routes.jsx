import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AdminCategories from '../admin-panel/categories/AdminCategories';
import { Login } from '../admin-panel/login/AdminLogin';
import ParentCategories from '../admin-panel/categories/ParentCategories';
import AddAttributes from '../admin-panel/categories/AddAttributes';
import SubCategories from '../admin-panel/categories/SubCategories';
import ChildCategories from '../admin-panel/categories/ChildCategories';
import SideBar from '../admin-panel/SideBar';
import Layout from './Layout';
import ApproveSellerList from '../admin-panel/approve-sellerlist/ApproveSellerList';
import SellerVerification from '../admin-panel/seller-verification/SellerVerification';
import AllProduct from '../admin-panel/all-product-list/AllProduct';
import ReviewProduct from '../admin-panel/review-product/ReviewProduct';
import ApproveProduct from '../admin-panel/approve-product/ApproveProduct';
import AddChildAttribute from '../admin-panel/categories/AddChildAttribute';
import AwardList from '../admin-panel/award-list/AwardList';
import CountryList from '../admin-panel/country-list/CountryList';
import Orders from '../admin-panel/orders/Orders';
import Coupons from '../admin-panel/coupons/Coupons';
import Sellerdetails from '../admin-panel/approve-sellerlist/Sellerdetails';
import Error from '../admin-panel/Error';
import { Dashboard } from '../admin-panel/dashboard/Dashboard';
import Customers from '../admin-panel/customers/Customers';
import CustomersDetails from '../admin-panel/customers/CustomersDetails';

// Cms Section
import FaqSection from '../admin-panel/cms/FaqSection';
import Privacy from '../admin-panel/cms/Privacy';
import Terms from '../admin-panel/cms/Terms';
import Refund from '../admin-panel/cms/Refund';
import { Brands } from '../admin-panel/brands/Brands';

import ManageGst from '../admin-panel/gst/ManageGst';

import Preview from '../admin-panel/cms/content-manager/preview/Preview';

import ReviewRating from '../admin-panel/review-rating/ReviewRating';

import Banners from '../admin-panel/starup-cms/Banners';

import ManagerDashboard from '../managerdashboard/ManagerDashboard'
import { CategoryManagerLogin } from '../admin-panel/login/CategoryManagerLogin';
import ManageStaff from '../admin-panel/manage-staff/ManageStaff';
import ManageRoles from '../admin-panel/manage-staff/ManageRoles';
import SignupForm from '../admin-panel/seller-signup/SellerOnboard';
import DesignationList from '../admin-panel/manage-staff/DesignationList';
import B2bVerification from '../admin-panel/b2b/B2bVerification';


const PreserveLocation = ({ children }) => {
  const location = useLocation();
  return children(location);
};

const MainRoutes = () => {
  const handleLogout = () => {
    localStorage.setItem('isLogin', false);
    window.location.href = '/';
  };

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
      let storedIsLogin = localStorage.getItem('isLogin');
      if (!storedIsLogin) {
        navigate("/")
      }
      setIsLogin(storedIsLogin);
    }, [navigate]);
    return isLogin && (
      <Layout sidebar={<SideBar />} content={<Element />} handleLogout={handleLogout} />
    )
  };

  return (
    <Router>
      <PreserveLocation>
        {(location) => (
          <Routes location={location}>
            <Route path="/" element={<Login />} />
            <Route path="/manage-staff"  element={<ProtectedRoute element={ManageStaff} />} />
            <Route path="/stafflogin" element={<CategoryManagerLogin />} />
            <Route path="/onboard-seller" element={<SignupForm />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/category" element={<ProtectedRoute element={AdminCategories} />} />
            <Route path="/category/parentcategory" element={<ProtectedRoute element={ParentCategories} />} />
            <Route path="/category/subcategory" element={<ProtectedRoute element={SubCategories} />} />
            <Route path="/category/childcategory" element={<ProtectedRoute element={ChildCategories} />} />
            <Route path="/category/attributes" element={<ProtectedRoute element={AddAttributes} />} />
            <Route path="/seller/sellerlist" element={<ProtectedRoute element={ApproveSellerList} />} />
            <Route path="/seller/sellerverification" element={<ProtectedRoute element={SellerVerification} />} />
            <Route path="/allproduct" element={<ProtectedRoute element={AllProduct} />} />
            <Route path="/reviewproduct" element={<ProtectedRoute element={ReviewProduct} />} />
            <Route path="/approveproduct" element={<ProtectedRoute element={ApproveProduct} />} />
            <Route path="/orders" element={<ProtectedRoute element={Orders} />} />
            <Route path="/category/:attribute" element={<ProtectedRoute element={AddChildAttribute} />} />
            <Route path="/awardlist" element={<ProtectedRoute element={AwardList} />} />
            <Route path="/countrylist" element={<ProtectedRoute element={CountryList} />} />
            <Route path="/coupons" element={<ProtectedRoute element={Coupons} />} />
            <Route path="/customers" element={<ProtectedRoute element={Customers} />} />
            <Route path="/customers/:id" element={<ProtectedRoute element={CustomersDetails} />} />
            <Route path="/sellerdetails/:id" element={<ProtectedRoute element={Sellerdetails} />} />
            <Route path="*" element={<Error />} />
            {/* //Cms Section */}
            <Route path="/cms/faqs" element={<ProtectedRoute element={FaqSection} />} />
            <Route path="/cms/privacy-policy" element={<ProtectedRoute element={Privacy} />} />
            <Route path="/cms/terms-conditions" element={<ProtectedRoute element={Terms} />} />
            <Route path="/cms/refunds-cancellations" element={<ProtectedRoute element={Refund} />} />
            <Route path="/brands" element={<ProtectedRoute element={Brands} />} />

            {/* A + content manager preview */}
            <Route path='/preview-content-manager' element={<ProtectedRoute element={Preview} />} />

            <Route path='/ManageGst' element={<ProtectedRoute element={ManageGst} />} />

            {/* // Review Rationg */}
            <Route path="/review-rating" element={<ProtectedRoute element={ReviewRating} />} />

            {/* startup banner */}
            <Route path="/startup-cms" element={<ProtectedRoute element={Banners} />} />
            {/* Category Manager */}
            <Route path="/ManagerDashboard" element={<ManagerDashboard/>} />
            <Route path="/manage-roles" element={<ProtectedRoute element={ManageRoles} />} />
            <Route path="/designation-list" element={<ProtectedRoute element={DesignationList} />} />
            <Route path="/b2buser" element={<ProtectedRoute element={B2bVerification} />} />
          </Routes>
        )}
      </PreserveLocation>
    </Router>
  );
};

export default MainRoutes;
