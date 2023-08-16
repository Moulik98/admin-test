import dashboard from '../assets/dashboard.png'
import orders from '../assets/orders.png'
import product from '../assets/products.png'
import categories from '../assets/categories.png'
import seller from '../assets/seller.png'
import coupons from '../assets/coupons.png'
import blog from '../assets/blog.png'
import generalSetting from '../assets/general-setting.png'
import emailSetting from '../assets/email-settings.png'
import socialSetting from '../assets/social-settings.png'
import manageUser from '../assets/manage-user.png'
import homepageSetting from '../assets/homepage-setting.png'
import countryList from '../assets/country-list.png'
import awardList from '../assets/award-list.png'
const Menus = [
    {
        title: "Dashboard",
        src: dashboard,
        link: 'category',
    },
    {
        title: "Orders",
        src: orders,
        link: 'orders',
    },
    {
        title: "Products",
        src: product,
        link: 'allproduct',
        subMenus: [
            {
                title: 'All Product list',
                src: 'parent',
                link: '/allproduct'
            },
            {
                title: 'Review Product List',
                src: 'sub',
                link: '/reviewproduct'
            },
            {
                title: 'Approve Product List',
                src: 'child',
                link: '/approveproduct'
            },
            {
                title: 'Product Settings',
                src: 'child',
                link: 'approve-product'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Categories",
        src: categories,
        link: 'category',
        subMenus: [
            {
                title: 'Parent Categories',
                src: 'parent',
                link: '/category/parentcategory'
            },
            {
                title: 'Sub Categories',
                src: 'sub',
                link: '/category/subcategory'
            },
            {
                title: 'Child Categories',
                src: 'child',
                link: '/category/childcategory'
            },
            {
                title: 'Attribute',
                src: 'child',
                link: '/category/attributes'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Seller",
        src: seller,
        link: 'seller/sellerlist',
        subMenus: [
            {
                title: 'Seller List',
                src: 'parent',
                link: '/seller/sellerlist'
            },
            {
                title: 'Seller Verification',
                src: 'sub',
                link: '/seller/sellerverification'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Set Coupons",
        src: coupons,
        link: 'coupons',
    },
    {
        title: "Blog",
        src: "dashborad",
        link: 'blog',
        subMenus: [
            {
                title: 'Categories',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Post',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Blog Settings',
                src: 'sub',
                link: 'category'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "General Settings",
        src: generalSetting,
        link: 'dashboard',
        subMenus: [
            {
                title: 'Logo',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Fevicon',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Loader',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Pop-up Banner',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Error Banner',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Webisite Maintanance',
                src: 'sub',
                link: 'category'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Email Settings",
        src: "dashborad",
        link: 'email',
        subMenus: [
            {
                title: 'Email Template',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Email Configuration',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Group Email',
                src: 'sub',
                link: 'category'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Social Settings",
        src: "dashborad",
        link: 'social',
        subMenus: [
            {
                title: 'Social Links',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Facebook Login',
                src: 'sub',
                link: 'category'
            },
            {
                title: 'Google login',
                src: 'sub',
                link: 'category'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Manage User",
        src: "dashborad",
        link: 'user',
        subMenus: [
            {
                title: 'Manage Staff',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Manage Roles',
                src: 'sub',
                link: 'category'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Homepage Settings",
        src: "dashborad",
        link: 'homepage',
        subMenus: [
            {
                title: 'Templates',
                src: 'parent',
                link: 'category'
            },
            {
                title: 'Sections',
                src: 'sub',
                link: 'category'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Country List",
        src: countryList,
        link: 'countrylist',
    },
    {
        title: "Award List",
        src: awardList,
        link: 'awardlist',
    },



];
export default Menus;
