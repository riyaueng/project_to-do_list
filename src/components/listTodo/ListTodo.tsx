import { useEffect, useState } from "react"
import type { Todo } from "../../types/todo"

type ListTodoProps = {
  todos: Todo[]
  toggleStatus: (index: number) => void
  deleteTodo: (index: number) => void
  updateTodo: (index: number, newText: string) => void
}

export default function ListTodo({ todos, toggleStatus, deleteTodo, updateTodo }: ListTodoProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>("")
  const [now, setNow] = useState(() => Date.now())

  const handleSave = (index: number) => {
    updateTodo(index, editText)
    setEditIndex(null)
  }

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const isOverdue = (todo: Todo) => todo.status === "offen" && now - new Date(todo.createdAt).getTime() > 60000

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <div className="flex items-center justify-between border-b py-2 border-gray-300">
            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <button onClick={() => handleSave(index)}>☑️</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={todo.status === "erledigt"} onChange={() => toggleStatus(index)} />
                <div className={todo.status === "erledigt" ? "line-through" : ""}>
                  <p
                    className={`${
                      todo.status === "erledigt" ? "line-through" : isOverdue(todo) ? "text-red-500 font-bold" : ""
                    }`}>
                    {todo.text} {isOverdue(todo) && "❗️"}
                  </p>
                  <p>{todo.createdAt && todo.createdAt.toLocaleString()}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditIndex(index)
                      setEditText(todo.text)
                    }}>
                    ✏️
                  </button>
                  <button onClick={() => deleteTodo(index)}>🗑️</button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
