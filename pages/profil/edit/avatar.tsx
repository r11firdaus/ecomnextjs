import Router from 'next/router';
import { useState, memo, useEffect } from 'react';
import Resizer from "react-image-file-resizer";
import { useDispatch } from 'react-redux';

type Img = {
  currentFile: any,
  previewImage: any,
  progress: number,
  message: string,
  imageInfos: {
    name: string,
    size: number
  }
}

const index = (): JSX.Element => {
  const [state, setstate] = useState<Img>({
    currentFile: undefined,
    previewImage: undefined,
    progress: 0,
    message: "",
    imageInfos: undefined,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: 'SITE_PAGE', payload: Router.pathname})
  }, [])

  const selectFile = (e: any): void => {
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
  }

  const upload = async (): Promise<void> => {
    try {
      setstate({ ...state,progress: 50 })
      await resizeFile(state.currentFile).then((uri: any) => {
        localStorage.setItem("avatar", uri.uri)
      })
      setstate({ ...state,progress: 100 })
      setstate({ ...state,currentFile: undefined, previewImage: undefined, message: "success" })
    } catch (error) {
      setstate({ ...state,message: error })
    }
  }

  const resizeFile = (file: typeof state.currentFile): Promise<any> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file, 360, 240, "WEBP", 10, 0, (uri) => resolve({ uri }), "base64"
      );
    });
  }

  const {currentFile,previewImage,progress,message,imageInfos} = state;

  return (<>
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
          <div className="progress-bar">
            <span className ="progress-bar-green" style={{ width: progress + "%" }}>{progress}%</span>
          </div>
        </div>
      )}

      <button
        className="button-primary button-round button-shadow"
        disabled={!currentFile}
        onClick={() => upload()}
      >Upload
      </button>
  </>);
}
export default memo(index);