import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from "react-router-dom";
import { getTransactions, getCategories, deleteTransaction } from "../../store/transaction";
import NewTransaction from './NewTransaction'
import './Transactions.css'

function Transaction() {
    const dispatch = useDispatch();
    const allTransactions = useSelector(state => state.transactions.transactions)
    const categories = useSelector(state => state.transactions.categories)
    const [transactionId, setTransactionId] = useState('')
    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getCategories())
    }, [dispatch]);

    const handleDeleteTransaction = async () => {
        dispatch(deleteTransaction(transactionId))
        dispatch(getTransactions())
    }

    if (!allTransactions) {
        return null;
    }

    return (
        < div className='transactions-container'>
            <div className='inner-div'>
                {/* {console.log("transactions", allTransactions.transactions)} */}
                <div className='new-transaction'>
                    <NewTransaction categories={categories} />
                </div>
                <div className='recent-transactions'>Recent Transactions</div>
                <div className='table-headers'>
                    <div className='id'>ID</div>
                    <div className='description-header'>Description</div>
                    <div className='category-header'>Category</div>
                    <div className='sub-category-header'>Sub Category</div>
                    <div className='amount-header'>Amount</div>
                    <div className='date-header'>Date</div>
                    <div className='delete-header'>Delete</div>
                </div>
                <div className='transactions-list'>
                    {Object.values(allTransactions.transactions).map(transaction => (
                        <div className='single-transaction' key={transaction.id}>
                            <div className='transaction-number'>{transaction.id}</div>
                            <div className='description'>
                                {transaction.description}</div>
                            <div className='category'>
                                {transaction.category.category}
                            </div>
                            <div className='sub-category'>
                                {transaction.sub_category}
                            </div>
                            <div className='amount'>
                                ${transaction.amount}
                            </div>
                            <div className='created-at'>
                                {transaction.created_at.split(' ', 4).join(' ')}
                            </div>
                            <button
                                value={transaction.id}
                                onMouseOver={() => setTransactionId(transaction.id)}
                                onClick={handleDeleteTransaction}
                                className='editBtn'
                            ><i class="far fa-trash-alt"></i></button>
                        </div>

                    ))}
                </div>
            </div>
        </div >
    );
}
export default Transaction;