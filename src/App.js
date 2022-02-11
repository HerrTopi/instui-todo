import { useState } from 'react';
import { TextInput, Heading, Grid } from '@instructure/ui'
import Item from './components/Item'
import Footer from './components/Footer'

const App = () => {
  const [todos, setTodos] = useState([])
  const [idCounter, setIdCounter] = useState(0)
  const [todo, setTodo] = useState("")
  const [filter, setFilter] = useState("all")

  const handleKeyDown = ({ code }) => {
    if (code === "Enter" && todo) {
      setTodos([...todos, { text: todo, done: false, id: idCounter + 1 }])
      setIdCounter(idCounter + 1)
      setTodo('')
    }
  }

  const onToggleDone = (id) => (done) =>
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done } : todo))

  const onDelete = (id) => () =>
    setTodos(todos.filter(todo => todo.id !== id))

  const onFilter = (selectedFilter) => () => {
    setFilter(selectedFilter)
  }

  const onTextEdited = (id) => (text) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text } : todo))
  }

  return (
    <div style={{ margin: "0 25%" }}>
      <Grid >
        <Grid.Row >
          <Grid.Col textAlign="center">
            <Heading margin="medium none none none">TODOS</Heading>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row >
          <Grid.Col textAlign='center'>
            <TextInput
              renderLabel=" "
              placeholder="What needs to be done?"
              onKeyPress={handleKeyDown}
              value={todo}
              onChange={(event, value) =>
                setTodo(value)
              }
            />
          </Grid.Col>
        </Grid.Row>
        {todos.filter(({ done }) =>
          filter === "active" ? !done :
            filter === "completed" ? done :
              true).map((todo, index) =>
                <Grid.Row key={`todo-list-item-${index}`} rowSpacing='none'>
                  <Grid.Col>
                    <Item 
                      todo={todo} 
                      onToggleDone={onToggleDone(todo.id)} 
                      onDelete={onDelete(todo.id)}
                      onTextEdited={onTextEdited(todo.id)}
                    />
                  </Grid.Col>
                </Grid.Row>
              )}
        <Grid.Row rowSpacing='none'>
          <Grid.Col>
            <Footer itemsLeft={todos.filter(({ done }) => !done).length} onFilter={onFilter} filter={filter}></Footer>
          </Grid.Col>
        </Grid.Row>
      </Grid >
    </div>
  );
}

export default App