const API_BASE_URL = 'https://two1genx-render.onrender.com';

// Function to fetch privacy data from the API
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

// Function to create new privacy data using POST
export const createPrivacyData = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/cms/add-privacy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to create data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};