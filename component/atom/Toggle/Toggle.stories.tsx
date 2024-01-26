import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import StoryLayout from '@ComponentFarm/modules/story_layout/StoryLayout';
import Toggle from './Toggle';

const meta: Meta = {
  title: 'Atoms/Toggle',
  tags: ['autodocs'],
  args: {
    loading: false,
    checked: true,
    disabled: false,
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

interface Props {
  darkMode: boolean;
  loading: boolean;
  checked: boolean;
  disabled?: boolean;
}

export const Default: Story<Props> = ({
  darkMode,
  loading,
  checked,
  disabled,
}) => {
  return (
    <StoryLayout
      darkMode={darkMode}
      customCss={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      `}
    >
      <Toggle
        loading={loading}
        checked={checked}
        disabled={disabled}
        variant="red"
      />
      <Toggle
        loading={loading}
        checked={checked}
        disabled={disabled}
        variant="green"
      />
      <Toggle loading={loading} checked={false} disabled={disabled} />
      <Toggle
        checked={checked}
        loading={loading}
        onChange={value => console.log('changed Value : ', value)}
        disabled={disabled}
      />
    </StoryLayout>
  );
};

export const ReactHookForm: Story<Props> = ({ darkMode }) => {
  const { register, watch } = useForm<{ switch: boolean }>({
    defaultValues: {
      switch: false,
    },
  });
  return (
    <StoryLayout darkMode={darkMode}>
      <Toggle {...register('switch')} />
      <p>
        checked : {watch('switch')?.toString()} type: {typeof watch('switch')}
      </p>
    </StoryLayout>
  );
};
