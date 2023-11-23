import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminCategories from "../admin-panel/categories/AdminCategories";
import { Login } from "../admin-panel/login/AdminLogin";
import ParentCategories from "../admin-panel/categories/ParentCategories";
import AddAttributes from "../admin-panel/categories/AddAttributes";
import SubCategories from "../admin-panel/categories/SubCategories";
import ChildCategories from "../admin-panel/categories/ChildCategories";
import SideBar from "../admin-panel/SideBar";
import Layout from "./Layout";
import ApproveSellerList from "../admin-panel/approve-sellerlist/ApproveSellerList";
import SellerVerification from "../admin-panel/seller-verification/SellerVerification";
import AllProduct from "../admin-panel/all-product-list/AllProduct";
import ReviewProduct from "../admin-panel/review-product/ReviewProduct";
import ApproveProduct from "../admin-panel/approve-product/ApproveProduct";
import AddChildAttribute from "../admin-panel/categories/AddChildAttribute";
import AwardList from "../admin-panel/award-list/AwardList";
import CountryList from "../admin-panel/country-list/CountryList";
import Orders from "../admin-panel/orders/Orders";
import Coupons from "../admin-panel/coupons/Coupons";
import Sellerdetails from "../admin-panel/approve-sellerlist/Sellerdetails";
import Error from "../admin-panel/Error";
import { Dashboard } from "../admin-panel/dashboard/Dashboard";
import Customers from "../admin-panel/customers/Customers";
import CustomersDetails from "../admin-panel/customers/CustomersDetails";
// Cms Section
import FaqSection from "../admin-panel/cms/FaqSection";
import Privacy from "../admin-panel/cms/Privacy";
import Terms from "../admin-panel/cms/Terms";
import Refund from "../admin-panel/cms/Refund";
import { Brands } from "../admin-panel/brands/Brands";
import ManageGst from "../admin-panel/gst/ManageGst";
import Preview from "../admin-panel/cms/content-manager/preview/Preview";
import ReviewRating from "../admin-panel/review-rating/ReviewRating";
import Banners from "../admin-panel/starup-cms/Banners";
//Manage staff
import CategoryHeadDashboard from "../managerdashboard/ch/CategoryHeadDashboard";
import CategoryHeadAssignSeller from "../managerdashboard/ch/CategoryHeadAssignSeller";
import AssociateSellerWithCm from "../managerdashboard/ch/AssociateSellerWithCm";
import ManagerDashboard from "../managerdashboard/cm/ManagerDashboard";
import { CategoryManagerLogin } from "../admin-panel/login/CategoryManagerLogin";
import ManageStaff from "../admin-panel/manage-staff/ManageStaff";
import ManageRoles from "../admin-panel/manage-staff/ManageRoles";
import SignupForm from "../managerdashboard/cm/SellerOnboard";
import DesignationList from "../admin-panel/manage-staff/DesignationList";
import B2bVerification from "../admin-panel/b2b/B2bVerification";
import Profile from "../managerdashboard/cm/Profile";
import QAADashboard from "../managerdashboard/qaa/QA";
import QaProfile from "../managerdashboard/qaa/QaProfile";
import PendingSeller from "../managerdashboard/qaa/PendingSeller";
import ChProfile from "../managerdashboard/ch/Chprofile";
import Qapassword from "../managerdashboard/qaa/Qapassword";
import DeclinedSeller from "../managerdashboard/cm/DeclinedSeller";
import CmPassword from "../managerdashboard/cm/Cmpassword";
import DeclineSellers from "../managerdashboard/qaa/DeclineSeller";
import MMDash from "../managerdashboard/mm/MMdash";
import MHDash from "../managerdashboard/mh/MHdash";
import ChPassword from "../managerdashboard/ch/Chpassword";
const PreserveLocation = ({ children }) => {
  const location = useLocation();
  return children(location);
};
const MainRoutes = () => {
  const handleLogout = () => {
    localStorage.setItem("isLogin", false);
    window.location.href = "/";
  };
  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      let storedIsLogin = localStorage.getItem("isLogin");
      if (!storedIsLogin) {
        navigate("/");
      }
      setIsLogin(storedIsLogin);
    }, [navigate]);
    return (
      isLogin && (
        <Layout
          sidebar={<SideBar />}
          content={<Element />}
          handleLogout={handleLogout}
        />
      )
    );
  };
  return (
    <Router>
      <PreserveLocation>
        {(location) => (
          <Routes location={location}>
            <Route path="/" element={<Login />} />
            <Route
              path="/manage-staff"
              element={<ProtectedRoute element={ManageStaff} />}
            />
            <Route path="/stafflogin" element={<CategoryManagerLogin />} />
            <Route path="/onboard-seller" element={<SignupForm />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={Dashboard} />}
            />
            <Route
              path="/category"
              element={<ProtectedRoute element={AdminCategories} />}
            />
            <Route
              path="/category/parentcategory"
              element={<ProtectedRoute element={ParentCategories} />}
            />
            <Route
              path="/category/subcategory"
              element={<ProtectedRoute element={SubCategories} />}
            />
            <Route
              path="/category/childcategory"
              element={<ProtectedRoute element={ChildCategories} />}
            />
            <Route
              path="/category/attributes"
              element={<ProtectedRoute element={AddAttributes} />}
            />
            <Route
              path="/seller/sellerlist"
              element={<ProtectedRoute element={ApproveSellerList} />}
            />
            <Route
              path="/seller/sellerverification"
              element={<ProtectedRoute element={SellerVerification} />}
            />
            <Route
              path="/allproduct"
              element={<ProtectedRoute element={AllProduct} />}
            />
            <Route
              path="/reviewproduct"
              element={<ProtectedRoute element={ReviewProduct} />}
            />
            <Route
              path="/approveproduct"
              element={<ProtectedRoute element={ApproveProduct} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={Orders} />}
            />
            <Route
              path="/category/:attribute"
              element={<ProtectedRoute element={AddChildAttribute} />}
            />
            <Route
              path="/awardlist"
              element={<ProtectedRoute element={AwardList} />}
            />
            <Route
              path="/countrylist"
              element={<ProtectedRoute element={CountryList} />}
            />
            <Route
              path="/coupons"
              element={<ProtectedRoute element={Coupons} />}
            />
            <Route
              path="/customers"
              element={<ProtectedRoute element={Customers} />}
            />
            <Route
              path="/customers/:id"
              element={<ProtectedRoute element={CustomersDetails} />}
            />
            <Route
              path="/sellerdetails/:id"
              element={<ProtectedRoute element={Sellerdetails} />}
            />
            <Route path="*" element={<Error />} />
            {/* //Cms Section */}
            <Route
              path="/cms/faqs"
              element={<ProtectedRoute element={FaqSection} />}
            />
            <Route
              path="/cms/privacy-policy"
              element={<ProtectedRoute element={Privacy} />}
            />
            <Route
              path="/cms/terms-conditions"
              element={<ProtectedRoute element={Terms} />}
            />
            <Route
              path="/cms/refunds-cancellations"
              element={<ProtectedRoute element={Refund} />}
            />
            <Route
              path="/brands"
              element={<ProtectedRoute element={Brands} />}
            />
            <Route
              path="/b2buser"
              element={<ProtectedRoute element={B2bVerification} />}
            />
            {/* A + content manager preview */}
            <Route
              path="/preview-content-manager"
              element={<ProtectedRoute element={Preview} />}
            />
            <Route
              path="/ManageGst"
              element={<ProtectedRoute element={ManageGst} />}
            />
            {/* // Review Rationg */}
            <Route
              path="/review-rating"
              element={<ProtectedRoute element={ReviewRating} />}
            />
            {/* startup banner */}
            <Route
              path="/startup-cms"
              element={<ProtectedRoute element={Banners} />}
            />
            {/* Manage Staff */}
            <Route
              path="/category-manager-dashboard"
              element={<ManagerDashboard />}
            />
            <Route
              path="/category-head-dashboard"
              element={<CategoryHeadDashboard />}
            />

            <Route
              path="/category-head-dashboard/associate-seller/:id"
              element={<AssociateSellerWithCm />}
            />
              <Route
              path="/category-head-profile"
              element={<ChProfile/>}
            />
                 <Route
              path="/category-head-password-change"
              element={<ChPassword/>}
            />

            <Route
              path="/category-head-assign-seller"
              element={<CategoryHeadAssignSeller />}
            />
            <Route path="/qaapprover-dashboard" element={<QAADashboard />} />
            <Route path="/CM-Info" element={<Profile />} />
            <Route path="/declined-seller" element={<DeclinedSeller/>} />
            <Route path="/CM-change-password" element={<CmPassword/>} />
            <Route
              path="/manage-roles"
              element={<ProtectedRoute element={ManageRoles} />}
            />
            <Route
              path="/designation-list"
              element={<ProtectedRoute element={DesignationList} />}
            />
            <Route
              path="/qa-profile"
              element={<QaProfile/>}
            />
            <Route
              path="/pending-seller"
              element={<PendingSeller/>}
            />
            <Route
              path="/decline-seller"
              element={<DeclineSellers/>}
            />
            <Route
              path="/change-password"
              element={<Qapassword/>}
            />
            <Route
              path="/mm-dashboard"
              element={<MMDash/>}
            />
            <Route
              path="/mh-dashboard"
              element={<MHDash/>}
            />
          </Routes>
        )}
      </PreserveLocation>
    </Router>
  );
};
export default MainRoutes;