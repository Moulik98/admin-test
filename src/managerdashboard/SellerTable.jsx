const SellerTable = ({ sellers }) => {
  console.log("Onboarded Sellers :", sellers);

  return (
    <div>
      {/* Table Section */}
      <div className="relative mx-5 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
            <tr>
              <th scope="col" className="px-2 py-3">
                Seller Onboarded
              </th>
              <th scope="col" className="px-2 py-3">
                Business Type{" "}
              </th>
              <th scope="col" className="px-2 py-3">
                Store Name
              </th>
              <th scope="col" className="px-2 py-3">
                Email
              </th>
             
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sellers) &&
              sellers?.map((item) => (
                <tr key={item._id}>
                  <td className="px-2 py-3">{item?.fullname}</td>
                  <td className="px-2 py-3">{item?.sellerType}</td>
                  <td className="px-2 py-3">{item?.store_name}</td>
                  <td className="px-2 py-3">{item?.email}</td>
                  <td className="px-2 py-3">
                    <a href="/auth/login">
                      <img className="w-6 h-6" src='./assets/shop.svg' alt="" />
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
