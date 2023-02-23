import { useEffect, useState } from 'react'
import './MainLayout.scss'
import MobileLayout from '../MobileLayout/MobileLayout'

function MainLayout() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const handleWindowResize = () => {
    setwindowWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [windowWidth])
  return (
    <main className='main-app'>
      { (windowWidth <= 768 && windowWidth >= 320 ) && <MobileLayout/> }
    </main>
  )
}

export default MainLayout