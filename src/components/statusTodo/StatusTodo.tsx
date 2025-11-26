import type { Todo } from "../../types/todo"

type StatusTodoProps = {
  todos: Todo[]
}

export default function StatusTodo({ todos }: StatusTodoProps) {
  const offen = todos.filter((todo) => todo.status === "offen").length
  const erledigt = todos.filter((todo) => todo.status === "erledigt").length

  return (
    <section>
      <p>Offene Aufgaben: {offen}</p>
      <p>Erledigte Aufgaben: {erledigt}</p>
    </section>
  )
}
