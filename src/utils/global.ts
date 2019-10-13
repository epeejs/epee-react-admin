/** 获取图片base64格式 */
export function imgToBase64(
  url: string,
  callback: (result: string | ArrayBuffer | null) => void,
) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
