import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import { User } from '../user/User';
const ReviewRating = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [totalItems, setTotalItems] = useState(0);
    const [reviewList, setReviewList] = useState([])
    async function getReviewList() {
        try {
            const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
            const url = `${process.env.REACT_APP_URL}/v1/review/get?page=${currentPage}&limit=${pageSize}`;

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            setTotalItems(data.totalReviews)
            setReviewList(data.reviews);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReviewList()
    }, [currentPage, pageSize])
    const handleRefresh = () => {
        getReviewList()
    }
    return (
        <main>
            <div className='pr-7'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/review-rating' className='text-3xl text-gray-900 font-semibold'>Ratings & Reviews</Link>
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
                {/* // Table Section */}
                <section>
                    <div className='flex flex-col mt-10 
                    shadow-[0px_0px_16.9227px_rgba(0,0,0,0.1)] rounded-lg'>
                        <div className='p-5 border-b border-solid border-gray-300'>
                            <h2 className='text-base text-left font-semibold text-[#143250]'>Ratings & Reviews of products :
                            </h2>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-left text-xs">
                                <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-50 bg-gray-50 ">
                                    <tr>
                                        <th scope="col" class=" px-4 py-3">Product</th>
                                        <th scope="col" class=" 
                                        px-4 py-3">Seller</th>
                                        <th scope="col" class=" px-4 py-3">Customer</th>
                                        <th scope="col" class="text-center px-4 py-3 ">Ratings</th>
                                        <th scope="col" class="text-center px-4
                                        mx-auto py-3">
                                            Review
                                        </th>
                                        <th scope="col" class="text-center px-4
                                        mx-auto py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="text-center px-4
                                        mx-auto py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviewList?.map((item, index) => (
                                            <TableRow
                                                key={item._id}
                                                data={item}
                                                onDelete={handleRefresh}

                                            />
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className='flex justify-end py-5'>


                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                pageSize={pageSize}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default ReviewRating;