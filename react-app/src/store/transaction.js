// constants
const SET_TRANSACTIONS = "transactions/SET_TRANSACTIONS";
const REMOVE_TRANSACTION = "Transactions/REMOVE_TRANSACTION";

const setTransactions = (transactions) => ({
    type: SET_TRANSACTIONS,
    payload: transactions
})

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


// reducer

const initialState = { transactions: null };

// useSelector(state => state.session.user)

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return { transactions: action.payload };
        // case REMOVE_USER:
        //     return { user: null };
        default:
            return state;
    }
}