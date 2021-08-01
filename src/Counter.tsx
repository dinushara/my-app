import React from 'react'

const Counter = (props:{ value:any, onIncrement:any, onDecrement:() => void,onIncrementAsync:() => { type: string; } }) =>
      <div>
        <button onClick={props.onIncrement}>
          Increment
        </button>
        <button onClick={props.onIncrementAsync}>
          Increment
        </button>
        {' '}
        <button onClick={props.onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {props.value} times
        </div>
      </div>

export default Counter