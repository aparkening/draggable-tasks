import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';


const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;


  // Change text color to orange upon start
  // Capture index
  onDragStart = start => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';

    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    
    this.setState({
      homeIndex
    });
  }

  // Increase background opacity when dragging down the list
  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  // Update state with drag result
  onDragEnd = result => {

    this.setState({ homeIndex: null}); // Clear index when drag finishes

    console.log(' Result', result);

    // Reset colors on end
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId, type } = result;

    // If no destination, exit
    if (!destination) {
      return;
    }

    // If droppable location didn't change, exit
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    
    // Allow column reorder
    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      // Move column id from old index to new index
      newColumnOrder.splice(source.index, 1); // Remove from old
      newColumnOrder.splice(destination.index, 0, draggableId); // Add to new

      // Override existing column
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };

      // Update state
      this.setState(newState);
      return;
    }



    // Set start and end columns
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    
    // If moving within same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
    
      // Move task id from old index to new index
      newTaskIds.splice(source.index, 1); // Remove from old
      newTaskIds.splice(destination.index, 0, draggableId); // Add to new

      // Document column changes in newColumn
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      // Override existing column
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      // Update state
      this.setState(newState);
      return;
    }

    // Moving from one column to another
    
    // Start column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1); // Remove from old
    // Document column changes in newColumn
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    // End column
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId); // Add to new
    // Document column changes in newColumn
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    // Override start and finish columns
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    // Update state
    this.setState(newState);
    return;
  }; 

  render() {
    return (
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable 
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
          <Container
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              );

              const isDropDisabled = index < this.state.homeIndex; // Don't allow dropping to the left of starting column

              return (
                <Column 
                  key={column.id} 
                  column={column} 
                  tasks={tasks} 
                  isDropDisabled={isDropDisabled}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));