import React from 'react';
import Task from './task.js';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;
const Title = styled.h3`
  padding: 0.5em;
`;
const TaskList = styled.div`
  padding: 0.5em;
`;


export default class Column extends React.Component {
  render() {
    return <Container>
      <Title>{this.props.column.title}</Title>
      <TaskList>{this.props.tasks.map(task => <Task key={task.id} task={task} />)}</TaskList>
    </Container>
  }
}