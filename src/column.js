import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task.js';

// Styles
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  // width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 0.5em;
`;
const TaskList = styled.div`
  padding: 0.5em;
  transition background-color .2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  // flex-grow: 1;
  // min-height: 100px;

  display: flex;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable 
          droppableId={this.props.column.id}
          // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
          isDropDisabled={this.props.isDropDisabled}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <TaskList
              // innerRef={provided.innerRef}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}