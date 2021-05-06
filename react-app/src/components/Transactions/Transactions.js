import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { getTransactions } from "../../store/transaction";
import './Transactions.css'

function Transaction() {
    const dispatch = useDispatch();
    const allTransactions = useSelector(state => state.transactions.transactions)
    let count = 1;
    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch]);


    if (!allTransactions) {
        return null;
    }

    return (
        < div className='transactions-container'>
            <div className='transactions-list'>
                {Object.values(allTransactions).map(transaction => (
                    <div className='single-transaction'>
                        <div className='transaction-number'>{count}.</div>
                        <div className='description'>
                            {transaction[0].description}</div>
                        <div className='category'>
                            {transaction[0].category.category}
                        </div>
                        <div className='sub-category'>
                            {transaction[0].sub_category}
                        </div>
                        <div className='amount'>
                            ${transaction[0].amount}
                        </div>
                        <div className='created-at'>
                            {transaction[0].created_at}
                        </div>
                    </div>

                ))}
            </div>
            { console.log("transactions", allTransactions)}
            hey
        </div >
    );
}
export default Transaction;