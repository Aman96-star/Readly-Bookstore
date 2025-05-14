
import './App.css'
import Navbar from './components/navbar'
import Headpage from './components/headpage'
import Fiction from './components/fiction'
import NonFiction from './components/nonfiction'
import Footer from './components/footer'



function App() {
  return (
    <>
     <div className='h-fit w-full overflow-x-hidden'>
      <Navbar/>
      <Headpage/>
      <Fiction/>
      <NonFiction/>
      <Footer/>
     </div>
    </>
  )
}

export default App
