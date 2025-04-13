import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from "./routes/AppRouter.tsx";
import AuthProvider from './components/auth/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900 text-white">
          <AppRouter/>
        </div>
      </AuthProvider>
    </Provider>
  )
}

export default App
