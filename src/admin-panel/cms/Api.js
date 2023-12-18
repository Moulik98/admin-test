const API_BASE_URL = 'https://api.21genx.com:8000';

const accessToken = localStorage.getItem('access_token')
// Function to fetch privacy data from the API
export const fetchPrivacyData = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/cms/privacy-policies/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
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
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    console.log(JSON.stringify(formData))
    if (!response.ok) {
      throw new Error('Failed to create data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAndEditPrivacyData = async ({id, updatedData}) => {
  try {
    // Fetch the existing privacy data
    const response = await fetch(`${API_BASE_URL}/v1/cms/privacy-policies/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const existingData = await response.json();

    // Merge the updated data with the existing data
    const editedData = { ...existingData, ...updatedData };

    // Update the privacy data
    const editResponse = await fetch(`${API_BASE_URL}/v1/cms/edit-privacy/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editedData),  // Use the merged data as the request body
    });

    if (!editResponse.ok) {
      throw new Error('Failed to edit data');
    }

    // Return the edited data
    return editedData;
  } catch (error) {
    throw error;
  }
};

