import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from "./routes/AppRouter.tsx";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-900 text-white">
        <AppRouter/>
      </div>
    </Provider>
  )
}

export default App
