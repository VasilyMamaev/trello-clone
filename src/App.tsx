import React from 'react';
import Header from './components/header/header';
import { withRouter, Route } from 'react-router-dom';
import BoardsCollectionContainer from './components/boards-collection/boards-collection-container';

const App: React.FC = () => {
  return (<>
    <Header/>
    <Route path="/" exact render={() => <BoardsCollectionContainer/>}/>
    </>
  );
}



export default withRouter(App)

