import { useState } from "react";

function App() {

const [count, setCount] =useState(0)


function myincrement(){
  setCount(count+1)
}


function mydecrement(){
  if(count>0){
    setCount(count-1)
  }

  let btnstyle={ }
  
}

  return (
    <>
      <h2>count :{count} </h2>
      <button onClick={myincrement} style={background}>+</button>
      <button onClick={mydecrement}>-</button>
    </>
  );
}

export default App;