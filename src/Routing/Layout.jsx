import React from 'react';

const Layout = ({ sidebar, content }) => {
  return (
    <div className="flex gap-x-5 max-w-screen-2xl mx-auto min-h-screen relative">
      <div className="sidebar bg-[#00388c] h-fit w-fit sticky top-0">{sidebar}</div>
      <div className="content flex-1 overflow-x-hidden ml-1/4">{content}</div>
    </div>
  );
};

export default Layout;
