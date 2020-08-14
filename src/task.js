import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: 1px solid lightgrey;
  border-radius: 0.5em;
  background-color: ${props => 
    props.isDragDisabled
      ? 'lightgrey' 
      : props.isDragging
        ? 'lightgreen'
        : 'white'};
  display: flex;
`;
const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 0.5em;
  margin-right: 8px;
`;

export default class Class extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-1'; // disable first task drag
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            // {...provided.dragHandleProps}
            // innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}