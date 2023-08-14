import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CategoriesRow from './CategoriesRow'
import { User } from '../user/User';
const AdminCategories = () => {
    const [count, setCount] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/v1/categories/get/count`)
            .then(res => res.json())
            .then(data => {
                setCount(data)

            })
    }, [])
    console.log(count);

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = async () => {
        // Perform an API call to retrieve paginated data
        // Adjust the API endpoint and parameters as per your application's needs
        const response = await fetch(`${process.env.REACT_APP_URL}/v1/categories/get-populated?filter[category_type][$eq]=child&page=${currentPage}&limit=${pageSize}&sort=-createdAt`);
        const data = await response.json();
        console.log(data);
        setItems(data.categoryList);
        setTotalItems(data.count);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        return (
            <div className='flex justify-end pb-5 '>
                <div className='flex items-center border border-solid border-[#EEEEEE] rounded-md '>
                    <button
                        className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>

                    </button>

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]  ${page === currentPage ? 'bg-[#4285F4] text-white' : 'text-[#222222]'}`}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                    </button>
                </div>
            </div>
        );
    };

    return (
        <main>
            <div className='pr-6'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/category' className='text-2xl text-gray-900 font-semibold'>Categories</Link>
                        <User/>
                    </div>
                </section>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-around py-5'>
                        <div className='flex flex-col gap-y-1 w-fit'>
                            <div>
                                <p className='text-lg font-medium text-gray-900 text-center'>Parent Categories</p>
                            </div>
                            <div className='w-44 h-24  flex justify-center items-center bg-[#82AAE3] rounded-lg border border-solid border-[#EAEAEA] shadow-[ 0px_4.43063px_4.43063px_rgba(0,0,0,0.25)]'>
                                <div className='text-4xl text-gray-900 font-semibold'>
                                    {count && count.parent}
                                </div>
                            </div>
                            <div className='flex justify-between '>
                                <Link className='text-xs text-blue-900 underline' to='/category/parentcategory'>Add</Link>
                                <Link className='text-xs text-blue-900 underline' to='/category/parentcategory'>View All</Link>
                            </div>
                            <div className='text-lg text-gray-900 font-semibold text-center'>
                                Step 1
                            </div>
                        </div>
                        {/* // Sub Categories */}
                        <div className='flex flex-col gap-y-1 w-fit 
                        '>
                            <div>
                                <p className='text-base font-medium text-gray-900 text-center'>Sub Categories</p>
                            </div>
                            <div className='w-44 h-24  flex justify-center items-center bg-[#91D8E4] rounded-lg border border-solid border-[#EAEAEA] shadow-[ 0px_4.43063px_4.43063px_rgba(0,0,0,0.25)]'>
                                <div className='text-4xl text-gray-900 font-semibold'>
                                    {count && count.sub}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <Link className='text-xs text-blue-900 underline' to='/category/subcategory'>Add</Link>
                                <Link className='text-xs text-blue-900 underline' to='/category/subcategory'>View All</Link>
                            </div>
                            <div className='text-base text-gray-900 font-semibold text-center'>
                                Step 2
                            </div>
                        </div>
                        {/* Child Categories */}
                        <div className='flex flex-col gap-y-1 w-fit'>
                            <div>
                                <p className='text-base font-medium text-gray-900 text-center'>Child Categories</p>
                            </div>
                            <div className='w-44 h-24  flex justify-center items-center bg-[#BFEAF5] rounded-lg border border-solid border-[#EAEAEA] shadow-[ 0px_4.43063px_4.43063px_rgba(0,0,0,0.25)]'>
                                <div className='text-4xl text-gray-900 font-semibold'>
                                    {count && count.child}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <Link className='text-xs text-blue-900 underline' to='/category/childcategory'>Add</Link>
                                <Link className='text-xs text-blue-900 underline' to='/category/childcategory'>View All</Link>
                            </div>
                            <div className='text-lg text-gray-900 font-semibold text-center'>
                                Step 3
                            </div>
                        </div>
                    </div>
                </section>
                {/* //Table */}
                <section>
                    <div className="max-w-5xl mx-auto overflow-hidden rounded-t-xl my-5">
                        <table className="table min-w-full border  border-solid">
                            <thead className="bg-[#e5f2f4]">
                                <tr>
                                    <th scope="col" className="px-4 py-2 text-left  text-gray-900 text-xs font-medium ">Sl no.</th>
                                    <th scope="col" className="px-4 py-2 text-left  text-gray-900 text-xs font-medium ">Parent Category</th>
                                    <th scope="col" className="px-4 py-2 text-left  text-gray-900 text-xs font-medium ">Sub-Category</th>
                                    <th scope="col" className="px-4 py-2 text-left  text-gray-900 text-xs font-medium ">Child Category</th>
                                    <th scope="col" className="px-4 py-2 text-center  text-gray-900 text-xs font-medium ">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, index) => (
                                        <CategoriesRow
                                            key={item._id}
                                            data={item}
                                            index={index}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {renderPagination()}
                </section>
            </div>
        </main>
    )
}

export default AdminCategories