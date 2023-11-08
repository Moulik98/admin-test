import React from 'react'
import { format } from 'date-fns';
import MergeButton from './MergeButton';
const AssociateSellerTable = ({ list, cmId }) => {
    return (
        <div className="relative  overflow-hidden">
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-6 py-2">
                            Assign / Creation Date
                        </th>

                        <th scope="col" className="px-6 py-2">
                            Seller Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Store Name
                        </th>

                        <th scope="col" className="px-6 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((item) => {
                            const { _id, onboarding_date, fullname, store_name } = item;
                            const date = format(new Date(onboarding_date), 'dd/MM/yyyy');
                            return (
                                <tr key={_id}>
                                    <td className="px-6 py-2">{date}</td>
                                    <td className="px-6 py-2">{fullname}</td>
                                    <td className="px-6 py-2">{store_name}</td>

                                    <td className="px-6 py-2">
                                        <div className='flex px-4'>
                                            <MergeButton
                                                cmId={cmId}
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