import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import Upload, { UploadProps } from './Upload';

const meta: Meta = {
  title: 'MODULES/Upload',
  tags: ['autodocs'],
  args: {
    TotalProps: {
      props: ``,
    },
  },
  parameters: {
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    },
  },
};

export default meta;

interface Props extends UploadProps {
  darkMode: boolean;
}

const StoryUpload: Story<Props> = args => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles([uploadedFiles[0]]);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Upload onFileUpload={handleFileUpload} />
      {files.map(file => (
        <p key={file.name}>{file.name}</p>
      ))}
    </StoryLayout>
  );
};
export const Default = StoryUpload.bind({});
