import { useState, useEffect} from 'react';
import axios from 'axios'; 
import './App.css';

//import { a } from 'vitest/dist/suite-GoqTeX8s.js';

function App () {
  const [ todoList, setTodoList ] = useState ( [] ); 

  useEffect (  () => {
    fetchTodoList()

  }, [] ); 

  function deleteMe ( id ) {
    console.log ( 'in deleteMe:', id); 
    axios.delete(`/api/todo?id=${ id }`).then ( function ( response ) {
      console.log ( 'back from DELETE:', response.data); 
      fetchTodoList(); 
    }).catch ( function ( err ) {
      console.log( err); 
      alert('error deleting todo item'); 

    })
  }

  function fetchTodoList(){
    console.log ( 'in fetchTodoList' ); 
    axios.get( '/api/todo' ).then (function ( response) {
      setTodoList( response.data); 

    }).catch (function ( err ){
      console.log( err ); 
      alert ('error getting todo List'); 
    })
  }
function toggleMe ( id ) {
  console.log ( 'intoggleMe:', id); 
const objectToSend = {
  id: id
}
axios.put ( '/api/todo', objectToSend ).then ( function ( response ) {
  console.log ( 'back from PUT:', response.data); 
  fetchTodoList(); 
}).catch ( function ( err ) {
  console.log ( err); 
  alert ('error upbdating todo item'); 

})

}
  return (
    <div>
      <h1>TO DO APP</h1>

      
      {
        todoList.map( ( item ) => (
          <p className = { `complete-${ item.complete }` }key ={ item.id}> { item.name} 
          <button onClick={ () => { toggleMe ( item.id ) }}>Toggle Complete</button>
          <button onClick={ () => { deleteMe ( item.id ) }}>Delete</button>
          </p>
        ))
      }
    </div>
  );

}

export default App
