import { useState } from "react"

export default function AddTodo() {
  const [inputValue, setInputValue] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Neue Todo erstellt:", inputValue)
    setInputValue("")
  }

  return (
    <section>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Erstellen</button>
    </section>
  )
}
