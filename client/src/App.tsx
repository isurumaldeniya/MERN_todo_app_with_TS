import SideDrawer from './components/Drawer';
import Todo from './components/Todos/Todo';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/todo',
    element: (
      <div>
        <SideDrawer />
        <main>
          <Todo />;
        </main>
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
