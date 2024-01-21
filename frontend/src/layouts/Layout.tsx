import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero"

interface Props {
    children: React.ReactNode;//Any type of data
}
//We are destructuring the children from the props interface, in order to render the children of the Layout component
const Layout = ({children}:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;
