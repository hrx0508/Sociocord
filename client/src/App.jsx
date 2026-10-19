// import { MotionConfig } from 'framer-motion'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import StatsRow from './components/StatsRow'
// import FeaturesStrip from './components/Featuresstrip'

// export default function App() {
//   return (
//     <MotionConfig reducedMotion="user">
//       <div className="relative min-h-screen overflow-hidden bg-ink">
//         {/* background glows */}
//         <div aria-hidden className="pointer-events-none absolute inset-0">
//           <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-violet/30 blur-[140px]" />
//           <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-sky/15 blur-[140px]" />
//           <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-grape/20 blur-[140px]" />
//         </div>
//         <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//           <Navbar />
//           <Hero />
//           <StatsRow />
//           <FeaturesStrip />
//         </div>
//       </div>
//     </MotionConfig>
//   )
// }

import React from 'react'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <div>
      <LandingPage />
    </div>
  )
}

export default App