import React from 'react';

const Card = ({ product }) => {
  if (!product) {
    return null; // or a loading indicator
  }

  const { item_name, product_images, _id } = product;

  return (
    <div key={_id} className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-64">
      <img className="w-full h-40 object-cover" src={product_images} alt={item_name} />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{item_name}</h2>
        {/* Add more details if needed */}
        {/* <p className="text-gray-600">{product.description}</p> */}
      </div>
    </div>
  );
};

export default Card;
