const Menus = [
    {
        title: "Dashboard",
        src: "dashborad",
        link: 'category',
    },
    {
        title: "Orders",
        src: "dashborad",
        link: 'orders',
    },
    {
        title: "Products",
        src: "dashborad",
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
        src: "Categories",
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
        src: "Categories",
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
        src: "dashborad",
        link: 'coupons',
    },
    {
        title: "Blog",
        src: "dashborad",
        link: 'category',
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
        src: "dashborad",
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
        link: '',
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
        link: 'category',
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
        link: '/category',
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
        link: 'category',
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
        src: "parent",
        link: 'countrylist',
    },
    {
        title: "Award List",
        src: "parent",
        link: 'awardlist',
    },



];
export default Menus;
