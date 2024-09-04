import Navbar from './Navbar'
import CTAsection from './CTAsection'
import Mission from './Mission'
import ReviewCards from './ReviewCards'
import PlaySection from './PlaySection'
import FeatureCards from './ContentCard'

function LandingPage() {
  return (
    <section>
        <Navbar/>
        <CTAsection/>
        <Mission/>
        <ReviewCards/>
        <PlaySection/>
        <FeatureCards/>
    </section>
  )
}

export default LandingPage