
import React, {useState, useEffect} from "react";
import axios from "axios";




const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");


    useEffect(()=>{
         axios.get("http://127.0.0.1:5010/todos")
         .then(res=> setTodos(res.data.list))
         .catch(err => console.log(err.response.data))
    },[])



    function addTodo(){
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

    return (
        <div>
            <h1>Todo</h1>
                <form onSubmit={addTodo}>
                    <input type="text" placeholder="Enter todo" 
                       value={newTodo}
                       onChange={e => setNewTodo(e.target.value)}
                    />
                    <button>Add</button>
                </form>



            <ul>
                {
                    todos.length > 0 && todos.map(todo => (
                        <li key={todo.id}>
                            {todo.title}
                            <select value={todo.completed?"completed":"pending"}>
                                <option value="completed">completed</option>
                                <option value="pending">pending</option>
                            </select>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Todo;