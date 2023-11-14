import React from 'react'

const UnAssignSellerTable = () => {
    const list = [
        {
            "SL_No": 1,
            "OnBoard_Date": "2023-11-14",
            "Seller_Name": "John Doe",
            "Business_Type": "Startup",
            "PAN": "ABCDE1234F",
            "GSTN": "GST123456789",
            "Contact_No": "123-456-7890"
        },
        {
            "SL_No": 2,
            "OnBoard_Date": "2023-11-15",
            "Seller_Name": "Jane Smith",
            "Business_Type": "Startup",
            "PAN": "FGHIJ5678K",
            "GSTN": "GST987654321",
            "Contact_No": "987-654-3210"
        },
        {
            "SL_No": 3,
            "OnBoard_Date": "2023-11-16",
            "Seller_Name": "Alice Johnson",
            "Business_Type": "Startup",
            "PAN": "LMNOP9012L",
            "GSTN": "GST246813579",
            "Contact_No": "555-555-5555"
        },
        {
            "SL_No": 4,
            "OnBoard_Date": "2023-11-17",
            "Seller_Name": "Bob Williams",
            "Business_Type": "Startup",
            "PAN": "QRSTU3456M",
            "GSTN": "GST369852147",
            "Contact_No": "999-999-9999"
        },
        {
            "SL_No": 5,
            "OnBoard_Date": "2023-11-18",
            "Seller_Name": "Eva Brown",
            "Business_Type": "Business",
            "PAN": "VWXYZ6789N",
            "GSTN": "GST951753864",
            "Contact_No": "777-777-7777"
        }
    ];

    return (
        <div className='flex flex-col'>
            <h1 className='text-2xl text-[#383E50] font-semibold leading-10 text-left'>List of unassign seller</h1>
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-6 py-2">
                            SL. No
                        </th>
                        <th scope="col" className="px-6 py-2">
                            OnBoard Date
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Seller Name (user name)
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Business Type
                        </th>
                        <th scope="col" className="px-6 py-2">
                            PAN
                        </th>
                        <th scope="col" className="px-6 py-2">
                            GSTN
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Contact No
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((item) => {
                            const { SL_No, OnBoard_Date, Seller_Name, Business_Type, PAN, GSTN, Contact_No } = item;

                            return (
                                <tr key={SL_No}>
                                    <td className="px-6 py-2">{SL_No}</td>

                                    <td className="px-6 py-2">{OnBoard_Date}</td>
                                    <td className="px-6 py-2">{Seller_Name}</td>
                                    <td className="px-6 py-2">{Business_Type}</td>
                                    <td className="px-6 py-2">{PAN}</td>
                                    <td className="px-6 py-2">{GSTN}</td>
                                    <td className="px-6 py-2">{Contact_No}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default UnAssignSellerTable