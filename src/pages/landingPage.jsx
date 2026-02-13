import Hero from "../landpageComponents/hero.jsx";
import Services from "../landpageComponents/service.jsx";
import News from "../landpageComponents/news.jsx";
import Community from "../landpageComponents/community.jsx";
import Footer from "../landpageComponents/footer.jsx";
export default function LandingPage() {

    return (
        <div>
            <Hero />
            <Services />
            <News />
            <Community />
            <Footer />
        </div>
    )
}