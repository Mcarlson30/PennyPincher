// constants
const SET_TRANSACTIONS = "transactions/SET_TRANSACTIONS";
const SET_CATEGORIES = "transactions/SET_CATEGORIES";
// const REMOVE_TRANSACTION = "transactions/REMOVE_TRANSACTION";
// const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION'

const setTransactions = (transactions) => ({
    type: SET_TRANSACTIONS,
    payload: transactions
})

const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
})

// const addTransaction = (id) => ({
//     type: ADD_TRANSACTION,
//     payload: id
// })

// const removeTransaction = (id) => ({
//     type: REMOVE_TRANSACTION,
//     payload: id
// })

// const removeUser = () => ({
//     type: REMOVE_USER
// })

// thunks
export const getTransactions = () => async (dispatch) => {
    const response = await fetch('/api/transactions/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setTransactions(data))

}

export const getCategories = () => async (dispatch) => {
    const response = await fetch('/api/transactions/category', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setCategories(data))

}

export const createNewTransaction = (params) => async (dispatch) => {
    const { amount, description, categoryId, subCategoryId, receiptUrl } = params
    const formData = new FormData()
    formData.append('amount', amount)
    formData.append('description', description)
    formData.append('category_id', categoryId)
    formData.append('sub_category', subCategoryId)
    formData.append('receipt_url', receiptUrl)

    console.log('BEFORE RESPONSE')
    const response = await fetch('/api/transactions/', {
        method: "POST",
        body: formData
    });
    console.log("------!")
    const data = await response.json()
    dispatch(setTransactions(data))
    return

}

// delete a transaction
export const deleteTransaction = (transactionId) => async dispatch => {
    const response = await fetch(`api/transactions/${transactionId}`, {
        method: "DELETE",
        transactionId,
    })

    const data = await response.json()
    dispatch(setTransactions(data))
    return
}


// reducer

const initialState = { transactions: null, categories: null };

// useSelector(state => state.session.user)

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        case SET_CATEGORIES:
            return { ...state, categories: action.payload }
        // case ADD_TRANSACTION:
        //     return {}
        // case REMOVE_USER:
        //     return { user: null };
        default:
            return state;
    }
}