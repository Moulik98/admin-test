import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../hook/getToken";

export const Blocks = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getToken(); // Replace with your actual access token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`,
          {
            headers: headers,
          }
        );

        const data = await response.json();
        setOrderData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/v1/categories/get/count`);
        if (response.ok) {
          const jsonData = await response.json();
          setTopCategories(jsonData);
        } else {
          console.error("Failed to fetch data from the API.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      
        <div className="flex space-x-4">
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-white hover:bg-blue-100 border border-blue-300 rounded-md hover:shadow-2xl shadow-lg">
          <Link to='/b2buser' className="text-lg">B2B user</Link>
            <div className="flex gap-2">
              <p className="text-xl font-bold">{orderData.b2b_active_count}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-black"
                viewBox="0 0 43 43"
              >
                <path
                  d="M29.8243 12.6372L32.4043 15.2172L23.661 23.9605L17.7664 18.0659C17.0676 17.3672 15.9389 17.3672 15.2401 18.0659L4.49013 28.8338C3.79138 29.5326 3.79138 30.6613 4.49013 31.3601C5.18888 32.0588 6.31763 32.0588 7.01638 31.3601L16.4943 21.8643L22.3889 27.7588C23.0876 28.4576 24.2164 28.4576 24.9151 27.7588L34.9305 17.7613L37.5105 20.3413C38.066 20.8968 39.0335 20.5026 39.0335 19.7143V12.0101C39.0514 11.5084 38.6572 11.1143 38.1555 11.1143H30.4693C29.663 11.1143 29.2689 12.0818 29.8243 12.6372Z"
                  fill="505F6C"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-white hover:bg-blue-100 border border-blue-300 rounded-md hover:shadow-2xl shadow-lg">
            <Link to='/category' className="text-lg">Categories</Link>{" "}
            <div className="flex gap-2">
            <p className="text-xl font-bold">{topCategories?.child}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-black"
                viewBox="0 0 43 43"
              >
                <path
                  d="M29.8243 12.6372L32.4043 15.2172L23.661 23.9605L17.7664 18.0659C17.0676 17.3672 15.9389 17.3672 15.2401 18.0659L4.49013 28.8338C3.79138 29.5326 3.79138 30.6613 4.49013 31.3601C5.18888 32.0588 6.31763 32.0588 7.01638 31.3601L16.4943 21.8643L22.3889 27.7588C23.0876 28.4576 24.2164 28.4576 24.9151 27.7588L34.9305 17.7613L37.5105 20.3413C38.066 20.8968 39.0335 20.5026 39.0335 19.7143V12.0101C39.0514 11.5084 38.6572 11.1143 38.1555 11.1143H30.4693C29.663 11.1143 29.2689 12.0818 29.8243 12.6372Z"
                  fill="505F6C"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-white hover:bg-blue-100 border border-blue-300 rounded-md hover:shadow-2xl shadow-lg">
          <Link to='/seller/sellerlist' className="text-lg">Sellers</Link>{" "}
            <div className="flex gap-2">
              <p className="text-xl font-bold">{orderData.seller_count}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-black"
                viewBox="0 0 43 43"
              >
                <path
                  d="M29.8243 12.6372L32.4043 15.2172L23.661 23.9605L17.7664 18.0659C17.0676 17.3672 15.9389 17.3672 15.2401 18.0659L4.49013 28.8338C3.79138 29.5326 3.79138 30.6613 4.49013 31.3601C5.18888 32.0588 6.31763 32.0588 7.01638 31.3601L16.4943 21.8643L22.3889 27.7588C23.0876 28.4576 24.2164 28.4576 24.9151 27.7588L34.9305 17.7613L37.5105 20.3413C38.066 20.8968 39.0335 20.5026 39.0335 19.7143V12.0101C39.0514 11.5084 38.6572 11.1143 38.1555 11.1143H30.4693C29.663 11.1143 29.2689 12.0818 29.8243 12.6372Z"
                  fill="505F6C"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-white hover:bg-blue-100 border border-blue-300 rounded-md hover:shadow-2xl shadow-lg">
            <Link to='/coupons' className="text-lg">Coupons</Link>{" "}
            <div className="flex gap-2">
              <p className="text-xl font-bold">{orderData?.coupon_count}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-black"
                viewBox="0 0 43 43"
              >
                <path
                  d="M29.8243 12.6372L32.4043 15.2172L23.661 23.9605L17.7664 18.0659C17.0676 17.3672 15.9389 17.3672 15.2401 18.0659L4.49013 28.8338C3.79138 29.5326 3.79138 30.6613 4.49013 31.3601C5.18888 32.0588 6.31763 32.0588 7.01638 31.3601L16.4943 21.8643L22.3889 27.7588C23.0876 28.4576 24.2164 28.4576 24.9151 27.7588L34.9305 17.7613L37.5105 20.3413C38.066 20.8968 39.0335 20.5026 39.0335 19.7143V12.0101C39.0514 11.5084 38.6572 11.1143 38.1555 11.1143H30.4693C29.663 11.1143 29.2689 12.0818 29.8243 12.6372Z"
                  fill="505F6C"
                />
              </svg>
            </div>
          </div>
          {/* You can add more statistics here */}
        </div>
    </div>
  );
};
