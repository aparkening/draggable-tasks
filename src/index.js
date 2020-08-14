import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;


  // Change text color to orange upon start
  onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
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
    console.log(' Result', result);

    // Reset colors on end
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

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
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
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