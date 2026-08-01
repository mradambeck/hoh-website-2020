import Splash from "@components/splash/Splash";
import EmailSignupForm from "@components/email-signup-form/EmailSignupForm";
import Bio from "@components/bio/Bio";
import WithinWithout from "@components/within-without/WithinWithout";
import News from "@components/news/News";

function Home() {
  return (
    <div>
      <Splash />
      <Bio />
      <WithinWithout />
      <News />
      <EmailSignupForm />
    </div>
  );
}

export default Home;
