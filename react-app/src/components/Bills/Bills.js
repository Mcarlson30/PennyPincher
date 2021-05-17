import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getBills, deleteBill } from '../../store/bills'
import { getTransactions, getCategories } from "../../store/transaction";
import NewBill from './NewBill'
import './Bills.css'

function Bills() {
    const dispatch = useDispatch();
    // const allTransactions = useSelector(state => state.transactions.transactions)
    const categories = useSelector(state => state.transactions.categories)
    const bills = useSelector(state => state.bills.bills)
    const [billId, setBillId] = useState('')

    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getCategories())
        dispatch(getBills())
    }, [dispatch]);

    const handleDeleteBill = async () => {
        dispatch(deleteBill(billId))
        dispatch(getBills())
    }

    if (!bills) {
        return null;
    }

    return (
        < div className='bills-container'>
            <div className='inner-div'>
                {console.log("tbills", bills.bills)}
                <div className='new-bill'>
                    <NewBill categories={categories} />
                </div>
                <div className='upcoming-bills'>Monthly Bills</div>
                <div className='table-headers-bill'>
                    {/* <div className='id'>ID</div> */}
                    <div className='name-header-bill'>Name</div>
                    <div className='category-header-bill'>Category</div>
                    <div className='sub-category-header-bill'>Sub Category</div>
                    <div className='amount-header-bill'>Amount</div>
                    <div className='due-date-header-bill'>Due Date</div>
                    <div className='delete-header-bill'>Delete</div>
                </div>
                <div className='bills-list'>
                    {Object.values(bills.bills).map(bill => (
                        <div className='single-bill' key={bill.id}>
                            {/* <div className='transaction-number'>{bill.id}</div> */}
                            <div className='description-bill'>
                                {bill.name}</div>
                            <div className='category-bill'>
                                {bill.category_id.category}
                            </div>
                            <div className='sub-category-bill'>
                                {bill.sub_category}
                            </div>
                            <div className='amount-bill'>
                                ${bill.amount}
                            </div>
                            <div className='due-date-bill'>
                                {bill.due_date.split(' ', 4).join(' ')}
                            </div>
                            <button
                                value={bill.id}
                                onMouseOver={() => setBillId(bill.id)}
                                onClick={handleDeleteBill}
                                className='editBtn-bill'
                            ><i class="far fa-trash-alt"></i></button>
                        </div>

                    ))}
                </div>
            </div>
        </div >
    );
}
export default Bills;