import dashboard from "../assets/dashboard.png";
import orders from "../assets/order.png";
import product from "../assets/product.png";
import categories from "../assets/category.png";
import seller from "../assets/seller.png";
import coupons from "../assets/coupon.png";
import blog from "../assets/blog.png";
import generalSetting from "../assets/settings.png";
import emailSetting from "../assets/email.png";
import socialSetting from "../assets/social.png";
import manageUser from "../assets/manage_user.png";
import homepageSetting from "../assets/homepage.png";
import countryList from "../assets/countries.png";
import awardList from "../assets/awards.png";
import gst from  "../assets/gst.svg"
const Menus = [
  {
    title: "Dashboard",
    src: dashboard,
    link: "dashboard",
  },
  {
    title: "Manage User",
    src: manageUser,
    link: "manage-user",
    subMenus: [
      {
        title: "Manage Staff",
        src: "parent",
        link: "/designation-list",
      },
      {
        title: "Manage Roles/Designation",
        src: "sub",
        link: "/manage-roles",
      },
   
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Orders",
    src: orders,
    link: "orders",
  },
  {
    title: "Categories",
    src: categories,
    link: "category",
    subMenus: [
      {
        title: "Parent Categories",
        src: "parent",
        link: "/category/parentcategory",
      },
      {
        title: "Sub Categories",
        src: "sub",
        link: "/category/subcategory",
      },
      {
        title: "Child Categories",
        src: "child",
        link: "/category/childcategory",
      },
      {
        title: "Attribute",
        src: "child",
        link: "/category/attributes",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Manage GST",
    src: gst,
    link: "ManageGst",
  },
  {
    title: "Brands",
    src: coupons,
    link: "brands",
  },
  {
    title: "Products",
    src: product,
    link: "allproduct",
    subMenus: [
      {
        title: "All Product list",
        src: "parent",
        link: "/allproduct",
      },
      {
        title: "Review Product List",
        src: "sub",
        link: "/reviewproduct",
      },
      {
        title: "Approve Product List",
        src: "child",
        link: "/approveproduct",
      },
      {
        title: "Product Settings",
        src: "child",
        link: "approve-product",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Seller",
    src: seller,
    link: "seller/sellerlist",
    subMenus: [
      {
        title: "Seller List",
        src: "parent",
        link: "/seller/sellerlist",
      },
      {
        title: "Seller Verification",
        src: "sub",
        link: "/seller/sellerverification",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Manage Pages",
    src: seller,
    link: "seller/sellerlist",
    subMenus: [
      {
        title: "Hot Deals",
        src: "parent",
        link: "/hot-deal",
      }
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "B2B User",
    src: seller,
    link: "b2buser",
    isOpen: false, // Add isOpen property
  },
  {
    title: "Distributor",
    src: seller,
    link: "distributorship",
    isOpen: false, // Add isOpen property
  },
  {
    title: "Customers",
    src: seller,
    link: "customers",
  },
  {
    title: "Set Coupons",
    src: coupons,
    link: "coupons",
  },
  {
    title: "Country List",
    src: countryList,
    link: "countrylist",
  },
  {
    title: "Award List",
    src: awardList,
    link: "awardlist",
  },
  {
    title: "Manage Cancellation",
    src: blog,
    link: "manage-cancellation",
  },
  {
    title: "General Settings",
    src: generalSetting,
    link: "general-setting",
    subMenus: [
      {
        title: "Logo",
        src: "parent",
        link: "category",
      },
      {
        title: "Fevicon",
        src: "sub",
        link: "category",
      },
      {
        title: "Loader",
        src: "sub",
        link: "category",
      },
      {
        title: "Pop-up Banner",
        src: "sub",
        link: "category",
      },
      {
        title: "Error Banner",
        src: "sub",
        link: "category",
      },
      {
        title: "Webisite Maintanance",
        src: "sub",
        link: "category",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Homepage Settings",
    src: homepageSetting,
    link: "homepage-setting",
    subMenus: [
      {
        title: "Templates",
        src: "parent",
        link: "category",
      },
      {
        title: "Sections",
        src: "sub",
        link: "category",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Email Settings",
    src: emailSetting,
    link: "email-setting",
    subMenus: [
      {
        title: "Email Template",
        src: "parent",
        link: "category",
      },
      {
        title: "Email Configuration",
        src: "sub",
        link: "category",
      },
      {
        title: "Group Email",
        src: "sub",
        link: "category",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Social Settings",
    src: socialSetting,
    link: "social-setting",
    subMenus: [
      {
        title: "Social Links",
        src: "parent",
        link: "category",
      },
      {
        title: "Facebook Login",
        src: "sub",
        link: "category",
      },
      {
        title: "Google login",
        src: "sub",
        link: "category",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Blog",
    src: blog,
    link: "blog",
    subMenus: [
      {
        title: "Categories",
        src: "parent",
        link: "category",
      },
      {
        title: "Post",
        src: "sub",
        link: "category",
      },
      {
        title: "Blog Settings",
        src: "sub",
        link: "category",
      },
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "CMS Section",
    src: blog,
    link: "cms/faq",
    subMenus: [
      {
        title: "Privacy Policy",
        src: "blog",
        link: "/cms/privacy-policy",
      },
      {
        title: "Terms & Conditions",
        src: "sub",
        link: "/cms/terms-conditions",
      },
      {
        title: "Refunds & cancellations",
        src: "sub",
        link: "/cms/refunds-cancellations",
      },
      {
        title: "FAQs",
        src: "sub",
        link: "/cms/faqs",
      }
    ],
    isOpen: false, // Add isOpen property
  },
  {
    title: "Ratings & Reviews",
    src: coupons,
    link: "review-rating",
  }
];
export default Menus;
