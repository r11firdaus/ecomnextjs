import { memo, useEffect } from "react"
import SkelPromoBanner from "./skeleton/skel-promoBanner"

const PromoBanner = (props: { data: any[] }): JSX.Element => {
    let slideIndex = 1

    useEffect(() => {
        props.data && showSlides(slideIndex)
    }, [props.data])

    const showSlides = (n: number) => {
        const slides = (document.getElementsByClassName("mySlides") as any);
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) slideIndex = 1
        if (n < 1) slideIndex = slides.length
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block"; 
        dots[slideIndex-1].className += " active";
    }

    const plusSlides = (pos: number) => {
        slideIndex += pos
        showSlides(slideIndex);
    }
    const currentSlide = (pos: number) => {
        slideIndex = pos
        showSlides(slideIndex);
    }
    return (<>
        {props.data && props.data.length > 0 ?
        <div className="slideshow-container card">
            {
                props.data.map((data, i) => (
                    <div className="mySlides fade" key={i}>
                        <div className="numbertext">{`${i + 1} / ${props.data.length}`}</div>
                        {/* <div style={{ width: '100%', height: '220px'}}> */}
                        <div style={{ width: '100%', height: '220px'}}>
                            <h6 className="align-center">{data.judul}</h6>
                            <div style={{height: '80px', marginTop: '10px'}}>
                                <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                                <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                                <p style={{marginBottom: 0, fontSize: '13px'}}>{data.konten}</p>
                            </div>
                            <small style={{bottom: 0}}>Expired on September 15, 2069</small>
                        </div>
                    </div>
    
                ))

            }

            <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
            <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
        </div> :
        <>
            <SkelPromoBanner />
        </>}

        <div className="align-center">
            {props.data?.map((img, i) => (
                <span className="dot" onClick={() => currentSlide(i + 1)} key={i}></span>
            ))}
        </div>
    </>)
}

export default memo(PromoBanner)