import React, { useState, useEffect } from 'react'
import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import { User } from '../user/User';
import Pagination from '../../Pagination';
const ApproveProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isApproved, setIsApproved] = useState(false)
    const handleRefresh = () => {
        setIsApproved((preValue) => !preValue)
    }


    const [productList, setProductList] = useState([])
    async function fetchProductList(url) {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    }
    useEffect(() => {
        fetchProductList(`${process.env.REACT_APP_URL}/v1/products/get-products-list/id?filter[review_status][$eq]=reviewed&page=${currentPage}&limit=${pageSize}`)
            .then(data => {
                setTotalItems(data.totalCount)
                setProductList(data.productList)
            })
            .catch(error => console.log(error))
    }, [isApproved, currentPage, pageSize])
    return (
        <main>
            <div className='pr-7'>
                <section>
                    <div className='w-full  flex justify-between py-5'>
                        <Link to='/' className='text-2xl text-gray-900 font-semibold'>Pending Approval List</Link>
                        <div className='flex gap-x-10'>
                            <form className="flex items-center">
                                <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                    <div className=' bg-white rounded-full p-1'>
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
                {/* // table section */}
                <section>
                    <div class="relative overflow-x-auto rounded-t-xl">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-[#e5f2f4] text-xs font-normal Captilise text-gray-900 ">
                                <tr>
                                    <th scope="col" class="px-2 py-2">Sl no</th>
                                    <th scope="col" class="px-2 py-2">Image</th>
                                    <th scope="col" class="px-2 py-2">Name</th>
                                    <th scope="col" class="px-2 py-2">Description</th>
                                    <th scope="col" class="px-2 py-2">Parent Category</th>
                                    <th scope="col" class="px-2 py-2">Sub Category</th>
                                    <th scope="col" class="px-2 py-2">Child Category</th>
                                    <th scope="col" class="px-2 py-2">Action</th>
                                    <th scope="col" class="px-2 py-2">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList && productList.map((item, index) => (
                                        <TableRow
                                            data={item}
                                            index={index}
                                            handleRefresh={handleRefresh}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-end items-center py-5'>
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
    )
}

export default ApproveProduct