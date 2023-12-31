import React, { useEffect, useState } from "react";
import OrdersTableRow from "./OrdersTableRow";
import { User } from "../user/User";
import Pagination from "../../Pagination";
const status = [
    {
        fieldName: "order_status",
        name: "cancelled",
    },
    {
        fieldName: "order_status",
        name: "processing",
    },
    {
        fieldName: "order_status",
        name: "delivered",
    },
    {
        fieldName: "order_status",
        name: "shipped",
    },
    {
        fieldName: "payment_status",
        name: "paid",
    },
    {
        fieldName: "payment_status",
        name: "due",
    },
];
const Orders = () => {
    // when delete updata data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleDelete = () => {
        setIsClicked((preValue) => !preValue);
    };
    async function fetchOrderData(data) {
        // const access_token = localStorage.getItem('access_')
        let filterValues = data;
        console.log("filter-data", filterValues);
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(
                `${process.env.REACT_APP_URL}/v1/order/getAllOrders/admin?page=${currentPage}&limit=${pageSize}&sort_date=${dateOption}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(filterValues),
                }
            );

            const data = await response.json();
            console.log("response", data);
            setOrderList(data.data);
            setTotalItems(data.totalOrder);
            console.log("order-list-data", data);
        } catch (error) {
            console.log(error);
        }
    }

    // state for sorting
    const [dateOption, setDateOption] = useState({});
    const [amountOption, setAmmountOption] = useState({});
    // Add this function to handle date changes
    const handleDateChange = (e, dateType) => {
        setDateOption(e.target.value)
        const dateValue = e.target.value;
        const orderStatusFilter = dateValue === "asc" ? ["order_placed"] : [];
        const newFilterValues = {
            ...filterValues,
            [dateType]: dateValue,
            order_status: orderStatusFilter,
        };
        setFilterValues(newFilterValues);

        // Call the function to make the API request with updated filter values
        fetchOrderData(filterValues);
    };

    

    const handleDescChange = (e) => {
        setAmmountOption(e.target.value);
        const sortOrder = e.target.value;
        
        // If the selected value is "desc" (High), set the order status filter to exclude "order_placed"
        // For any other value (Low), set the order status filter to "order_placed"
        const orderStatusFilter = sortOrder === "desc" ? [] : ["order_placed"];
    
        fetchOrderData({ sort_amount: sortOrder, order_status: orderStatusFilter });
    };

    // state for filter
    const [filterValues, setFilterValues] = useState({
        order_status: [],
        payment_status: [],
    });

    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [name]: checked
                ? [...prevFilterValues[name], value]
                : prevFilterValues[name].filter((val) => val !== value),
        }));
    };

    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        // Call the function to make the POST request
        fetchOrderData(filterValues);
    }, [isClicked, filterValues, currentPage, pageSize]);

    console.log(filterValues);

    return (
        <main>
            <div className="pr-6">
                <section>
                    <div className="w-full flex justify-between py-5">
                        <p className="text-2xl text-gray-900 font-semibold">Orders</p>
                        <div className="flex gap-x-10">
                            <form className="flex items-center">
                                <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                    <div className=" bg-white rounded-full p-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-52 py-1 px-1 bg-gray-100 outline-0"
                                        //   value={searchTerm}
                                        //   onChange={handleSearch}
                                        type="text"
                                    />
                                </div>
                            </form>
                            <User />
                        </div>
                    </div>
                </section>
                {/* //Searching and filtering section */}
                <section>
                    <div className="flex flex-col mt-5">
                        {/* //search section */}
                        <div className="flex items-center gap-x-2">
                            <p className="text-gray-700 font-bold">Order By</p>
                            <div className=" bg-gray-100 border border-solid border-[#BBBBBB] rounded-full py-1 px-2">
                                <select
                                    id="date"
                                    className="text-xs p-1 bg-gray-100 outline-0"
                                    value={dateOption}
                                    onChange={handleDateChange}
                                >
                                    <option selected>All</option>
                                    <option value="desc">Old</option>
                                    <option value="asc">New</option>
                                </select>

                                <select
                                    id="desc"
                                    className="text-xs p-1 bg-gray-100 outline-0"
                                    value={amountOption}
                                    onChange={handleDescChange}
                                >
                                    <option selected>Price</option>
                                    <option value="asc">Low</option>
                                    <option value="desc">High</option>
                                </select>
                            </div>
                        </div>
                        {/* //Filtering section */}
                        <div className="flex justify-between">
                            <form>
                                <div className="flex flex-wrap items-center gap-x-2 py-5">
                                    {status.map((item, index) => (
                                        <div key={index} className="flex items-center gap-x-2">
                                            <input
                                                name={item.fieldName}
                                                value={item.name}
                                                id={`checkbox-${index}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                                                onChange={(e) => handleCheckboxChange(e)}
                                            />

                                            <label
                                                htmlFor={`checkbox-${index}`}
                                                className="mr-2 text-xs capitalize font-normal text-gray-900"
                                            >
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </form>
                            <div className="flex gap-x-2 justify-center items-center">
                                <input
                                    className="py-1 px-4 ring-1 outline-none bg-[#F4F5F9] border border-solid border-[#F4F5F9] rounded-full"
                                    type="date"
                                    name="start_date"
                                    onChange={(e) => handleDateChange(e, "start_date")}
                                />
                                <p className="text-lg">to</p>
                                <input
                                    className="py-1 px-4 ring-1 outline-none bg-[#F4F5F9] border border-solid border-[#F4F5F9] rounded-full"
                                    type="date"
                                    name="end_date"
                                    onChange={(e) => handleDateChange(e, "end_date")}
                                />
                                <select
                                    className="py-1 px-4 capitalize ring-1 outline-none bg-[#F4F5F9] border border-solid border-[#F4F5F9] rounded-full"
                                    id="filter-status"
                                    name="payment_status"
                                >
                                    <option value="">All</option>
                                    {/* Add other options as needed */}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                                <tr>
                                    <th scope="col" class="px-2 py-3">
                                        Order
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Method
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Payment
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Voucher
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Seller
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Order Date
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                       Actions
                                    </th>
                                    <th scope="col" class="px-2 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList &&
                                    orderList.map((item) => (
                                        <OrdersTableRow
                                            key={item._id}
                                            data={item}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center py-5">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={totalItems}
                            pageSize={pageSize}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Orders;