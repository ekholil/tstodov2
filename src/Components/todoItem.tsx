import { Button, ButtonGroup, Td, Tr } from "@chakra-ui/react";

interface Todo {
  id: number,
  text: string
}

export default function TodoItem({
    todo,
    
    onDeleteClick
  }:{
    todo: Todo,
    
    onDeleteClick: (id: number) => void
  }) {
    return (
      <Tr key={todo.id}>
        <Td>{todo.id}</Td>
        <Td>
          {todo.text}
          
          </Td>
          <Td>

        <ButtonGroup spacing='3' >

        {/* <Button colorScheme='green' onClick={() => onEditClick(todo)}>Edit</Button> */}
        <Button colorScheme='red' onClick={() => onDeleteClick(todo.id)}>Delete</Button>
        </ButtonGroup>
          </Td>
      </Tr>
    );
  }