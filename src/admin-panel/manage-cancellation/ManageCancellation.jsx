import React, { useEffect, useState } from 'react'
import { User } from '../user/User'
import { Link } from 'react-router-dom'
import TableRow from './TableRow';

import AddReasonModal from './AddReasonModal';

const ManageCancellation = () => {
    const [reasons, setReasons] = useState([]);
    const [reasonfor, setReasonsFor] = useState('');
    const [status, setStatus] = useState('');
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("access_token")
    //Fetching Cancel Reason List 
    const handleReasons = async () => {
        const apiUrl = process.env.REACT_APP_URL + '/v1/cancellation-reason/get/?page=1&limit=10'
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log('data', data)
        if (response.ok) {
            setReasons(data?.data);
        }
    }

    useEffect(() => {
        handleReasons()
    }, [])

    useEffect(() => {
        const filterData = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_URL}/v1/cancellation-reason/get/?reason_for=${reasonfor}&isActive=${status}&page=1&limit=10`;
                const response = await fetch(apiUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setReasons(data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        filterData();
    }, [reasonfor, status]);

    const handleClose = () => {
        setShowModal(false)
    }


    return (
        <div>
            <section>
                <div className="max-w-6xl mx-auto flex justify-between py-5">
                    <Link
                        to="/b2buser"
                        className="text-3xl text-gray-900 font-semibold"
                    >
                        Manage Cancellation
                    </Link>
                    <div className="flex gap-x-10">
                        <User />
                    </div>
                </div>
            </section>

            <section>
                <div className="flex justify-between">
                    <div className="flex" onClick={() => setShowModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Add Cancellation Reason</p>

                    </div>
                    <div className="flex gap-2">
                        <div className="">
                            <label className='text-sm text-gray-400'>
                                Select Seller Type:
                                <select
                                    value={reasonfor}
                                    onChange={(e) => setReasonsFor(e.target.value)}
                                    className="border border-gray-400 rounded-md leading-4 p-1 text-xs"
                                >
                                    <option value="">--Select</option>
                                    <option value="b2b">b2b</option>
                                    <option value="seller">seller</option>
                                </select>
                            </label>
                        </div>
                        <div className="">
                            <label className='text-sm text-gray-400'>
                                Select Status:
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="border border-gray-400 rounded-md leading-4 p-1 text-xs"
                                >
                                    <option value="">--Select</option>
                                    <option value="true">Active</option>
                                    <option value="false">Deactive</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <AddReasonModal reasons={reasons} onClose={handleClose} visible={showModal} />
                )}
            </section>
            <div class="relative overflow-x-auto p-5">
                <table class="w-full text-left text-xs">
                    <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                        <tr>
                            <th scope="col" class=" px-4 py-3">
                                Sl No
                            </th>
                            <th scope="col" class=" px-4 py-3">
                                Cancellation Reason
                            </th>
                            <th
                                scope="col"
                                class=" 
                                        px-4 py-3"
                            >
                                Reason For
                            </th>


                            <th
                                scope="col"
                                class="text-center px-4
                                        mx-auto py-3"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reasons) &&
                            reasons.map((item, index) => (
                                <TableRow
                                    key={index}
                                    data={item}
                                    index={index}
                                />
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCancellation