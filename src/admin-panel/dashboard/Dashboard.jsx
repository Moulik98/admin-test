import React from 'react'
import TopBrandsTable from './TopBrands'
import TopProdTable from './TopProd'
import TopCategoriesTable from './TopCategory'

export const Dashboard = () => {
  return (
    <div>
        <div className='flex justify-between px-16 pt-8'>
        <TopBrandsTable/>
        <TopCategoriesTable/>
        </div>
        <div className='px-16 pt-8'>
        <TopProdTable/>
        </div>
    </div>
  )
}
