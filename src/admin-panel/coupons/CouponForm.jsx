import React, { useEffect, useState } from 'react'
const CouponForm = (props) => {
    const { handleClose, id } = props
    const [message, setMessage] = useState('')
    // Initialize state for form fields
    const [formData, setFormData] = useState({
        coupon_code: '',
        category_type: '',
        category: '',
        discount_type: '',
        discount: '',
        quantity_type: '',
        quantity: '',
        start_date: '',
        end_date: '',
        description: '',
        minPurchase: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (formData.quantity_type === "unlimited") {
            setFormData((preValue) => ({
                ...preValue, quantity: ''
            }))
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
            try {
                fetch(`${process.env.REACT_APP_URL}/v1/coupon/get-coupon/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setFormData(data.data);
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (error) {
                console.log('An error occurred:', error);
            }

        }
    }, [id])

    async function AddCoupon(url) {
        console.log('url', url);
        const access_token = localStorage.getItem('access_token')
        try {
            const requestBody = {
                coupon_code: formData.coupon_code.toUpperCase(),
                category_type: formData.category_type,
                category: formData.category,
                discount_type: formData.discount_type,
                discount: formData.discount,
                quantity_type: formData.quantity_type,
                quantity: formData.quantity,
                start_date: formData.start_date,
                end_date: formData.end_date,
                description: formData.description,
                minPurchase: formData.minPurchase
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(requestBody),
            };
            console.log(JSON.stringify(requestBody))
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setMessage(data.message)
            console.log('response data', data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            AddCoupon(`${process.env.REACT_APP_URL}/v1/coupon/update-coupon/admin/${id}`).then(res => {
                if (res.ok) {
                    setMessage('')
                    alert('Coupon Updated Successfully')
                }
            })
        } else {
            AddCoupon(`${process.env.REACT_APP_URL}/v1/coupon/add-coupon/admin`).then(res => {
                if (res.ok) {
                    setMessage('')
                    alert('Coupon Added Successfully')
                }
            })
        }
        console.log(formData);

    }
    // geting select category list
    const [categoryList, setCategoryList] = useState([])
    async function fetchData(category) {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=${category}&limit=500`);
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            setCategoryList(data.categoryList);
            console.log('Data:', data.categoryList);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        if (formData.category_type === 'parent') {
            fetchData('parent')
        } else if (formData.category_type === 'sub') {
            fetchData('sub')
        } else if (formData.category_type === 'child') {
            fetchData('child')
        }
    }, [formData.category_type])
    console.log(categoryList);
    return (
        <div className='pr-6 py-5 text-xs'>
            <form
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col'>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Code *</label>
                        <input
                            required

                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="text"
                            name='coupon_code'
                            value={formData.coupon_code}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Allow Product Type *</label>

                        <select
                            required
                            name='category_type'
                            value={formData.category_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="parent">Parent</option>
                            <option value="sub">Sub</option>
                            <option value="child">Child </option>
                            <option value="whole website">Whole website </option>
                        </select>
                    </div>
                    {
                        formData.category_type === 'whole website' ? null :
                            <div className=' w-5/6 flex items-center gap-4 my-2'>
                                <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>{`${formData.category_type ? formData.category_type + '*' : 'Categoty *'}`}</label>
                                <select
                                    // required
                                    name='category'
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                                >
                                    <option value="">--Select--</option>
                                    {
                                        categoryList.length !== 0 &&
                                        categoryList.map(item => (
                                            <option key={item._id} value={item._id}>{item.category_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                    }

                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Type *</label>
                        <select
                            required
                            name='discount_type'
                            value={formData.discount_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="amount">By Amount</option>
                            <option value="percentage">By Percentage</option>
                        </select>
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>{`${formData.discount_type === 'percentage' ? 'Percentage *' : 'Amount *'}`} </label>

                        <input
                            required
                            className='py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="text"
                            name='discount'
                            value={formData.discount}
                            onChange={handleChange}

                        />
                        {`${formData.discount_type === 'percentage' ? '%' : ''}`}
                    </div>
                    {/* // Minimum amount */}
                    {
                        formData.discount_type === 'amount' ?
                            <div className=' w-5/6 flex items-center gap-4 my-2'>
                                <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Minimum Purchage Amount </label>

                                <input
                                    required
                                    className='py-1 px-3 border border-solid border-gray-200 rounded-md'
                                    type="text"
                                    name='minPurchase'
                                    value={formData.minPurchase}
                                    onChange={handleChange}

                                />
                            </div>
                            : null
                    }
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Quantity *</label>
                        <select
                            required
                            name='quantity_type'
                            value={formData.quantity_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="limited">Limited</option>
                            <option value="unlimited">Unlimited</option>
                        </select>
                    </div>
                    {/* // dynamic field */}
                    {
                        formData.quantity_type === 'limited' ?
                            <div className=' w-5/6 flex items-center gap-4 my-2'>
                                <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '></label>
                                <input
                                    required
                                    className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                                    type="text"
                                    name='quantity'
                                    value={formData.quantity}
                                    onChange={handleChange}

                                />

                            </div>
                            : null
                    }
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Start Date *</label>
                        <input
                            required
                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="date"
                            name='start_date'
                            value={formData.start_date}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>End Date *</label>
                        <input
                            required
                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="date"
                            name='end_date'
                            value={formData.end_date}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Description *</label>
                        <textarea className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            required
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='flex gap-x-4 justify-center items-center py-5'>
                    <button
                        onClick={() => handleClose()}
                        type='button' className='py-1 px-6 text-red-600 '>Cancel</button>
                    <button type='Submit' className='py-1 px-14 bg-blue-900 text-white' >Save</button>
                </div>
                {
                    message ? <p className='text-red-500'>{message}</p> : null
                }
            </form>
        </div>
    )
}

export default CouponForm