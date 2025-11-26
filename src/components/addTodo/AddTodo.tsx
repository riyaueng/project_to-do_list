import type { Todo } from "../../types/todo"

type AddTodoProps = {
  inputTodo: string
  setInputTodo: React.Dispatch<React.SetStateAction<string>>
  addTodo: (newTodo: Todo) => void
}

export default function AddTodo({ inputTodo, setInputTodo, addTodo }: AddTodoProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addTodo({
      text: inputTodo,
      createdAt: new Date(),
      status: "offen",
    })
    setInputTodo("")
  }

  return (
    <section className="flex mb-4">
      <input
        type="text"
        value={inputTodo}
        onChange={handleInputChange}
        placeholder="Erstelle eine neue Aufgabe"
        className="border-gray-300 border rounded-l px-4 py-2"
      />
      <button className="text-white bg-[#646cff] px-4 py-2 rounded-r" onClick={handleButtonClick}>
        Erstellen
      </button>
    </section>
  )
}
