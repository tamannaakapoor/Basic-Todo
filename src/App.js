
import './App.css';
import Header from "./MyComponents/Header";
import { AddTodo } from "./MyComponents/AddTodo";
import {Todos} from "./MyComponents/Todos";
import {Footer} from "./MyComponents/Footer";
import {About} from "./MyComponents/About";
import React,{useEffect, useState} from 'react';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("I am ondelete of todo",todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo=(title,desc)=>{
    let sno;
    console.log("I am adding this todo",title,desc);
    if(todos.length===0){
      sno=0;
    }
    else{
    sno=todos[todos.length-1].sno+1
  }
    const myTodo={
      sno:sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }
  const[todos,setTodos] = useState(initTodo);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  return (
    <>
    <Router>
       <Header title="MyTodosList" serachbar={false}/>
       <Routes>
          <Route exact path="/" element={
            <>
            <AddTodo addTodo={addTodo}/>
            <Todos todos={todos} onDelete={onDelete} />
            </>
          }/>
          <Route exact path="/about" element={<About/>} />
        </Routes>
       <Footer/>
    </Router>
    </>
  );
}

export default App;
