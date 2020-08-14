import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;

  // Update state with drag result
  onDragEnd = result => {
    console.log(' Result', result);

    const { destination, source, draggableId } = result;

    // If no destination, exit
    if (!destination) {
      return;
    }

    // If droppable location didn't change, exit
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    
    // 
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    // Move task id from old index to new index
    newTaskIds.splice(source.index, 1); // Remove from old
    newTaskIds.splice(destination.index, 0, draggableId); // Add to new

    // Document column changes in newColumn
    const newColumn = {
      ...column,
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

    console.log('New state', newState);

    // Update state
    this.setState(newState);
  }; 

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));