import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from "react-router-dom";
import { getTransactions, getCategories } from "../../store/transaction";
import NewTransaction from './NewTransaction'
import './Transactions.css'

function Transaction() {
    const dispatch = useDispatch();
    const allTransactions = useSelector(state => state.transactions.transactions)
    const categories = useSelector(state => state.transactions.categories)
    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getCategories())
    }, [dispatch]);

    if (!allTransactions) {
        return null;
    }

    return (
        < div className='transactions-container'>
            { console.log("transactions", allTransactions.transactions)}
            <div className='new-transaction'>
                <NewTransaction categories={categories} />
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
                            {transaction.created_at}
                        </div>
                    </div>

                ))}
            </div>
        </div >
    );
}
export default Transaction;