import Auth from './components/Auth'
import './App.css'
import AuthLogin from './components/AuthLogin'
import { Route,Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Account from './components/Account'
import Pages from './pages/Pages'
import CreatePages from './pages/CreatePages';
import People from './pages/People';
import Protected from './protectedRoutes/Protected';


function App() {

  return (
    <div>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Auth/>}></Route>
            <Route path='/login' element={<AuthLogin/>}></Route>
            <Route path='/home' element={<Protected>
              <Pages/>
            </Protected>}></Route>
            <Route path='/account' element={<Account/>}></Route>
            <Route path='/createPost' element={<CreatePages/>}></Route>
            <Route path='/people' element={<People/>}></Route>
          </Routes>
        </AuthProvider>
    </div>
  )
}
export default App


          

