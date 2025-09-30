import { Toaster } from 'react-hot-toast'
import './App.css'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <Home />
      <Toaster
        toastOptions={{
          className: 'default',
          duration: 10000,
          style: {
            fontSize: "larger",
            fontWeight: "bold",
            width: "auto",
            maxWidth: "none",
          },
        }}
      />
    </>
  );
}

export default App
