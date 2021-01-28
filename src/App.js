import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import TaskInput from './components/TaskInput';


function App() {
  return (
    <>
      <Header />
      <Container 
        maxWidth="md" 
        style={{ backgroundColor: '#fff', height: '100vh' }}
      >        
        <TaskInput />       
      </Container>
    </>
  );
}

export default App;
