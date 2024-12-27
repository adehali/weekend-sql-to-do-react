import { useState, useEffect} from 'react';
import axios from 'axios'; 
import './App.css';

//import { a } from 'vitest/dist/suite-GoqTeX8s.js';

function App () {
  const [ todoList, setTodoList ] = useState ( [] ); 
  const [ newItemName, setNewItemName ] = useState ( '' );

  useEffect (  () => {
    fetchTodoList();
  }, [] ); 

  function addItem () {
    const objectToSend = {
      name: newItemName
    }
    axios.post( '/api/todo', objectToSend ).then( function( response ) {
      console.log( 'back from POST:', response.data); 
      fetchTodoList(); 
    }).catch( function ( err ) {
      console.log(err); 
      alert('error adding new item'); 
    })
  }

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
    console.log( 'in fetchTodoList' ); 
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

      <h2>Current List</h2>
      {
        todoList.map( ( item ) => (
          <p className = { `complete-${ item.complete }` }key ={ item.id}> { item.name} 
          <button onClick={ () => { toggleMe ( item.id ) }}>Toggle Complete</button>
          <button onClick={ () => { deleteMe ( item.id ) }}>Delete</button>
          </p>
        ))
      }
      <h2>Create New List </h2>
      <input type='text' placeholder='name' onChange={ ( e )=>{ setNewItemName ( e.target.value)}}/>
      <button onClick={addItem}>Add Item</button>
     <p>{ JSON.stringify( newItemName )}</p>
    </div>
    
  );

}

export default App
