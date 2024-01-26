// FileDropzone.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';

const UploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;

  & > p {
    font-size: 1rem;
  }

  & > em {
    font-size: 0.8rem;
  }

  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  }

  .dropzone:focus {
    border-color: #2196f3;
  }

  .dropzone.disabled {
    opacity: 0.6;
  }
`;

export interface UploadProps {
  onFileUpload: (files: File[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onFileUpload }) => {
  const [previewSource, setPreviewSource] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { mutate: uploadFile } = useMutation(
    async (fileToUpload: File) => {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }
    },
    {
      onError: error => {
        console.error(error);
      },
      onSuccess: () => {
        console.log('File uploaded successfully');
      },
    }
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles);
      const previewURL = URL.createObjectURL(acceptedFiles[0]);
      setPreviewSource(previewURL);
      setFile(acceptedFiles[0]);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleUploadClick = () => {
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <UploadWrap>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 1 drop a file here, or click to select a file</p>
        )}
      </div>
      {previewSource && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewSource}
          alt="file preview"
          style={{ marginTop: '10px', width: '100%', height: 'auto' }}
        />
      )}
      <button type="button" onClick={handleUploadClick}>
        Upload to server
      </button>
    </UploadWrap>
  );
};

export default Upload;
