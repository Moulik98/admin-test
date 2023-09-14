// api.js

// Define your API endpoint URL
const API_BASE_URL = 'https://two1genx-render.onrender.com';

export const fetchPrivacyData = async (privacyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/cms/privacy-policies/${privacyId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to create or update privacy data using POST or PUT
export const createOrUpdatePrivacyData = async (formData) => {
  try {
    const method = formData._id ? 'PUT' : 'POST';
    const url = formData._id ? `${API_BASE_URL}/${formData._id}` : API_BASE_URL;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to create/update data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
