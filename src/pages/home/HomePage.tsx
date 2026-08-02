import Splash from "@components/splash/Splash";
import Bio from "@components/bio/Bio";
import WithinWithout from "@components/within-without/WithinWithout";
import News from "@components/news/News";

const HomePage = () => (
  <>
    <title>Official Website | Houses of Heaven</title>
    <div>
      <Splash />
      <Bio />
      <WithinWithout />
      <News />
    </div>
  </>
);

export default HomePage;
