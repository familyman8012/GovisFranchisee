import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import Editor, { EditorProps } from './Editor';

const meta: Meta = {
  title: 'MODULES/Editor(WysWig)',
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

interface Props extends EditorProps {
  darkMode: boolean;
}

const StoryEditor: Story<Props> = args => {
  const [text, setText] = useState('');

  const handleTextChange = (value: string) => {
    setText(value);
    // 여기에서 텍스트가 변경될 때마다 수행할 작업을 추가할 수 있습니다.
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <Editor value={text} onChange={handleTextChange} disabled />
    </StoryLayout>
  );
};
export const Default = StoryEditor.bind({});

const StoryEditor2: Story<Props> = args => {
  interface FormData extends FieldValues {
    editor?: string;
  }
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <StoryLayout
      {...args}
      customCss={css`
        height: 500px;
      `}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="text"
          defaultValue=""
          render={({ field }) => (
            <Editor
              value={field.value}
              onChange={value => field.onChange(value)}
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </StoryLayout>
  );
};
export const ReactHookForm = StoryEditor2.bind({});
