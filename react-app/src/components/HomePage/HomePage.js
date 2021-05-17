import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../store/transaction'
import { getBills } from '../../store/bills'
import { Pie } from 'react-chartjs-2'
import './HomePage.css'
import { updateUser } from "../../store/session";
// const { Calendar } = require("node-calendar-js");
import { Modal } from '../context/Modal'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const allTransactions = useSelector(state => state.transactions.transactions)
    const bills = useSelector(state => state.bills.bills)
    const [transactions, setTransactions] = useState(null)
    const [income, setIncome] = useState('')
    const [pieClick, setPieClick] = useState('')
    const [subPieClick, setSubPieClick] = useState('')
    const [showModal, setShowModal] = useState(false);
    let current_date = new Date()
    let chartCategories = {}
    let chartSubCategories = {}
    let transactionTotal = 0
    let modalTransactions


    useEffect(() => {
        dispatch(getBills())
        dispatch(getTransactions())
    }, [dispatch]);

    useEffect(() => {
        setTransactions(allTransactions)
    }, [allTransactions])

    const categoryValues = () => {
        allTransactions.transactions.map(transaction => (
            chartCategories[transaction.category.category] = (chartCategories[transaction.category.category] + transaction.amount) || transaction.amount
        ))

        allTransactions.transactions.map(transaction => (
            chartSubCategories[transaction.sub_category] = (chartSubCategories[transaction.sub_category] + transaction.amount) || transaction.amount
        ))

        allTransactions.transactions.map(transaction => (
            transactionTotal = transactionTotal + transaction.amount
        ))

        if (pieClick) {
            modalTransactions = allTransactions.transactions.filter(transaction =>
                transaction.category.category === pieClick)
        }

        if (subPieClick) {
            modalTransactions = allTransactions.transactions.filter(transaction =>
                transaction.sub_category === subPieClick)
        }

    }

    // compare number of days between a give date and today
    const determineDate = (due_date, current_date, bill_name) => {
        const current = new Date(due_date)
        const one_day = 1000 * 60 * 60 * 24
        const Result = Math.round(current.getTime() - current_date.getTime()) / (one_day);
        const result = Result.toFixed(0);
        if (result > 0 && result <= 7) {
            return (<div>{bill_name} due in {result} day(s)</div>)
        }
        if (result >= 0 && result < 1) {
            return (
                <div>{bill_name} due TODAY!</div>
            )
        }
    }

    const updateIncome = (e) => {
        setIncome(e.target.value);
    }

    const changeIncome = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateUser(income));
        setIncome('')
    }

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setPieClick('')
        setSubPieClick('')
    }


    if (!allTransactions && !bills) {
        return null;
    }

    return (
        < div className='overview-container'>
            <div className='calendar-container'>
                <div className='income-div'>
                    <form onSubmit={changeIncome}>
                        <div className='income-title'>
                            Monthly Income ${sessionUser.income}
                        </div>
                        <div className='input-button'>
                            {console.log(income)}
                            <input
                                name='income'
                                type='number'
                                className='income-input'
                                value={income}
                                onChange={updateIncome}
                            />
                            <button type='submit'>Update</button>
                        </div>
                    </form>
                </div>
                <div className='calendar'>
                    <table width="90%" className='calendar-table'><caption>May 2021</caption><thead><tr><th class="sunday">Sun</th><th class="monday">Mon</th><th class="tuesday">Tues</th><th class="wednesday">Wed</th><th class="thursday">Thur</th><th class="friday">Fri</th><th class="saturday">Sat</th></tr></thead><tbody><tr><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day">1</td></tr><tr><td class="day">2</td><td class="day">3</td><td class="day">4</td><td class="day">5</td><td class="day">6</td><td class="day">7</td><td class="day">8</td></tr><tr><td class="day">9</td><td class="day">10</td><td class="day">11</td><td class="day">12</td><td class="day">13</td><td class="day">14</td><td class="day">15</td></tr><tr><td class="day">16</td><td class="day">17</td><td class="day">18</td><td class="day">19</td><td class="day">20</td><td class="day">21</td><td class="day">22</td></tr><tr><td class="day">23</td><td class="day">24</td><td class="day">25</td><td class="day">26</td><td class="day">27</td><td class="day">28</td><td class="day">29</td></tr><tr><td class="day">30</td><td class="day">31</td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td></tr></tbody></table>
                </div>
                <div className='bills-header'>Upcoming Bills</div>
                <div className='weekly-bills'>
                    {!bills.errors && Object.values(bills.bills).map(bill => (
                        <div className='single-bill-due' key={bill.id}>
                            <div className='bill-due'>
                                {determineDate(bill.due_date, current_date, bill.name)}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='all-chart-container'>
                <div className='chart-container'>
                    {transactions && categoryValues()}
                    <div className='category-chart'>
                        <div className='category-spending'>Category Spending</div>
                        <Pie
                            data={{
                                datasets: [{
                                    label: 'Category Spending',
                                    data: Object.values(chartCategories),
                                    legend: {
                                        display: false
                                    },
                                    backgroundColor: [
                                        '#DeeDcf',
                                        '#BFE1B0',
                                        '#99D492',
                                        '#74C67A',
                                        '#56B870',
                                        '#39A96B',
                                        '#1D9A6C',
                                        '#188977',
                                        '#137177',
                                        '#0E4D64',
                                        '#GA2F51'
                                    ],
                                    hoverOffset: 4
                                }],
                                labels: Object.keys(chartCategories),
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        onClick: function (event, ele) {
                                            setPieClick(ele.text)
                                            handleClick()
                                            // console.log('pie', pieClick)
                                        }
                                    },

                                },
                                // onHover: function (e) {
                                //     console.log(e)
                                // }
                                // onClick: function (event, ele) {
                                //     // let value = getElementAtEvent(event)
                                //     // console.log(value)
                                // }
                            }}
                        ></Pie>
                    </div>
                    <div className='sub-category-chart'>
                        <div className='sub-category-spending'>SubCategory Spending</div>
                        <Pie
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        onClick: function (event, ele) {
                                            setSubPieClick(ele.text)
                                            handleClick()
                                            // console.log('pie', pieClick)
                                        }
                                    }
                                }
                            }}
                            data={{
                                datasets: [{
                                    label: 'Category Spending',
                                    data: Object.values(chartSubCategories),
                                    backgroundColor: [
                                        '#GA2F51',
                                        '#DeeDcf',
                                        '#BFE1B0',
                                        '#99D492',
                                        '#74C67A',
                                        '#56B870',
                                        '#39A96B',
                                        '#1D9A6C',
                                        '#188977',
                                        '#137177',
                                        '#0E4D64',
                                    ],
                                    hoverOffset: 4
                                }],
                                labels: Object.keys(chartSubCategories),
                            }}></Pie>
                    </div>

                </div>
                <div className='total-spending-container'>
                    <div className='total-spending-chart'>
                        <div className='total-spending'>Total Spending</div>
                        <Pie
                            options={{
                                plugins: {
                                    legend: {
                                        // display: false
                                        position: 'right'
                                    }
                                }
                            }}
                            data={{
                                datasets: [{
                                    label: 'Category Spending',
                                    data: [transactionTotal, sessionUser.income - transactionTotal],
                                    backgroundColor: [
                                        '#GA2F51',
                                        '#DeeDcf',
                                        '#BFE1B0',
                                        '#99D492',
                                        '#74C67A',
                                        '#56B870',
                                        '#39A96B',
                                        '#1D9A6C',
                                        '#188977',
                                        '#137177',
                                        '#0E4D64',
                                    ],
                                    hoverOffset: 4
                                }],
                                labels: ['Spent', 'Remaining']
                            }}

                        ></Pie>
                    </div>
                </div>
                {showModal && (
                    <Modal onClose={closeModal}>
                        <div className='modal-transaction-div'>
                            <div className='recent-transactions'>Transactions</div>
                            <div className='table-headers'>
                                <div className='id'>ID</div>
                                <div className='description-header'>Description</div>
                                <div className='category-header'>Category</div>
                                <div className='sub-category-header'>Sub Category</div>
                                <div className='amount-header'>Amount</div>
                                <div className='date-header'>Date</div>
                            </div>
                            <div className='transaction-modal'>
                                <div className='transactions-list'>
                                    {console.log('modal', modalTransactions)}
                                    {Object.values(modalTransactions).map(transaction => (
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
                                                {/* {transaction.created_at} */}
                                            </div>
                                            {/* <button
                                            value={transaction.id}
                                            onMouseOver={() => setTransactionId(transaction.id)}
                                            onClick={handleDeleteTransaction}
                                            className='editBtn'
                                        ><i class="far fa-trash-alt"></i></button> */}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>

        </div >
    );
}
export default HomePage;