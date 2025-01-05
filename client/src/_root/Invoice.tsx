import CreateInvoiceModal from '@/components/shared/Invoice/createInvoice'
import TableInvoice from '@/components/shared/Invoice/table'
import { HandCoins } from 'lucide-react'

const Invoice = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-secondarycolor flex gap-1 items-center'><HandCoins size={35}/> Számlák</h1>
        <CreateInvoiceModal />
      </div>
      <div className='mt-5'> 
        <TableInvoice />
      </div>
    </div>
  )
}

export default Invoice