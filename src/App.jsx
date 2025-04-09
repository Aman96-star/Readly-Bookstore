
import './App.css'
import Navbar from './components/navbar'
import Headpage from './components/headpage'
import Fiction from './components/fiction'
import NonFiction from './components/nonfiction'



function App() {
  return (
    <>
     <div className='h-fit w-full overflow-x-hidden'>
      <Navbar/>
      <Headpage/>
      <Fiction/>
      <NonFiction/>
      
     </div>
    </>
  )
}

export default App
