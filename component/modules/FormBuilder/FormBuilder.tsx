/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AiOutlineCopy } from 'react-icons/ai';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button } from '@ComponentFarm/atom/Button/Button';
import {
  CodePreview,
  CodePreview2,
} from '@ComponentFarm/template/formbuilder/CodePreview';
import {
  FieldEditor,
  FieldTypes,
} from '@ComponentFarm/template/formbuilder/FieldEditor';
import { FormBuilderWrap } from '@ComponentFarm/template/formbuilder/style';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript'; // for JavaScript syntax highlighting

const FormBuilder = () => {
  const [lines, setLines] = useState<any>([]);
  const [selectedLineIndex, setSelectedLineIndex] = useState(-1);
  const [selectedFieldType, setSelectedFieldType] = useState(FieldTypes.TEXT);
  const [newLabel, setNewLabel] = useState('');
  const [newName, setNewName] = useState('');
  const [newPlaceholder, setNewPlaceholder] = useState(''); // New state
  const [isRequired, setIsRequired] = useState(true);
  const [dataField, setDataField] = useState(''); // New state
  const [fieldToAdd, setFieldToAdd] = useState(false);
  const router = useRouter();

  const addLine = () => {
    setLines([...lines, { fields: [] }]);
    setSelectedLineIndex(lines.length);
  };

  const addField = () => {
    if (lines.length === 0) {
      addLine();
      setFieldToAdd(true); // 필드 추가 요청 설정
      return; // lines가 업데이트될 때까지 기다리도록 여기서 return합니다.
    }
    const newLines = lines.map((line: any, index: any) => {
      if (index !== selectedLineIndex) return line;
      return {
        ...line,
        fields: [
          ...line.fields,
          {
            type: selectedFieldType,
            label: newLabel,
            name: newName,
            placeholder: newPlaceholder, // New property
            isRequired,
            data:
              selectedFieldType === FieldTypes.SELECT ||
              selectedFieldType === FieldTypes.CHECKBOXGROUP ||
              selectedFieldType === FieldTypes.RADIOGROUP
                ? dataField
                : undefined, // New property
          },
        ],
      };
    });
    setLines(newLines);
    setNewLabel('');
    setNewName('');
    setNewPlaceholder(''); // Reset
    setIsRequired(true);
    setSelectedFieldType(FieldTypes.TEXT);
    setDataField(''); // Reset
  };

  // lines 배열이 변경될 때 실행되는 useEffect
  useEffect(() => {
    // lines가 업데이트되었고, 필드 추가가 요청되었을 때만 addField를 실행합니다.
    if (lines.length > 0 && fieldToAdd) {
      addField();
      setFieldToAdd(false); // 필드 추가가 완료되었으므로 필드 추가 요청을 리셋합니다.
    }
  }, [lines]); // lines 배열에 의존합니다.

  const copyHandler = (codeBlock: string) => {
    // 코드를 가져옵니다.
    const codeElement = document.getElementById(codeBlock);
    if (codeElement) {
      const codeStr = codeElement.textContent;

      // 클립보드에 코드를 복사합니다.
      navigator.clipboard.writeText(String(codeStr)).then(
        () => {
          toast('코드 복사 되었습니다.');
        },
        err => {
          toast('코드 복사 에러 ', err);
        }
      );
    }
  };

  const [formName, setformName] = useState('');
  const [isModify, setIsModify] = useState(false);
  const queryClient = useQueryClient();

  const { data: formlistData } = useQuery(['form-list'], async () => {
    const response = await axios.get('/api/formbuilder');

    return response.data.data;
  });

  const saveMutation = useMutation(
    form => axios.post('/api/formbuilder', { name: formName, state: lines }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('form-list');
      },
    }
  );

  const loadMutation = useMutation(id => axios.get(`/api/formbuilder/${id}`), {
    onSuccess: data => {
      setformName(data.data.name);
      setLines(data.data.state);
      setIsModify(true);
    },
  });

  const modifyMutation = useMutation(
    id => {
      return axios.put(`/api/formbuilder/${id}`, {
        name: formName,
        state: lines,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('form-list');
      },
    }
  );

  const deleteMutation = useMutation(
    id => axios.delete(`/api/formbuilder/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('form-list');
        setLines([]); // lines 초기화
        setformName(''); // formName 초기화
        setIsModify(false); // isModify 초기화
      },
    }
  );

  return (
    <FormBuilderWrap>
      <div className="form_control_box">
        <div className="box_form_handling">
          <Button variant="primary" onClick={addLine} className="btn_line">
            Add Line
          </Button>
          {selectedLineIndex !== null && (
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="Label"
                className="inp"
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name"
                className="inp"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />

              <select
                value={selectedFieldType}
                onChange={e => setSelectedFieldType(e.target.value)}
              >
                <option value={FieldTypes.TEXT}>Text</option>
                <option value={FieldTypes.SELECT}>Select</option>
                <option value={FieldTypes.CHECKBOX}>Checkbox</option>
                <option value={FieldTypes.DATEPICKER}>DatePicker</option>
                <option value={FieldTypes.TEXTAREA}>Textarea</option>
                <option value={FieldTypes.CHECKBOXGROUP}>CheckboxGroup</option>
                <option value={FieldTypes.RADIOGROUP}>Radio Group</option>
                <option value={FieldTypes.WYSIWYG}>WYSIWYG Editor</option>
              </select>
              {(selectedFieldType === FieldTypes.TEXT ||
                selectedFieldType === FieldTypes.TEXTAREA) && (
                <input
                  type="text"
                  placeholder="Placeholder"
                  className="inp"
                  value={newPlaceholder}
                  onChange={e => setNewPlaceholder(e.target.value)}
                />
              )}
              {(selectedFieldType === FieldTypes.SELECT ||
                selectedFieldType === FieldTypes.CHECKBOXGROUP ||
                selectedFieldType === FieldTypes.RADIOGROUP) && (
                <input
                  type="text"
                  placeholder="Data Field"
                  className="inp"
                  value={dataField}
                  onChange={e => setDataField(e.target.value)}
                />
              )}
              <label>
                <input
                  type="radio"
                  name="required"
                  value="Yes"
                  checked={isRequired}
                  onChange={() => setIsRequired(true)}
                />
                Required
              </label>
              <label>
                <input
                  type="radio"
                  name="required"
                  value="No"
                  checked={!isRequired}
                  onChange={() => setIsRequired(false)}
                />
                Not Required
              </label>
              <Button
                variant="primary"
                onClick={addField}
                className="btn_field"
              >
                Add Field
              </Button>
            </div>
          )}
          {lines.map((line: any, lineIndex: any) => (
            <div key={lineIndex} style={{ marginTop: '20px' }}>
              <div>{lineIndex + 1}째 줄</div>
              <div style={{ display: 'flex' }}>
                {line.fields.map((field: any, fieldIndex: any) => (
                  <div key={fieldIndex} style={{ marginLeft: '10px' }}>
                    <FieldEditor
                      key={fieldIndex}
                      lineIndex={lineIndex}
                      fieldIndex={fieldIndex}
                      field={field}
                      lines={lines}
                      setLines={setLines}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="form_history">
          {!isModify && (
            <div className="form_save">
              <input
                type="text"
                className="inp inp_title"
                placeholder="폼 이름을 저장하세요."
                value={formName}
                onChange={e => setformName(e.target.value)}
              />
              <Button onClick={() => saveMutation.mutate()}>저장</Button>
            </div>
          )}
          <div className="form_list">
            <div className="box_tit">
              <h2>폼 리스트</h2>
              {isModify && (
                <Button variant="primary" onClick={() => router.reload()}>
                  등록화면으로 전환
                </Button>
              )}
            </div>
            <div className="wrap_form_list">
              {formlistData && (
                <ul className="list">
                  {formlistData.map((el: { name: string; _id: any }) => (
                    <li key={el._id}>
                      <span className="form_name">{el.name}</span>
                      {isModify ? (
                        <div className="btn_box">
                          <Button
                            variant="secondary"
                            onClick={() => modifyMutation.mutate(el._id)}
                          >
                            수정
                          </Button>
                          <Button onClick={() => deleteMutation.mutate(el._id)}>
                            삭제
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => loadMutation.mutate(el._id)}
                        >
                          불러오기
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="box_code">
        <h2>등록.수정 코드</h2>
        <CodePreview lines={lines} />

        <Button
          LeadingIcon={<AiOutlineCopy />}
          onClick={() => copyHandler('code')}
        >
          코드 복사
        </Button>
      </div>
      {/* 미리보기 기능 추가 */}

      <div className="box_code">
        <h2>보기 코드</h2>
        <CodePreview2 lines={lines} />
        <Button
          LeadingIcon={<AiOutlineCopy />}
          onClick={() => copyHandler('code2')}
        >
          코드 복사
        </Button>
      </div>
    </FormBuilderWrap>
  );
};

export default FormBuilder;
