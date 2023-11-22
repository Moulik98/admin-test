import React, { useState, useEffect } from "react";

export const User = () => {
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Initialize isAuthenticated to true
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await fetch(
         ` ${process.env.REACT_APP_URL}/v1/auth/admin/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`, // Replace with your actual access token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setName(data?.admin?.name);
          setIsLogin(true); // Set isAuthenticated to true on successful fetch
        } else {
          console.log("Failed to fetch name");
          setIsLogin(false); // Set isAuthenticated to false on failed fetch
        }
      } catch (error) {
        console.error("Error during name fetch:", error);
        setIsLogin(false); // Set isAuthenticated to false on error
      }
    };

    fetchName();
  }, []);

  const handleLogout = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/auth/admin/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({}),
        }
      );

      // Handle the response from the API
      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        localStorage.removeItem('isLogin')
        // Remove refresh_token from localStorage
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        // Successful logout
        console.log("Logout successful");
        setIsLogin(false);
        // localStorage.setItem('isLogin', false) // Set isAuthenticated to false on successful logout
      } else {
        // Logout failed
        console.log("Logout failed");
        setIsLogin(false); // Set isAuthenticated to false on failed logout
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLogin(false); // Set isAuthenticated to false on error
    }
  };

  return (
    <div className="flex gap-x-10 group">
      <div className="flex flex-col">
        <p className="text-base text-gray-900 font-semibold">{name}</p>
        {isLogin && (
          <p
            className="text-sm text-[#4285f4] text-gray-800 shadow-md p-2 font-normal opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={() => setShowLogoutPopup(true)}
          >
            Logout
          </p>
        )}
      </div>
      <div className="w-9 h-9">
        <img
          className="w-full h-full object-fill rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
          alt="profile"
        />
      </div>
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-base text-gray-800 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                onClick={() => setShowLogoutPopup(false)}
              > 
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
