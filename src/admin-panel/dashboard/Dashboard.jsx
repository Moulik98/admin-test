import React from "react";
import TopBrandsTable from "./TopBrands";
import TopProdTable from "./TopProd";
import TopCategoriesTable from "./TopCategory";
import { Blocks } from "./Blocks";
import { User } from "../user/User";
import UserTable from "./UserTable";
import {Upblock } from "./Upblock";
import { Downblock } from "./Downblock";
import OrdersTable from "./OrdersTable";

export const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between px-16 pt-8">
        <p className=" text-2xl font-semibold">Dashboard</p>
        <div>
          <User />
        </div>
      </div>
        <div className="px-16 pt-8">
          <Upblock/>
        </div>
      
      <div className="px-16 pt-8">
        <Blocks />
      </div>
      <div className="px-16 pt-8">
        <Downblock/>
      </div>
      <div className="flex justify-between gap-2 px-16 pt-8">
        <TopBrandsTable />
        <TopCategoriesTable />
      </div>
      <div>
        <OrdersTable/>
      </div>
      <div className="flex justify-between gap-2 px-16 py-8">
        <TopProdTable />
        <UserTable/>
      </div>
    </div>
  );
};
