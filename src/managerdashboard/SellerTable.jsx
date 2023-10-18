import React from "react";


const SellerTable = () => {
  const dummyData = [
    {
      sellerId: 1,
      sellerName: "John Doe",
      businessType: "Business",
      storeName: "Doe Mart",
      icon:"/assets/store.svg"
    },
    {
      sellerId: 2,
      sellerName: "Jane Smith",
      businessType: "Startup",
      storeName: "Smith Superstore",
      icon:"/assets/store.svg"
    },
    {
        sellerId: 2,
        sellerName: "Rahul Smith",
        businessType: "Startup",
        storeName: "Smith Superstore",
        icon:"/assets/store.svg"
      },
      {
        sellerId: 2,
        sellerName: "Navin Smith",
        businessType: "Startup",
        storeName: "Smith Superstore",
        icon:"/assets/store.svg"
      },
    // Add more dummy data as needed
  ];
  return (
    <div>
      {/* Table Section */}
      <div className="relative mx-5 overflow-hidden">
        <table class="w-full text-left text-xs">
          <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
            <tr>
              <th scope="col" class="px-2 py-3">
                Seller Id
              </th>
              <th scope="col" class="px-2 py-3">
                Seller Onboarded
              </th>

              <th scope="col" class="px-2 py-3">
                Business Type{" "}
              </th>

              <th scope="col" class="px-2 py-3">
                Store Name
              </th>
              <th scope="col" class="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.sellerId}>
                <td className="px-2 py-3">{item.sellerId}</td>
                <td className="px-2 py-3">{item.sellerName}</td>
                <td className="px-2 py-3">{item.businessType}</td>
                <td className="px-2 py-3">{item.storeName}</td>
                <td className="px-2 py-3">
                    <a href="/auth/login">
                  <img className="w-6 h-6" src={item.icon} alt="" />
                  </a> 
                  </td>
                  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTable;
