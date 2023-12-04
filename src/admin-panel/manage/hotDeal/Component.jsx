import React, { useState } from 'react';

const Component = ({ onProductSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/cms/get-products-list?search_query=${searchQuery}`);
      const data = await response.json();
      setProducts(data.response);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleProductSelection = (product) => {
    const isSelected = selectedProducts.some((selectedProduct) => selectedProduct._id === product._id);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleProductSelect = async () => {
    try {
      if (selectedProducts.length > 0) {
        // Call the callback function to handle the selected products
        onProductSelect(selectedProducts);
      }
    } catch (error) {
      console.error('Error handling selected products:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <label className="block mb-4">
        Search Product:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-2 rounded flex flex-col items-center">
            <img src={product.main_img} alt={product.name} className="mb-1 rounded" />
            <p className="text-sm font-semibold text-center flex-grow">{product.name}</p>
            <button
              onClick={() => toggleProductSelection(product)}
              className={`bg-blue-500 text-white px-2 py-1 rounded ${
                selectedProducts.some((selectedProduct) => selectedProduct._id === product._id) ? 'bg-blue-700' : ''
              }`}
            >
              {selectedProducts.some((selectedProduct) => selectedProduct._id === product._id) ? 'Deselect' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Selected Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {selectedProducts.map((selectedProduct) => (
              <div key={selectedProduct._id} className="border p-2 rounded flex flex-col items-center">
                <img src={selectedProduct.main_img} alt={selectedProduct.name} className="mb-1 rounded" />
                <p className="text-sm font-semibold text-center flex-grow">{selectedProduct.name}</p>
              </div>
            ))}
          </div>
          <button onClick={handleProductSelect} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Send to Another API
          </button>
        </div>
      )}
    </div>
  );
};

export default Component;
