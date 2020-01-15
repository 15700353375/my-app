import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

// import AddTodo from './components/addTodo';
// import TodoList from './components/todoList';
// import Footer from './components/footer';
// import VisibleTodoList from './componentsOld/VisibleTodoList';
// import Footer from './componentsOld/Footer';
import Public from './view/public';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  onTodoClick() {}
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Public Page</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
            <li>
              <Link to="/noMatch">No Match</Link>
            </li>
          </ul>

          <hr />
          <Switch>
            <Route path="/" exact>
              <Public />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

function Topic() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { topicId } = useParams();

  return (
    <div>
      <h3>topicId: {topicId}</h3>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

// 鉴权存储
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// 没有登录权限访问受保护页面的情况下，获取到from。当点击登录之后再跳回到from页面
function Login() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    sessionStorage.setItem('token', true);
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
function ProtectedPage() {
  return (
    <h3>
      Protected
      <Topic />
    </h3>
  );
}

// 私有路由，判断是否登录？ 已登录=》children  未登录=》去登录
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(sessionStorage.getItem('token')) === true ? (
          children
        ) : (
          //  重定向
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
