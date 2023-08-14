import React from 'react';

const Layout = ({ sidebar, content }) => {
  return (
    <div className=" flex flex-row max-w-screen-2xl mx-auto min-h-screen">
      <div className="sidebar mr-7 bg-[#00388c]">{sidebar}</div>
      <div className="content w-[85%] ml-4 ">{content}</div>
    </div>
  );
};

export default Layout;
