// constants

const SET_BILLS = 'bills/SET_BILLS';
const REMOVE_BILLS = 'bills/REMOVE_BILLS';


const setBills = (bills) => ({
    type: SET_BILLS,
    payload: bills
})

const removeBill = (id) => ({
    type: REMOVE_BILLS,
    payload: id
})

// thunks
export const getBills = () => async (dispatch) => {
    const response = await fetch('/api/bills/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    dispatch(setBills(data))
}

// delete a bill
export const deleteBill = (billId) => async dispatch => {
    const response = await fetch(`api/bills/${billId}`, {
        method: "DELETE",
        billId,
    })

    const data = await response.json()
    dispatch(setBills(data))
    return
}

// reducer

const initialState = { bills: null };

export default function billReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BILLS:
            return { ...state, bills: action.payload };
        default:
            return state;
    }
}