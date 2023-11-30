import React, { useEffect, useState } from 'react'
import { User } from '../user/User'
import { Link } from 'react-router-dom'
import TableRow from './TableRow';
import toast from 'react-hot-toast';
import AddReasonModal from './AddReasonModal';

const ManageCancellation = () => {
    const [reasons, setReasons] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [newReason, setNewReason] = useState('');
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
            setReasons(data.data);
        }
    }

    useEffect(() => {
        handleReasons()
    }, [])

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
                <div className="flex" onClick={() => setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Add Cancellation Reason</p>
                </div>
                {showModal && (
                    <AddReasonModal reasons={reasons} onClose={handleClose} visible={showModal}/>
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
                        {
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