import { useEffect } from "react"

const Gallery = () => {
    useEffect(() => {
        var dataImage = localStorage.getItem('avatar');
        var bannerImg = document.getElementById('tableBanner');
        // bannerImg.src = "data:image/png;base64," + dataImage;
        bannerImg.src = dataImage;
    }, [])

    return (
        <img src="" id="tableBanner" style={{margin: "0 auto"}} />
    )
}

export default Gallery;