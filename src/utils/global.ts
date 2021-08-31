/** 获取图片base64格式 */
export function imgToBase64(url: string, callback: (result: string | ArrayBuffer | null) => void) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
