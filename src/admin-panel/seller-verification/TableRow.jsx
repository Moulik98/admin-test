import React, { useState } from 'react'
import AttachmentModal from './AttachmentModal'
const TableRow = ({ data, onDelete }) => {
    const { fullname, email, isVerify, store_name, _id } = data
    const [viewAttachment, setViewAttachment] = useState(false)

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDelete = () => {
        // Show the delete confirmation popup
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        // Perform the delete action here
        // You can call your delete function or API request here
        // After successful delete, close the popup and update the UI
        try {
            // Your delete logic here
            await makeDeleteRequest(_id); // This should call your delete function
            onDelete(); // This should trigger the UI update
        } catch (error) {
            console.error('Error during delete:', error);
        } finally {
            setShowDeletePopup(false); // Close the delete confirmation popup
        }
    };
    const handleClose = (value) => {
        if (value === 'close') {
            setViewAttachment(false)
        } if (value === 'verify') {
            onDelete()
            setViewAttachment(false)
        }

    }
    async function makeDeleteRequest(id) {
        try {
            const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
            const url = `${process.env.REACT_APP_URL}/v1/verifySeller/deleteData`;
    
            const payload = {
                // Add your desired request body here
                id: id
            };
    
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            };
    
            const response = await fetch(url, requestOptions);
    
            if (response.ok) {
                const responseData = await response.json();
                onDelete();
                console.log('Delete request successful:', responseData);
            } else {
                throw new Error('Delete request failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <tr className="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
            <td
                scope="row"
                className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
            >
                {fullname}
            </td>
            <td className="px-4 py-2 text-xs">{email}</td>
            <td className="px-4 py-2 text-xs">
                {store_name}
            </td>
            <td
                scope="row"
                className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
            >
                <div className={`flex justify-center items-center rounded-full py-1 px-2 text-xs text-white ${isVerify ? 'bg-indigo-500' : 'bg-indigo-900'}`}>
                    {`${isVerify ? 'Approved' : 'Declined'}`}
                </div>
            </td>
            <td className="px-4 py-2 text-xs">
                <div className="flex justify-around">
                    <div
                        onClick={() => setViewAttachment(true)}
                        className="flex items-center cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                            {/* Your SVG for viewing attachment */}
                        </svg>
                        View Attachment
                    </div>
                    <div
                        onClick={handleDelete}
                        className="flex items-center cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            {/* Your SVG for delete */}
                        </svg>
                    </div>
                </div>
            </td>
            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-base text-gray-800 mb-4">
                            Are you sure you want to delete this item?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 bg-red-400 text-white rounded hover-bg-red-500"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {viewAttachment && (
                <AttachmentModal
                    visible={viewAttachment}
                    id={_id}
                    onClose={handleClose}
                />
            )}
        </tr>
    )
}

export default TableRow