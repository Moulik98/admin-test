import React from 'react'

const List = [
    {
        id: 1,
        date: '01 /01 / 2021',
        categoryManager: "John Doe",
        cmUsername: 'navin-kumar',
        sellerName: "John Doe",
        sellerStoreName: "John Doe",

    },
    {
        id: 2,
        date: '01 /02 / 2023',
        categoryManager: "John Doe",
        cmUsername: 'navin-kumar',
        sellerName: "John Doe",
        sellerStoreName: "John Doe",
    }
]
const CmAndSellerTable = () => {
    return (
        <div className="relative  overflow-hidden">
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Assign / Creation Date
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Category Manager
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Cm user Name
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Seller Name
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Seller Store Name
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(List) &&
                        List?.map((item) => (
                            <tr key={item._id}>
                                <td className="px-2 py-3">{item?.date}</td>
                                <td className="px-2 py-3">{item?.categoryManager}</td>
                                <td className="px-2 py-3">{item?.cmUsername}</td>
                                <td className="px-2 py-3">{item?.sellerName}</td>
                                <td className="px-2 py-3">{item?.sellerStoreName}</td>
                                <td className="px-2 py-3">
                                    <div className='flex space-x-2'>
                                        <div className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                        </div>
                                        <div className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                            </svg>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default CmAndSellerTable;