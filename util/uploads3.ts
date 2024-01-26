import S3 from 'aws-sdk/clients/s3';
import dayjs from 'dayjs';
import { toHashString } from './hash';

const s3 = new S3({
  region: 'ap-northeast-2',
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
});

const PATH = 'images' as const;

interface IS3UploadResponse {
  Bucket: string;
  Location: string;
  Key: string;
}

const generateFileName = (file: File) => {
  const nowDate = dayjs().format('YYMMDD');

  return `${nowDate}_${toHashString(
    file.name.replace(/\.[^/.]+$/, '')
  )}.${file.name.split('.').pop()}`;
};

export const uploadToS3 = async (file: File, isAttach?: boolean) => {
  const params: {
    Bucket: string;
    Key: string;
    Body: File;
    ACL: string;
    ContentType: string;
    ContentDisposition?: string;
  } = {
    Bucket: 'temp-govis',
    Key: `${PATH}/${generateFileName(file)}`,
    Body: file,
    ACL: 'public-read',
    ContentType: file.type,
  };

  // 조건부로 ContentDisposition 설정
  if (isAttach) {
    params.ContentDisposition = 'attachment;';
  }

  return new Promise<string>((resolve, reject) => {
    s3.upload(params, (err: Error | null, s3data: IS3UploadResponse) => {
      if (err) reject(err);
      resolve(s3data.Location);
    });
  });
};
