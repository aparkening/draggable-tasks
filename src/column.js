import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task.js';

// Styles
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  // width: 220px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Title = styled.h3`
  padding: 0.5em;
`;
const TaskList = styled.div`
  padding: 0.5em;
  transition background-color .2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
  // flex-grow: 1;
  // min-height: 100px;

  display: flex;
`;

// Render InnerList as component
// PureComponent automatically only renders upon changes
class InnerList extends React.PureComponent {
  // Allow re-render only if tasks have changed
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.tasks === this.props.tasks) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export default class Column extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
      >
        {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps} >{this.props.column.title}
          </Title>
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
                {/* {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)} */}
                <InnerList tasks={this.props.tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
        )}
      </Draggable>
    )
  }
}