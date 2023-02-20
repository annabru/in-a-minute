// Define interface for state
interface CounterState {
  count: number;
}

// Define initial state
const initialState: CounterState = { count: 0 };

// Define action types as constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Define action interfaces
interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

// Define action type
type CounterAction = IncrementAction | DecrementAction;

// Define reducer function
function counterReducer(state: CounterState = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Action creators
function increment(): IncrementAction {
  return { type: INCREMENT };
}

function decrement(): DecrementAction {
  return { type: DECREMENT };
}

export default counterReducer;
