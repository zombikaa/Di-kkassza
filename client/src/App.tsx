import AuthLayout from './_auth/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import Login from './_auth/Login'
import SignUp from './_auth/SignUp'
import Home from './_root/Charts'
import RootLayout from './_root/RootLayout'
import Invoice from './_root/Invoice'

const App = () => {
  return (
    <main className='flex h-dvh'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route index path='/' element={<Home />} />
            <Route index path='/invoice' element={<Invoice />} />
          </Route>

        </Routes>
    </main>
  )
}

export default App