
import React, {useState, useEffect} from "react";
import axios from "axios";




const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const [updateTodo, setUpdateTodo] = useState("");

    console.log(todos)


    useEffect(()=>{
         axios.get("http://127.0.0.1:5010/todos")
         .then(res=> setTodos(res.data.list))
         .catch(err => console.log(err.response.data))
    },[])



    function addTodo(){
          if(updateTodo==""){
              createToDo()
            }
            else{
                updateTitle(updateTodo)
            }
    }


    function createToDo(){
        axios.post("http://127.0.0.1:5010/add",{
            title: newTodo,
            completed: false
        })
        
        .then(res => {
            setTodos(res.data.list)
            setNewTodo("")
        })
        .catch(err => console.log(err.response.data))
    }

    function updateTitle(){
        axios.put(`http://127.0.0.1:5010/update/${updateTodo}`,{
            title: newTodo
        })
        .then(res => {
            setTodos(res.data.list)
            setUpdateTodo("")
            setNewTodo("")
        })
        .catch(err => console.log(err.response.data))
   }





    function updateStatus(id, status){
         axios.put(`http://127.0.0.1:5010/update/${id}`,{
              completed: status === "completed" ? true : false
         })
         .then(res => setTodos(res.data.list))
         .catch(err => console.log(err.response.data))
    }

    function deleteToDo(id){
         axios.delete(`http://127.0.0.1:5010/delete/${id}`)
            .then(res => setTodos(res.data.list))
            .catch(err => console.log(err.response.data))
    }
        

    return (
        <div>
            <h3>{updateTodo==""?"Add ToDo":"Update ToDO"}</h3>
                <form onSubmit={addTodo}>
                    <input type="text" placeholder={updateTodo==""?"Add ToDo":"Update ToDO"} 
                       value={newTodo}
                       onChange={e => setNewTodo(e.target.value)}
                    />
                    <button type="submit">{updateTodo==""?"Add":"Update"}</button>
                </form>



            <ul>
                {
                    todos.length > 0 && todos.map(todo => (
                        <li key={todo.id}>
                            <p>{todo.title}</p>
                            <select value={todo.completed?"completed":"pending"}
                                onChange={e => updateStatus(todo.id, e.target.value)}
                            >
                                <option value="completed">completed</option>
                                <option value="pending">pending</option>
                            </select>

                            <button onClick={
                                ()=>{setUpdateTodo(todo.id)
                                    setNewTodo(todo.title)
                                }
                                
                                }> U </button>

                            <button onClick={()=>deleteToDo(todo.id)}> D </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Todo;