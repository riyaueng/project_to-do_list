import AddTodo from "../../components/addTodo/AddTodo"
import ListTodo from "../../components/listTodo/ListTodo"
import StatusTodo from "../../components/statusTodo/StatusTodo"
import { useState } from "react"
import type { Todo } from "../../types/todo"

export default function Home() {
  const [inputTodo, setInputTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const toggleStatus = (index: number) => {
    setTodos((prev) =>
      prev.map((todo, i) => (i === index ? { ...todo, status: todo.status === "offen" ? "erledigt" : "offen" } : todo))
    )
  }

  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index))
  }

  const updateTodo = (index: number, newText: string) => {
    setTodos((prev) => prev.map((todo, i) => (i === index ? { ...todo, text: newText } : todo)))
  }

  return (
    <>
      <section className="mb-6">
        <h1>Todo-Liste</h1>
        <p className="text-lg">Willkommen! Was möchtest du heute erledigen?</p>
      </section>
      <AddTodo inputTodo={inputTodo} setInputTodo={setInputTodo} addTodo={addTodo} />
      <ListTodo todos={todos} toggleStatus={toggleStatus} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <StatusTodo todos={todos} />
    </>
  )
}
