import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function LanddingPage({Children}) {
    return (
        <>
            <Header />
            <div>
                {Children}
            </div>
            <Footer/>
        </>
    );
}

export default LanddingPage;