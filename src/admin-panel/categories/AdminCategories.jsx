import React, { useState, useEffect } from 'react'
import Pagination from '../../Pagination';
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


    return (
        <main>
            <div className='pr-6'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/category' className='text-2xl text-gray-900 font-semibold'>Categories</Link>
                        <User />
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
    )
}

export default AdminCategories