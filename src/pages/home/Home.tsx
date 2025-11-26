import AddTodo from "../../components/addTodo/AddTodo"
import ListTodo from "../../components/listTodo/ListTodo"
import StatusTodo from "../../components/statusTodo/StatusTodo"

export default function Home() {
  return (
    <>
      <section>
        <h1>Todo-Liste</h1>
        <p>Willkommen! Was möchtest du heute erledigen?</p>
      </section>
      <AddTodo />
      <ListTodo />
      <StatusTodo />
    </>
  )
}
