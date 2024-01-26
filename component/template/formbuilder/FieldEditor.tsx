import React, { SetStateAction, useState } from 'react';
import { css } from '@emotion/react';

export const FieldTypes = {
  TEXT: 'text',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  DATEPICKER: 'datepicker',
  TEXTAREA: 'textarea',
  CHECKBOXGROUP: 'checkboxgroup',
  RADIOGROUP: 'radiogroup',
  WYSIWYG: 'wysiwyg',
};

type Field = {
  label: string;
  name: string;
  type: string;
  isRequired: boolean;
  data?: any;
};

type Line = {
  fields: Field[];
};

type FieldEditorProps = {
  lineIndex: number;
  fieldIndex: number;
  field: Field;
  lines: Line[];
  setLines: React.Dispatch<SetStateAction<Line[]>>;
};

export const FieldEditor: React.FC<FieldEditorProps> = ({
  lineIndex,
  fieldIndex,
  field,
  lines,
  setLines,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempField, setTempField] = useState(field);

  const saveField = () => {
    const newLines = lines.map((line, idx) => {
      if (idx !== lineIndex) return line;
      return {
        ...line,
        fields: line.fields.map((f, fIdx) => {
          if (fIdx !== fieldIndex) return f;
          return tempField;
        }),
      };
    });
    setLines(newLines);
    setEditing(false);
  };

  const deleteField = () => {
    const newLines = lines.map((line, idx) => {
      if (idx !== lineIndex) return line;
      return {
        ...line,
        fields: line.fields.filter((_, fIdx) => fIdx !== fieldIndex),
      };
    });
    setLines(newLines);
  };

  const renderFieldType = () => {
    switch (field.type) {
      case FieldTypes.TEXT:
        return 'Text';
      case FieldTypes.SELECT:
        return 'Select';
      case FieldTypes.CHECKBOX:
        return 'Checkbox';
      case FieldTypes.DATEPICKER:
        return 'DatePicker';
      case FieldTypes.TEXTAREA:
        return 'Textarea';
      case FieldTypes.CHECKBOXGROUP:
        return 'CheckboxGroup';
      case FieldTypes.RADIOGROUP:
        return 'RADIOGROUP';
      case FieldTypes.WYSIWYG:
        return 'WYSIWYG';
      default:
        return '';
    }
  };

  if (editing) {
    return (
      <div>
        <input
          type="text"
          className="inp"
          value={tempField.label}
          onChange={e => setTempField({ ...tempField, label: e.target.value })}
        />
        <input
          type="text"
          className="inp"
          value={tempField.name}
          onChange={e => setTempField({ ...tempField, name: e.target.value })}
        />
        <select
          value={tempField.type}
          onChange={e => setTempField({ ...tempField, type: e.target.value })}
        >
          <option value={FieldTypes.TEXT}>Text</option>
          <option value={FieldTypes.SELECT}>Select</option>
          <option value={FieldTypes.CHECKBOX}>Checkbox</option>
          <option value={FieldTypes.DATEPICKER}>DatePicker</option>
          <option value={FieldTypes.TEXTAREA}>Textarea</option>
          <option value={FieldTypes.CHECKBOXGROUP}>CHECKBOXGROUP</option>
          <option value={FieldTypes.RADIOGROUP}>RADIOGROUP</option>
          <option value={FieldTypes.WYSIWYG}>WYSIWYG</option>
        </select>
        <input
          type="checkbox"
          checked={tempField.isRequired}
          onChange={e =>
            setTempField({ ...tempField, isRequired: e.target.checked })
          }
        />
        Required
        <button type="button" onClick={saveField}>
          Save
        </button>
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div
      css={css`
        span {
          margin-right: 10px;
        }
      `}
    >
      {lineIndex + 1}.{fieldIndex + 1})
      <span>
        <strong>Label: </strong> {field.label}
      </span>
      <span>
        <strong>Name: </strong> {field.name}
      </span>
      <span>
        <strong>Type: </strong> {renderFieldType()}
      </span>
      <span>
        <strong>Required: </strong> {field.isRequired ? 'Yes' : 'No'}
      </span>
      <button type="button" onClick={() => setEditing(true)}>
        Edit
      </button>
      <button
        type="button"
        onClick={deleteField}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </button>
    </div>
  );
};
