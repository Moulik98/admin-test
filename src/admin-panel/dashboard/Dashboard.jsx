import React from 'react'
import TopBrandsTable from './TopBrands'
import TopProdTable from './TopProd'
import TopCategoriesTable from './TopCategory'
import { ProductBlock } from './ProductBlock'
import { OrderBlock} from './OrdersBlock'
import { UserBlock } from './UserBlock'
import { SalesBlock } from './SalesBlock'
import { Blocks } from './Blocks'

export const Dashboard = () => {
  return (
    <div>
        <div className='pt-8 px-16'>
          <div className='pb-4'>
          <ProductBlock/>
          </div>
          
          <div className='pb-4'>
          <OrderBlock/>
          </div>
          <div className='pb-4'><UserBlock/></div>
          <div className='pb-4'><SalesBlock/></div>
        </div>
        <div className='px-16 pt-8'>
          <Blocks/>
        </div>
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
