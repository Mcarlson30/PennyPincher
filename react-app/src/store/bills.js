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

export const createNewBill = (params) => async (dispatch) => {
    const { userId, amount, description, categoryId, subCategoryId } = params
    const formData = new FormData()
    formData.append('user_id', userId)
    formData.append('amount', amount)
    formData.append('description', description)
    formData.append('category_id', categoryId)
    formData.append('sub_category', subCategoryId)

    console.log('BEFORE RESPONSE')
    const response = await fetch('/api/bills/', {
        method: "POST",
        body: formData
    });
    console.log("------!")
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