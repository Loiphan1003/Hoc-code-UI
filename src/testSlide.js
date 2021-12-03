import Slider from "react-slick";
import { useState, useEffect } from "react";
import "./assets/style/Learn.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const courseApi = 'https://jsonplaceholder.typicode.com/users'


function TestSlide() {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: "linear",
    };
    const [coures, setCoures] = useState([])

    useEffect(() => {
        fetch(courseApi)
            .then(function (response) {
                return response.json()
            })
            .then(function (response) {
                setCoures(response)
            })
    }, [])
    return (
        <div>
            <h2> Khóa học </h2>
            <Slider {...settings} >

                {coures.map(coure => (
                    <div key={coure.id}>
                        <div  className="card">
                            <img className="card-img-top" src='C-image.jpg' alt="hình ảnh" />
                            <div className="card-body">
                                <h5 className="card-title">{coure.name}</h5>
                                <p className="card-text">Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ cung cấp những kiến thức cơ bản và là nền tảng để bạn đi xa hơn trên con đường lập trình.</p>
                            </div>
                        </div>
                    </div>

                ))}

            </Slider>
        </div>
    );
}

export default TestSlide