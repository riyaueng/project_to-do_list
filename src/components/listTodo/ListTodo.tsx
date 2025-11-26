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
    <ul className="ml-2 mr-2">
      {todos.map((todo, index) => (
        <li key={index}>
          <div className="flex border-b py-2 border-gray-300  ">
            {editIndex === index ? (
              <div>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border rounded px-3 py-2 mb-1"
                />
                <button onClick={() => handleSave(index)} className="m-2 text-2xl">
                  ☑️
                </button>
              </div>
            ) : (
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-4 items-start">
                  <input
                    type="checkbox"
                    checked={todo.status === "erledigt"}
                    onChange={() => toggleStatus(index)}
                    className="mt-1.5 w-5 h-5"
                  />
                  <div className={todo.status === "erledigt" ? "text-lg line-through" : ""}>
                    <p
                      className={`${
                        todo.status === "erledigt"
                          ? "line-through"
                          : isOverdue(todo)
                          ? "text-red-500 font-bold text-lg"
                          : "text-lg"
                      }`}>
                      {todo.text}
                      {isOverdue(todo) && "!"}
                    </p>
                    <p className="text-gray-400 text-sm">{todo.createdAt && todo.createdAt.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex row gap-3">
                  <button
                    onClick={() => {
                      setEditIndex(index)
                      setEditText(todo.text)
                    }}>
                    <p className="text-2xl">✏️</p>
                  </button>

                  <button onClick={() => deleteTodo(index)}>
                    <p className="text-2xl">🗑️</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
