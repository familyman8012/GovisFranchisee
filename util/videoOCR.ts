import dayjs from 'dayjs';
import { createWorker, createScheduler } from 'tesseract.js';

const scheduler = createScheduler();
const newWorker = createWorker('eng');
const newWorker2 = createWorker('eng');

newWorker.then(worker => scheduler.addWorker(worker));
newWorker2.then(worker => scheduler.addWorker(worker));

/**
 * 비디오의 currentTime을 수정한 후, 프레임이 변경될 때까지 대기합니다.
 * @param video - HTMLVideoElement입니다.
 * @returns 프레임이 변경되면 해결되는 프로미스 또는 오류 발생 시 거부되는 프로미스입니다.
 */
const waitChangeFrame = (video: HTMLVideoElement) =>
  new Promise((resolve, reject) => {
    video.onseeked = () => requestAnimationFrame(resolve);
    video.onended = () => requestAnimationFrame(resolve);
    video.onerror = reject;
  });

function thresholdFilter(pixels: Uint8ClampedArray, level = 0.5) {
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 255;
    } else {
      val = 0;
    }
    // eslint-disable-next-line no-multi-assign
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
}

/**
 * 특정 시간에 있는 비디오 프레임을 캔버스에 그린 후, 배경을 제거합니다.
 * 배경이 제거된 캔버스 이미지의 데이터 URL을 반환합니다.
 * @param time - 시간(초)입니다.
 * @param video - HTMLVideoElement입니다.
 * @param canvas - HTMLCanvasElement입니다.
 * @returns 배경이 제거된 캔버스 이미지의 데이터 URL입니다.
 */
export const getVideoFrame = async (
  time: number,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas?.getContext('2d', {
    willReadFrequently: true,
  });
  if (!ctx) return null;

  video.currentTime = Math.min(time, video.duration);
  await waitChangeFrame(video);

  ctx.drawImage(
    video,
    365,
    23,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // 배경을 검은색으로 만들어 OCR 성능을 향상시킵니다.
  const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  thresholdFilter(data, 0.95);

  ctx?.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};

/**
 * 이미지 데이터 URL에서 OCR을 사용하여 시간을 추출합니다.
 * @param dataURL - 이미지 데이터 URL입니다.
 * @returns 시간(초)입니다. 시간 형식이 잘못되었거나 인식할 수 없는 경우 null입니다.
 */
export const getTimeWithOCR = async (
  dataURL: string,
  time: number,
  duration: number
) => {
  const ret = await scheduler.addJob('recognize', dataURL);
  const timeText = ret.data?.text?.trim() ?? '';

  const ocrDate = dayjs(`1970-01-01 ${timeText}`);
  // 시간이 다음시간 0분인 경우, 1시간을 더해줍니다.
  const timeSecond =
    time + 15 >= duration && ocrDate.minute() < 6
      ? 3600 + (ocrDate.minute() * 60 + ocrDate.second())
      : ocrDate.minute() * 60 + ocrDate.second();

  // Return null if the time format is not in HH:mm:ss or cannot be parsed as a valid date
  if (!/\d{2}:\d{2}:\d{2}/.test(timeText) || Number.isNaN(timeSecond))
    return null;

  return timeSecond;
};
