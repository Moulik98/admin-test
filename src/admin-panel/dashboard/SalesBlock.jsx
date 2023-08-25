import React, { useState, useEffect } from "react";

export const SalesBlock = () => {
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);

  useEffect(() => {
    // Fetch data for total sales amount from the API
    fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`)
      .then((response) => response.json())
      .then((data) => {
        // Set the total sales amount from the API response
        setTotalSalesAmount(data.total_sales_amount);
      })
      .catch((error) => {
        console.error("Error fetching total sales amount:", error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="bg-[#dff0ff] p-6 rounded-lg">
      <p className="text-xl text-left pb-2">Total Sales</p>
      <p className="text-2xl text-left font-bold">{totalSalesAmount}</p>
    </div>
  );
};
