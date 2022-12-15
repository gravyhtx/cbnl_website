import { useEffect, useRef, useState } from "react";

const UploadFile = ({ uploadedData, setUploadedData, storeDataLocally, successMessage, instructions, containerPosition,
  instructionsClasses, containerClasses, inputClasses, labelClasses, fileNameClasses, fileNamePlaceholder }) => {

  // Initialize Component
  const [loaded, setLoaded] = useState(false);
  
  const placeholder = fileNamePlaceholder ? fileNamePlaceholder : "No file chosen";
  let fileName = placeholder;

  let active = false;

  // Refs
  const fileNameRef = useRef(null);
  const fileNameElement = fileNameRef.current;
  const buttonRef = useRef(null);
  const buttonLabelElement = buttonRef.current;

  // External Classes
  containerClasses = containerClasses ? ' '+containerClasses : '';
  inputClasses = inputClasses ? ' '+inputClasses : '';
  labelClasses = labelClasses ? ' '+labelClasses : '';
  fileNameClasses = fileNameClasses ? ' '+fileNameClasses : '';
  containerPosition =
      containerPosition === ('c' || "center")
      ? ' center'
    : containerPosition === ('l' || 'left')
      ? ' left'
    : containerPosition === ('r' || 'right')
      ? ' right'
    : containerPosition
      ? ' '+containerPosition
      : '';

  // Use 'localStorage'
  storeDataLocally = storeDataLocally === true ? true : false;

  // External Uploaded Data (STATE)
  uploadedData = uploadedData === true ? uploadedData : false;
  setUploadedData = setUploadedData === true ? setUploadedData : false;


  useEffect(() => {
    if(!loaded){
      setLoaded(true);
    }
    if(storeDataLocally && !loaded){
      localStorage.removeItem('upload_data');
    }
  }, [loaded])

  const uploadStyle = (active) => {
    buttonLabelElement.classList.add(
      active === true ? 'active' : 'error' ? 'error' : ''
    );
    fileNameElement.classList.add(
      active === true ? 'active' : 'error' ? 'error' : ''
    );
  }

  const handleFileUpload = (fileName) => {
    fileNameElement.textContent = fileName?fileName:fileName==='error'?'Unable to get file':placeholder;
  }

  if (active) {
    
  }

  const [storedData, setStoredData] = useState(null);
  
  useEffect(() => {
    if(storeDataLocally) { localStorage.setItem('upload_data', storedData) };
  }, [storedData])

  const upload = async (e) => { // Get Seed Phrase from User Files
    e.preventDefault();

    let data = false;
    active = false;
    handleFileUpload(false);

    const reader = new FileReader();

    reader.onload = async (e) => { 
      data = (e.target.result);
    };

    if (e.target.files[0]){
      reader.readAsText(e.target.files[0]);
      fileName = e.target.files[0].name;
      active = fileName ? true : false;
      handleFileUpload(fileName);
    } else {
      active = 'error';
      handleFileUpload('error');
    }
    
    uploadStyle(active);

    if ( setStoredData === true ) { setStoredData(data) }
    if ( setUploadedData === true ) { setUploadedData(data) }
  }


  return (
    <>
    { instructions
      ? <>instructions</>
    : instructions && instructionsClasses
      ? <div className={instructionsClasses}>{instructions}</div>
      : <></>}

    <div className={"upload-file-container container"+containerClasses+containerPosition}>
      <input
          className={"upload-file-input"+inputClasses}
          type="file"
          onChange={upload}
          id="upload" hidden />
      <span className="upload-btn-container">
        <label
          className={"upload-file-label"+labelClasses}
          htmlFor="upload"
          ref={buttonLabelElement} />
      </span>
      <span
        className={"upload-file-name"+fileNameClasses}
        ref={fileNameElement}>
        { fileName }
      </span>
    </div>

    { successMessage && active ? successMessage : <></> }
  </>
  )
}

export default UploadFile;