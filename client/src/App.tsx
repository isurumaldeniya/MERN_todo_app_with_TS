import SideDrawer from './components/Drawer';
import Todo from './components/Todos/NewTask';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoList from './components/Todos/TaskList';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SideDrawer />
        <main>
          <Todo />;
        </main>
      </div>
    ),
  },
  {
    path: '/todos',
    element: (
      <div>
        <SideDrawer />
        <main>
          <TodoList />;
        </main>
      </div>
    ),
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
