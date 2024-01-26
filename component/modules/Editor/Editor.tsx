// Editor.tsx
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type ReactQuillType from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadToS3 } from '@UtilFarm/uploads3';

const ReactQuill = dynamic<
  ReactQuillType.ReactQuillProps & { forwardedRef: any }
>(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return function ({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <p>Loading...</p> }
);

export interface EditorProps {
  value: string;
  onChange?: (content: string) => void;
  disabled?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const quillRef = React.useRef<any | null>(null);

  const imageHandler = React.useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.className = 'sr-only';
    document.body.append(input);
    input.click();

    input.addEventListener('change', async e => {
      const file = input.files?.[0];

      if (!file) return;

      const imagePath = await uploadToS3(file);

      const editor = quillRef.current?.editor;
      const range = editor.getSelection?.();
      if (!range || !editor) {
        console.error('not found quill editor ref object!', quillRef.current);
        return;
      }

      editor.insertEmbed(range.index, 'image', imagePath);
      editor.setSelection(range.index + 1, 1);
      document.body.removeChild(input);
    });
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image', 'video'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  const handleChange = (content: string) => {
    if (!disabled && onChange) {
      onChange(content);
    }
  };

  return (
    <ReactQuill
      forwardedRef={quillRef}
      value={value}
      onChange={handleChange}
      modules={quillModules}
      theme="snow"
      readOnly={disabled}
    />
  );
};

export default Editor;
