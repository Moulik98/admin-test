import React from "react";


const StatsCard = ({ img, heading, number, title, style }) => {
  return (
    <div className="w-full  flex flex-row gap-5  bg-[#FFF] border border-solid border-[#EEE] rounded-xl p-5">
      <div className={`${style} w-8 h-8 flex  px-4 pt-4 pb-10 rounded-3xl`}>
        <img className="object-cover" src={img} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-base text-[#383E50] font-semibold leading-5">
          {heading}
        </h3>
        <p className="text-2xl text-[#4F5D77] font-semibold leading-6 py-2">
          {number}
        </p>
        <p className="text-sm text-[#6C757D] leading-5">{title}</p>
      </div>
    </div>
  );
};

const ManagerStats = ({approvednumber,pendingnumber}) => {

  return (
    <section className=" flex flex-row gap-5">
      <div className="shrink-0 w-[62%]">
        <StatsCard
          img={`/assets/admin-panel/seller.png`}
          heading={`Onboarded Seller`}
        number={approvednumber}
          title={`Seller Onboarded`}
          style={`bg-[#08817833]`}
        />
      </div>

      <StatsCard
        img={`/assets/dashboard/earning.svg`}
        heading={`Pending`}
        number={pendingnumber}
        title={`Seller who are in the process of being onboarded`}
        style={`bg-[#0DCA8C33]`}
      />
    </section>
  );
};

export default ManagerStats;
