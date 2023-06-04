import Todo from "./Todo"
import React, { useState, useEffect } from "react";
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB,  } from "../db/operation";
function TodoList(){

    const[input, setInput] = useState("");
    const[todos, setTodos] = useState([])
    const[toggled, setToggle] = useState(false)

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo()
        setInput("")
    }
    const toggleCompleted = (id) => {
        toggled ? setToggle(false) : setToggle(true);
        const editedList = todos.map((todo) => {
            if(id === todo.id){
                updateTodosDB(id, {...todo, completed: !todo.completed})
                return{...todo, completed: !todo.completed}
            }
            return todo
        })
        setTodos(editedList)
    }

    const addTodo = () => {
        const newTodo = {
            desc: input,
            completed: false,
        }
        addTodosDB(newTodo)
        setTodos([...todos, newTodo])
    }
    const deleteTodo = (id) => {
        const remainingTodo = todos.filter((item)=>{
            return id !== item.id;
        })
        deleteTodoDB(id)
        setTodos(remainingTodo)
    }
    const editTodo = (id, newDesc) => {
        const editedList = todos.map((todo)=>{
            if(id === todo.id){
                updateTodosDB(id, {...todo, desc: newDesc})
                return {...todo, desc : newDesc}
            }
            return todo
        })
        setTodos(editedList)
    }
    useEffect(() => {
        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        })
    }, [todos.length])
    return (
        <div>
            <h1>TodoList</h1>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="">Add a todo</label>
                    <input type="text" onChange={handleChange} value={input}/>
                    <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => {
                    return <Todo 
                    key={todo.id} 
                    id={todo.id} 
                    desc={todo.desc}
                    completed={todo.completed}
                    toggleCompleted={toggleCompleted}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    />
                })}
            </ul>

        </div>
    )
  }


  export default TodoList