import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions, getCategories } from '../../store/transaction'
import { getBills } from '../../store/bills'
import { Pie } from 'react-chartjs-2'
import './HomePage.css'
const { Calendar } = require("node-calendar-js");

function HomePage() {
    const dispatch = useDispatch();
    const allTransactions = useSelector(state => state.transactions.transactions)
    const categories = useSelector(state => state.transactions.categories)
    const bills = useSelector(state => state.bills.bills)
    const [transactionId, setTransactionId] = useState('')
    let current_date = new Date()
    let chartCategories = {}
    let chartSubCategories = {}

    const categoryValues = () => {
        allTransactions.transactions.map(transaction => (
            chartCategories[transaction.category.category] = (chartCategories[transaction.category.category] + transaction.amount) || transaction.amount
        ))

        allTransactions.transactions.map(transaction => (
            chartSubCategories[transaction.sub_category] = (chartSubCategories[transaction.sub_category] + transaction.amount) || transaction.amount
        ))

    }

    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getCategories())
        dispatch(getBills())
    }, [dispatch]);

    // compare number of days between a give date and today
    const determineDate = (due_date, current_date, bill_name) => {
        const current = new Date(due_date)
        const one_day = 1000 * 60 * 60 * 24
        const Result = Math.round(current.getTime() - current_date.getTime()) / (one_day);
        const result = Result.toFixed(0);
        if (result > 0 && result <= 7) {
            return (<div>{bill_name} due in {result} day(s)</div>)
        }
        if (result === 0) {
            return (
                <div>{bill_name} due TODAY!</div>
            )
        }
    }


    if (!allTransactions) {
        return null;
    }

    return (
        < div className='overview-container'>
            <div className='calendar-container'>
                <div className='calendar'>
                    <table width="100%"><caption>May 2021</caption><thead><tr><th class="sunday">Sun</th><th class="monday">Mon</th><th class="tuesday">Tues</th><th class="wednesday">Wed</th><th class="thursday">Thur</th><th class="friday">Fri</th><th class="saturday">Sat</th></tr></thead><tbody><tr><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day">1</td></tr><tr><td class="day">2</td><td class="day">3</td><td class="day">4</td><td class="day">5</td><td class="day">6</td><td class="day">7</td><td class="day">8</td></tr><tr><td class="day">9</td><td class="day">10</td><td class="day">11</td><td class="day">12</td><td class="day">13</td><td class="day">14</td><td class="day">15</td></tr><tr><td class="day">16</td><td class="day">17</td><td class="day">18</td><td class="day">19</td><td class="day">20</td><td class="day">21</td><td class="day">22</td></tr><tr><td class="day">23</td><td class="day">24</td><td class="day">25</td><td class="day">26</td><td class="day">27</td><td class="day">28</td><td class="day">29</td></tr><tr><td class="day">30</td><td class="day">31</td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td></tr></tbody></table>
                </div>
                <div className='bills-header'>Upcoming Bills</div>
                <div className='weekly-bills'>
                    {Object.values(bills.bills).map(bill => (
                        <div className='single-bill-due' key={bill.id}>
                            <div className='bill-due'>
                                {determineDate(bill.due_date, current_date, bill.name)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='chart-container'>
                {console.log(allTransactions)}
                {categoryValues()}
                <div className='category-chart'>
                    <div className='category-spending'>Category Spending</div>
                    {console.log('asdasdas', chartCategories)}
                    <Pie
                        data={{
                            datasets: [{
                                label: 'Category Spending',
                                data: Object.values(chartCategories),
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
                            }],
                            labels: Object.keys(chartCategories),
                        }}></Pie>
                </div>
                <div className='sub-category-chart'>
                    <div className='sub-category-spending'>SubCategory Spending</div>
                    <Pie
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
                            }],
                            labels: Object.keys(chartSubCategories),
                        }}></Pie>
                </div>
            </div>
        </div >
    );
}
export default HomePage;