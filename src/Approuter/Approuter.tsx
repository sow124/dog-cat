import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from '../component/home/home';
import Dog from '../component/Dog/dog';
import Cat from '../component/Cat/cat';
import Login from '../component/login/join';

function AppRouter() {
  return (
    <>
    <main>
      <Router>
          <Route path="/" Component={Home} />
          <Route path="/dog" Component={Dog} />
          <Route path="/cat" Component={Cat}/>
          <Route path="/login" Component={Login}/>
      </Router>
      </main>
    </>
  );
}

export default AppRouter;