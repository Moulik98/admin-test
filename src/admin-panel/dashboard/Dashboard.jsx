import React from "react";
import TopBrandsTable from "./TopBrands";
import TopProdTable from "./TopProd";
import TopCategoriesTable from "./TopCategory";
import { ProductBlock } from "./ProductBlock";
import { OrderBlock } from "./OrdersBlock";
import { UserBlock } from "./UserBlock";
import { SalesBlock } from "./SalesBlock";
import { Blocks } from "./Blocks";
import { User } from "../user/User";

export const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between px-16 pt-8">
        <p className=" text-2xl font-semibold">Dashboard</p>
        <div>
          <User />
        </div>
      </div>
        <div className="flex justify-between px-16">
          <div>
            <ProductBlock />
          </div>

          <div>
            <OrderBlock />
          </div>
          <div>
            <UserBlock />
          </div>
          <div>
            <SalesBlock />
          </div>
        </div>
      
      <div className="px-16 pt-8">
        <Blocks />
      </div>
      <div className="flex justify-between px-16 pt-8">
        <TopBrandsTable />
        <TopCategoriesTable />
      </div>
      <div className="px-16 pt-8 w-2/3">
        <TopProdTable />
      </div>
    </div>
  );
};
