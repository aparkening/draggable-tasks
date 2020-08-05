import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

export default class Task extends React.Component {
  render() {
    return <Container>{this.props.task.content}</Container>
  }
}