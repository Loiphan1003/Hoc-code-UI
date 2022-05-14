import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function DefaultLayout({children}) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;