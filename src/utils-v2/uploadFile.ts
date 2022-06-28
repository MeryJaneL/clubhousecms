async function uploadFile(
  file,
  uploadProgress?: (event: ProgressEvent<XMLHttpRequestEventTarget>) => void,
) {
  // const blob = new Blob([new Uint8Array(10 * 1024 * 1024)]); // any Blob, including a File

  const xhr = new XMLHttpRequest();
  const success = await new Promise(resolve => {
    xhr.responseType = 'json';
    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        uploadProgress?.(event);
        // console.log("upload progress:", event.loaded / event.total);
        // uploadProgress.value = event.loaded / event.total;
      }
    });
    // xhr.addEventListener("progress", (event) => {
    //   if (event.lengthComputable) {
    //     downloadProgress()
    //     console.log("download progress:", event.loaded / event.total);
    //     downloadProgress.value = event.loaded / event.total;
    //   }
    // });
    xhr.addEventListener('loadend', () => {
      resolve(xhr.response);
    });
    xhr.open('POST', '/upload', true);
    // xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });

  return success;
}

export default uploadFile;
