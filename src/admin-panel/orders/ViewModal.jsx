import React, { useState, useEffect } from "react";
import { getToken } from "../../hook/getToken";

const ViewModal = (props) => {
  const { visible, onClose, id } = props;
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const token = getToken();
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/order/viewOrder/admin/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOrderData(data.response[0]);
        console.log(data.response[0]);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [id]);

  if (visible && orderData)
    return (
      <div className="fixed inset-0 overflow-x-hidden overflow-y-scroll bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center my-auto">
        <div className="flex flex-col bg-white rounded-md max-w-screen-lg w-full">
          <div className="flex items-start justify-end px-4 py-2 border-b border-solid border-slate-200 rounded-t">
            <button
              className="text-2xl leading-none font-semibold hover:text-[#50C4D9] transition duration-300"
              type="button"
              onClick={() => onClose()}
            >
              x
            </button>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>

            <section className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Order Information</h2>
              <p>Total Price: {orderData.total_price}</p>
              <p>Order Status: {orderData.order_status}</p>
              <p>Expected Delivery From: {orderData.expected_delivery_from}</p>
              <p>Order Date: {orderData.order_date}</p>
            </section>

            <section className="mb-4">
              <h2 className="text-lg font-semibold mb-2">User Address</h2>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <h3 className="text-md font-semibold mb-1">Shipping Address</h3>
                  <p>Name: {orderData.shipping_address?.name}</p>
                  <p>Mobile: {orderData.shipping_address?.mobile}</p>
                  <p>
                    Address: {orderData.shipping_address?.house_address},{" "}
                    {orderData.shipping_address?.area_address},{" "}
                    {orderData.shipping_address?.city}, {orderData.shipping_address?.state},{" "}
                    {orderData.shipping_address?.country}
                  </p>
                </div>

                <div className="w-1/2 pl-2">
                  <h3 className="text-md font-semibold mb-1">Billing Address</h3>
                  <p>Name: {orderData.billing_address?.name}</p>
                  <p>Mobile: {orderData.billing_address?.mobile}</p>
                  <p>
                    Address: {orderData.billing_address?.house_address},{" "}
                    {orderData.billing_address?.area_address},{" "}
                    {orderData.billing_address?.city}, {orderData.billing_address?.state},{" "}
                    {orderData.billing_address?.country}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              {orderData.order_details.map((item, index) => (
                <div key={index} className="mb-2 border p-2 rounded-md flex items-center">
                  <img
                    src={item.main_img}
                    alt={item.item_name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="text-md font-semibold">{item.item_name}</p>
                    <p>Quantity: {item.order_qty}</p>
                    <p>Price: {item.list_price}</p>
                  </div>
                  {item.has_variations && (
                    <div className="ml-4">
                      <p className="text-md font-semibold mb-1">Variations:</p>
                      <p>{item.variation_name1}: {item.variation_value1}</p>
                      <p>{item.variation_name2}: {item.variation_value2}</p>
                    </div>
                  )}
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
              <p>Seller Name: {orderData.seller_name}</p>
              <p>Seller Email: {orderData.seller_email}</p>
            </section>
          </div>
        </div>
      </div>
    );

  return null;
};

export default ViewModal;
