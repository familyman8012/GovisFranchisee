import { AxiosResponse } from 'axios';

export const downloadAxiosResponse =
  (filename: string) => (response: AxiosResponse) => {
    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers['content-type'],
      })
    );

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    requestAnimationFrame(() => {
      link.click();
    });
    setTimeout(() => document.body.removeChild(link), 16 * 5);
  };
