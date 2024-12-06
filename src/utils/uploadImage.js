export const onChange = (e) => {
    e.preventDefault();
    let files, fileUploaded;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (!files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = () => {
      fileUploaded = reader.result;
    };
    reader.readAsDataURL(files[0]);

    return fileUploaded;
  };