import React, { useEffect, useState } from 'react'
import { User } from '../user/User'
import { Link } from 'react-router-dom'
import TableRow from './TableRow';
import toast from 'react-hot-toast';

const ManageCancellation = () => {
    const [reasons, setReasons] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [newReason, setNewReason] = useState('');

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

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    }


    //add cancellation reasons
    const addReason = async () => {
        try {
          const url = process.env.REACT_APP_URL + '/v1/cancellation-reason/add';
          const requestBody = {
            cancellation_reasons: newReason,
            reason_for: selectedType,
          }
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          });
          const data = await response.json()
    
          if (response.ok) {
            // Handle success, maybe update the reasons list or show a success message
            toast.success(data.message)
            console.log('Cancellation reason added successfully');
            setNewReason(''); // Reset the input field after successful addition
          } else {
            // Handle error, maybe show an error message
            toast.error(data.message);
            console.error('Failed to add cancellation reason');
          }
        } catch (error) {
          // Handle exceptions
          console.error('Error:', error.message);
        }
      };

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
                <section>
                    <div className="flex justify-start gap-x-2">
                        <label for="cancellationReason">Cancellation Reason:</label>
                        <input 
                        className='border rounded'
                         type="text" 
                         id="cancellationReason" 
                         name="cancellationReason"
                         value={newReason}
                         onChange={(e) => setNewReason(e.target.value)} />
                        <select
                            value={selectedType}
                            onChange={handleChange}
                            className="border rounded"
                        >
                            <option value="">Select Type</option>
                            {[...new Set(reasons.map((item) => item.reason_for))].map((type, index) => (
                                <option key={index}>{type}</option>
                            ))}
                        </select>
                        <button className="bg-blue-600 px-2 py-1 text-white rounded" onClick={addReason}>Add</button>
                    </div>
                </section>
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