import React, { useState } from 'react'
import toast from 'react-hot-toast';
const AddReasonModal = ({reasons,visible,onClose}) => {
    const [selectedType, setSelectedType] = useState('');
    const [newReason, setNewReason] = useState('');

    const token = localStorage.getItem("access_token")
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

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    }
    if(visible)
    return (
        <div>
            <div className="fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className="w-1/3 mx-auto bg-white rounded py-5 px-10">
            <section>
                <div className="flex flex-col justify-start gap-2">
                    <h1 className='text-xl font-bold text-center'>Add Cancellation Reason</h1>
                    <label className='text-start' for="cancellationReason">Cancellation Reason:</label>
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
                    <div className="flex justify-center gap-x-2">
                    <button className="bg-blue-600 px-2 py-1 text-white rounded" onClick={addReason}>Add</button>
                    <button className="bg-red-600 px-2 py-1 text-white rounded"onClick={onClose} >Cancel</button>
                    </div>
                    
                </div>
            </section>
            </div>
            </div>
        </div>
    )
}

export default AddReasonModal