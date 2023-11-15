import React, { useCallback } from 'react'
import { format } from 'date-fns';
import MergeButton from './MergeButton';
import EyeButton from './EyeButton';
import { useNavigate } from "react-router-dom";

const dummyData = [
    {
        "Sl. No": 1,
        "Seller Name": "ABC Seller",
        "Onboard Date": "2023-01-15",
        "Live Brands": 5,
        "Pending Brands": 2,
        "OnBoarded Products": 150,
        "Live Products": 120,
        "Draft Products": 30,
        "Approval": "Approved",
        "Pending Products": 10,
        "Live A+ Content": 8,
        "Pending A+Content": 2,
        "Actions": "View/Edit"
    },
    {
        "Sl. No": 2,
        "Seller Name": "XYZ Seller",
        "Onboard Date": "2023-02-20",
        "Live Brands": 3,
        "Pending Brands": 1,
        "OnBoarded Products": 100,
        "Live Products": 90,
        "Draft Products": 10,
        "Approval": "Pending",
        "Pending Products": 20,
        "Live A+ Content": 5,
        "Pending A+Content": 3,
        "Actions": "Approve"
    },
    {
        "Sl. No": 3,
        "Seller Name": "PQR Seller",
        "Onboard Date": "2023-03-10",
        "Live Brands": 6,
        "Pending Brands": 0,
        "OnBoarded Products": 200,
        "Live Products": 180,
        "Draft Products": 20,
        "Approval": "Approved",
        "Pending Products": 5,
        "Live A+ Content": 10,
        "Pending A+Content": 0,
        "Actions": "View/Edit"
    },
    {
        "Sl. No": 4,
        "Seller Name": "LMN Seller",
        "Onboard Date": "2023-04-05",
        "Live Brands": 4,
        "Pending Brands": 3,
        "OnBoarded Products": 120,
        "Live Products": 100,
        "Draft Products": 20,
        "Approval": "Pending",
        "Pending Products": 25,
        "Live A+ Content": 7,
        "Pending A+Content": 5,
        "Actions": "Approve"
    },
    {
        "Sl. No": 5,
        "Seller Name": "EFG Seller",
        "Onboard Date": "2023-05-18",
        "Live Brands": 7,
        "Pending Brands": 1,
        "OnBoarded Products": 180,
        "Live Products": 150,
        "Draft Products": 30,
        "Approval": "Approved",
        "Pending Products": 15,
        "Live A+ Content": 9,
        "Pending A+Content": 1,
        "Actions": "View/Edit"
    }
];

const AssociateSellerTable = ({ list, cmId, cmName }) => {
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        const url = `/category-head-dashboard/associate-seller/${id}`
        console.log('url', url);
        // navigate(url);
    }, [])
    return (
        <div className="relative w-full overflow-x-scroll">
            <table className="w-full overflow-x-scroll text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            Sl. No
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Seller Name
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Onboard Date
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Live Brands
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Pending Brands
                        </th>
                        <th scope="col" className="px-4 py-2">
                            OnBoarded Products
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Live Products
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Draft Products
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Approval
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Pending Products
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Live A+ Content
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Pending A+Content
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(dummyData) &&
                        dummyData?.map((item, index) => {
                            const {
                                "Sl. No": SlNo,
                                "Seller Name": SellerName,
                                "Onboard Date": OnboardDate,
                                "Live Brands": LiveBrands,
                                "Pending Brands": PendingBrands,
                                "OnBoarded Products": OnBoardedProducts,
                                "Live Products": LiveProducts,
                                "Draft Products": DraftProducts,
                                "Approval": Approval,
                                "Pending Products": PendingProducts,
                                "Live A+ Content": LiveAContent,
                                "Pending A+Content": PendingAContent,
                                "Actions": Actions
                            } = item;

                            return (
                                <tr key={SlNo}>
                                    <td className="px-4 py-2">{index}</td>
                                    <td className="px-4 py-2">{SellerName}</td>
                                    <td className="px-4 py-2">{OnboardDate}</td>
                                    <td className="px-4 py-2">{LiveBrands}</td>


                                    <td className="px-4 py-2">{PendingBrands}</td>
                                    <td className="px-4 py-2">{OnBoardedProducts}</td>
                                    <td className="px-4 py-2">{LiveProducts}</td>
                                    <td className="px-4 py-2">{DraftProducts}</td>

                                    <td className="px-4 py-2">{Approval}</td>
                                    <td className="px-4 py-2">{LiveAContent}</td>
                                    <td className="px-4 py-2">{PendingAContent}</td>
                                    <td className="px-4 py-2">{PendingAContent}</td>
                                    <td className="px-4 py-2">
                                        <div className='flex gap-x-2 px-4'>
                                            <EyeButton
                                                id={'id'}
                                                onClick={handleClick}
                                            />
                                            <MergeButton
                                            // cmId={cmId}
                                            // sellerId={_id}
                                            // cmName={cmName}
                                            // sellerName={fullname}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default AssociateSellerTable