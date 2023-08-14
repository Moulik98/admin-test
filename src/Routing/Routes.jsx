import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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

const PreserveLocation = ({ children }) => {
  const location = useLocation();
  return children(location);
};

const MainRoutes = () => {
  // const [isLogin, setIsLogin] = useState(false);
  
  // useEffect(() => {
  //   let storedIsLogin = localStorage.getItem('isLogin');
  //   setIsLogin(storedIsLogin);
  // }, []);

  // Clear authentication status from local storage on logout
  const handleLogout = () => {
    localStorage.setItem('isLogin', false);
    window.location.href = '/';
  };

  const ProtectedRoute = ({ element: Element, ...rest }) => {const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
      let storedIsLogin = localStorage.getItem('isLogin');
      if(!storedIsLogin){
        navigate("/")
      }
      setIsLogin(storedIsLogin);
    }, []);
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
            <Route path="/sellerdetails/:id" element={<ProtectedRoute element={Sellerdetails} />} />
            <Route path="*" element={<Error />} />

          </Routes>
        )}
      </PreserveLocation>
    </Router>
  );
};

export default MainRoutes;
