import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, createNewTransaction } from '../../store/transaction';
import './Transactions.css'

function NewTransaction() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.transactions.categories)
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [receiptUrl, setReceiptUrl] = useState('');
    // const [subCategory, setSubCategory] = useState('');


    // useEffect(() => {
    //     setSubCategoryId(categories.categories)
    // })

    // console.log('categories', categories)
    const handleNewTransaction = async (e) => {
        e.preventDefault();
        const params = { amount, description, categoryId, subCategoryId, receiptUrl }
        console.log(params)
        dispatch(createNewTransaction(params))
        setAmount('')
        setDescription('')
        setReceiptUrl('')
        setSubCategoryId('')
        setCategoryId('')
        dispatch(getTransactions())
    }

    if (!categories) {
        return null;
    }

    return (
        <div className='add-transaction-container'>
            <div className='add-transaction'>
                Add A Transaction
            </div>
            <form className='transactionForm' onSubmit={handleNewTransaction}>
                <input
                    className='form-input'
                    type='text'
                    value={description}
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className='form-input'
                    placeholder='Select'
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {/* {console.log('category', categories.categories)} */}
                    <option value="select">Select Category</option>
                    {categories.categories.map(category => (
                        <option value={category.id} key={category.id}>{category.category}</option>
                    ))}
                </select>
                <select
                    className='form-input'
                    type='number'
                    onChange={(e) => setSubCategoryId(e.target.value)}
                >
                    <option value='select'>Select SubCategory</option>
                    {categoryId && categories.categories[categoryId - 1].sub_categories.map(category => (
                        <option value={category.sub_category}>{category.sub_category}</option>
                    ))}
                </select>
                <input
                    className='form-input-number'
                    type='number'
                    value={amount}
                    placeholder='Amount'
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    className='form-input'
                    type='test'
                    value={receiptUrl}
                    placeholder='Receipt Url'
                    onChange={(e) => setReceiptUrl(e.target.value)}
                />
                <button className='transactionButton' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default NewTransaction