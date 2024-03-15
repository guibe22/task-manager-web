import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiFillCloseCircle } from "react-icons/ai";

// import "./styles.css";

const fileTypes = ["JPEG", "PNG"];

export default function UploadFile({ title, adjuntos, setAdjuntos }) {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  function blobToString(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const removeItem = (index) => {
    let newList = fileList.filter((item, i) => i !== index);
    setFileList(newList);
  };

  const handleChange = (file) => {
    if(fileList.length > 1){
      alert('Solo se pueden subir 2 imagenes')
      return
    }
    if (file) {
      let imgUrl = URL.createObjectURL(file[0])
      //convert to base64 string
      blobToString(file[0]).then((res) => {
        let adjunto = {
          nombre: file[0].name,
          url: imgUrl,
          base64: res
        }
        console.log(adjunto)
        setFileList([
          ...fileList,
          adjunto
        ])
        setAdjuntos([
          ...adjuntos,
          adjunto.base64
        ])
        setFile(null)
      });
    }
  };
  return (
    <div className="App">
      <h1 className="mb-2">{title}</h1>
      <div className="mb-2">
        <div className="flex">
          {fileList.map((item, index) => (
            <div className="relative inline-block mr-3" key={index}>
              <AiFillCloseCircle className="h-[20px] w-[20px] text-red-500 absolute right-[-10px] top-[-10px] cursor-pointer" onClick={() => removeItem(index)}/>
              <img src={item.base64} alt="react-drag-drop-files" className="h-[60px] w-[60px] object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        ariaLabel="File uploader"
      />
      {/* <p>{file ? `Nombre de archivo: ${file[0].name}` : "no se subio ningun archivo"}</p> */}
    </div>
  );
}
