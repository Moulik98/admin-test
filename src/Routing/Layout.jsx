import React from 'react';

const Layout = ({ sidebar, content }) => {
  return (
    <div className=" flex gap-10 flex-row max-w-screen-2xl  mx-auto min-h-screen">
      <div className="sidebar  bg-[#00388c]">{sidebar}</div>
      <div className="content grow ">{content}</div>
    </div>
  );
};

export default Layout;
