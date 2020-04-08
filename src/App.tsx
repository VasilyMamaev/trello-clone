import React from 'react';
import Header from './components/header/header';
import { withRouter, Route, Switch } from 'react-router-dom';
import BoardsCollectionContainer from './components/boards-collection/boards-collection-container';
import BoardContainer from './components/board/board-container';

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact render={() => <BoardsCollectionContainer/>}/>
        <Route path="/:id" render={() => <BoardContainer/>}/>
      </Switch>
    </>
  );
}



export default withRouter(App)

