import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBills, createNewBill } from '../../store/bills'

import './Bills.css'

function NewBill() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const categories = useSelector(state => state.transactions.categories)
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [dueDate, setDueDate] = useState('');


    // console.log('categories', categories)
    const handleNewBill = async (e) => {
        e.preventDefault();
        const params = { amount, description, categoryId, subCategoryId, dueDate }
        console.log(params)
        dispatch(createNewBill(params))
        setAmount('')
        setDescription('')
        setSubCategoryId('')
        setCategoryId('')
        setDueDate('')
        dispatch(getBills())
    }

    if (!categories) {
        return null;
    }

    return (
        <div className='add-bill-container'>
            <div className='add-bill'>
                Add A New Bill
            </div>
            <form className='billForm' onSubmit={handleNewBill}>
                <input
                    className='form-input-description'
                    type='text'
                    value={description}
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className='form-input-category'
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
                    className='form-input-sub-category'
                    type='number'
                    onChange={(e) => setSubCategoryId(e.target.value)}
                >
                    <option value='select'>Select SubCategory</option>
                    {categoryId && categories.categories[categoryId - 1].sub_categories.map(category => (
                        <option value={category.sub_category}>{category.sub_category}</option>
                    ))}
                </select>
                <input
                    className='form-input-amount'
                    type='number'
                    value={amount}
                    placeholder='Amount'
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    className='form-input-due-date'
                    type='date'
                    value={dueDate}
                    placeholder='Due Date'
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button className='billButton' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default NewBill