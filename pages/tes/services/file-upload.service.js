// class FileUploadService {
//     upload(file, onUploadProgress) {
//         let formData = new FormData();

//         formData.append("file", file);

//         return fetch("http://localhost:3000/upload", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             body: formData,
//             onUploadProgress,
//         });
//     }

//     getFiles() {
//         return fetch('http://localhost:3000/files')
//     }
// }

// export default new FileUploadService();

class FileUploadService {
    upload(file, onUploadProgress) {
        let imgData = this.getBase64Image(file)
        localStorage.setItem("imgData", imgData)
    }

    getFiles() {
        const dataImage = localStorage.getItem("imgData");
    }

    getBase64Image(img) {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        let dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}

export default new FileUploadService();