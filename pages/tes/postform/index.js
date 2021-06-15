import { useState } from 'react';
import Resizer from "react-image-file-resizer";

const PostForm = () => {
  const [state, setstate] = useState({
    currentFile: undefined,
    previewImage: undefined,
    progress: 0,
    message: "",
    imageInfos: undefined,
  })

  const selectFile = (e) => {
    const newInfo = {
      name: e.target.files[0].name,
      size: Math.floor(e.target.files[0].size / 1024)
    }

    setstate({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
      progress: 0,
      message: "",
      imageInfos: newInfo
    })
    console.log(newInfo)
  }

  const upload = async () => {
    try {
      setstate({ progress: 50 })
      const { uri } = await resizeFile(state.currentFile)
      localStorage.setItem("avatar", uri)
      setstate({ progress: 100 })
      setstate({ currentFile: undefined, previewImage: undefined, message: "success" })
    } catch (error) {
      setstate({ message: error })
    }
  }

  const resizeFile = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, 360, 240, "WEBP", 10, 0, (uri) => resolve({ uri }), "base64"
      );
    });
  }

  const {
    currentFile,
    previewImage,
    progress,
    message,
    imageInfos,
  } = state;

  return (
    <div>
      <div className="row">
        <div className="col">
          <input type="file" accept="image/*" onChange={(e) => selectFile(e)} multiple />
        </div>
        {previewImage && (
          <div className="col align-center">
            <img className="preview" src={previewImage} height="240" width="360" alt="" />
          </div>
        )}
      </div>

      <div className="card">
        <h6 className="card-header">Details</h6>
        <ul className="list-group">
          {imageInfos &&
            <>
              <span>Name: {imageInfos.name}</span><br />
              <span>Size: {imageInfos.size} KB</span>
            </>
          }
        </ul>
      </div>
      
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}<br />

      {currentFile && (
        <div className="progress my-3">
          <div class="progress-bar">
            <span class="progress-bar-green" style={{ width: progress + "%" }}>{progress}%</span>
          </div>
        </div>
      )}

      <button
        className="button-primary button-round button-shadow"
        disabled={!currentFile}
        onClick={() => upload()}
      >Upload
      </button>
    </div>
  );
}
export default PostForm;

// const getBase64Image = () => {
//   let image = new Image();
//   image.src = state.previewImage
//   image.width = 360;
//   image.height = 240;

//   let canvas = document.createElement("canvas");
//   let ctx = canvas.getContext("2d")

//   canvas.width = 360;
//   canvas.height = 240;


//   // ctx.drawImage(image, 0, 0);
//   ctx.drawImage(image, 0, 0, 360, 240);

//   let dataURL = canvas.toDataURL("image/png", 0.3);

//   let imgData = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

//   localStorage.setItem("avatar", imgData)
// }

 //  UploadService.upload(state.currentFile, (e) =>  {
    //      setstate({
    //       progress: Math.round((100 * e.loaded) / e.total),
    //      })
    //  }).then((res) => {
    //      setstate({ message: response.data.message })
    //      return UploadService.getFiles();
    //  }).then((files) => {
    //      setstate({ imageInfos: files.data })
    //  }).catch((err) => {
    //      setstate({
    //          progress: 0,
    //          message: "Failed",
    //          currentFile: undefined
    //      })
    //  })