import React from 'react'
import TopBrandsTable from './TopBrands'
import TopProdTable from './TopProd'
import TopCategoriesTable from './TopCategory'
import { ProductBlock } from './ProductBlock'
import { OrderBlock} from './OrdersBlock'
import { UserBlock } from './UserBlock'
import { SalesBlock } from './SalesBlock'
import { Blocks } from './Blocks'
import { User } from '../user/User'

export const Dashboard = () => {
  return (
    <div>
      <div className='flex justify-between px-16 pt-8'>
        <p className=' text-2xl font-semibold'>Dashboard</p>
        <div><User/></div>
      </div>
        <div className='pt-8 flex px-16'>
          <div className='w-1/3'><div className='pb-4'>
          <ProductBlock/>
          </div>
          
          <div className='pb-4'>
          <OrderBlock/>
          </div>
          <div className='pb-4'><UserBlock/></div>
          <div className='pb-4'><SalesBlock/></div></div>
          <div className='w-2/3'>
            <img src="https://matheusfacure.github.io/python-causality-handbook/_images/06-Grouped-and-Dummy-Regression_2_0.png" alt=''/>
          </div>
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
