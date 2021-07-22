import Image from "next/image"
import { memo, useEffect } from "react"

const PromoBanner = (props: { data: any[], interval?: boolean }): JSX.Element => {
    let slideIndex = 1

    useEffect((): any => {
        showSlides(slideIndex)
        const autoSlide = props.interval && setInterval(() => plusSlides(1), 8000);
        return () => clearInterval(autoSlide)
    }, [])

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
        {props.data.length > 0 &&
            <div className="slideshow-container card">
                {
                    props.data.map((data, i) => {
                        let imgSrc = data.image;
                        if (data.image.search('https://' || 'http://') < 0) imgSrc = `/${data.image}`
                        return (
                            <div className="mySlides fade" key={i}>
                                <div className="numbertext">{`${i + 1} / ${props.data.length}`}</div>
                                <div className="mySlides-image">
                                    <Image height={'100%'} width={'100%'} src={imgSrc} />
                                </div>
                            </div>
                        )
                    })
                }

                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
        }

        <div className="align-center">
            {props.data?.map((img, i) => (
                <span className="dot" onClick={() => currentSlide(i + 1)} key={i}></span>
            ))}
        </div>
    </>)
}

export default memo(PromoBanner)