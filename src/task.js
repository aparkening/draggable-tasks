import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: 1px solid lightgrey;
  border-radius: 0.5em;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
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
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            // {...provided.dragHandleProps}
            // innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}