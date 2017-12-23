import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';

const initialState = { count: 0 };

function reducer(state = { count: 0 }, action){
    switch (action.type) {
        case 'INCREMENT': return {count: state.count + action.amount};
        case 'DECREMENT': return {count: state.count - action.amount};
        case 'RESET': return { count: 0 };
        default: return state;
    }
}

// Action Creators 
function incrementAc(amount){
    return { type: 'INCREMENT', amount };
}

function decrementAc(amount){
    return { type: 'DECREMENT', amount };
}

function resetAc() {
    return { type: "RESET" };
}

// create Redux Store
const store = createStore(reducer, initialState);

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = { count: 0 };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    increment() {
        let amount = parseInt( this.refs.amount.value || 1 );
        store.dispatch(incrementAc(amount));
    }

    decrement() {
        let amount = parseInt( this.refs.amount.value || 1 ) ;
        store.dispatch(decrementAc(amount));
    }

    reset() {
        store.dispatch(resetAc());
    }

    render() {
        const count = store.getState().count;
        return (
            <div className="counter">
                <span className="count">{count}</span>

                <div className="buttons">
                    <button className="decrement" onClick={this.decrement}>-</button>
                    <button className="reset" onClick={this.reset}>R</button>
                    <button className="increment" onClick={this.increment}>+</button>
                </div>

                <input type="text" ref="amount" defaultValue="1" />
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('root'));