import { ChangeEvent, useEffect, useState } from "react";

import "./App.css";
import TodoItem from "./Components/todoItem";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  // need state to keep track of the value in the input
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // object state to set so we know which todo item we are editing

  const [currentTodo, setCurrentTodo] = useState<Todo>({});
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // set the new state value to what's currently in the input box
    setTodo(e.target.value);
  }
  function handleEditInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,

          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  }
  function handleDeleteClick(id: number) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function handleEditClick(todo: Todo) {
    // set editing to true
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }
  function handleEditFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  function handleUpdateTodo(id: number, updatedTodo: Todo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  }
  return (
    <div className="App">
      <Container>
        <Box
          marginTop="10"
          padding="4"
          borderRadius="5"
          bg="blue.200"
          color="black"
          maxW="md"
        >
          {isEditing ? (
            <form onSubmit={handleEditFormSubmit}>
              <h2>Edit Todo</h2>

              <Input
                name="editTodo"
                type="text"
                placeholder="Edit todo"
                value={currentTodo.text}
                onChange={handleEditInputChange}
              />
              <ButtonGroup spacing="6" marginY="3">
                <Button colorScheme="pink" type="submit">
                  Update
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel htmlFor="email">Add a new todo</FormLabel>
                <Input
                  name="todo"
                  type="text"
                  placeholder="Create a new todo"
                  value={todo}
                  onChange={handleInputChange}
                />
              </FormControl>
              <ButtonGroup spacing="6">
                <Button colorScheme="blue" marginTop="3" type="submit">
                  Add
                </Button>
              </ButtonGroup>
            </form>
          )}
          <TableContainer>
            <Table size="sm" variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>SL</Th>
                  <Th>Todo name</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos.map((todo) => (
                  <TodoItem
                    todo={todo}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

export default App;
