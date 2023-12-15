import SideDrawer from './components/Drawer';
import Todo from './components/Todos/Todo';

function App() {
  return (
    <div>
      <SideDrawer />
      <main>
        <Todo />;
      </main>
    </div>
  );
}

export default App;
