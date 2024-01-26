import { Controller, useFormContext } from 'react-hook-form';
import RadioGroup from '@ComponentFarm/modules/RadioGroup/RadioGroup';

interface Props {
  type: 'camera_face' | 'camera_vat_left' | 'camera_vat_right';
  title?: string;
  subTitle?: string;
}

const CameraForm = ({ type, title, subTitle }: Props) => {
  const { register, control } = useFormContext();

  return (
    <>
      <h2>
        {title}
        <span className="sub-text">{subTitle}</span>
      </h2>
      <div className="line">
        <div className="field">
          <label htmlFor="name">고유값 (ID)</label>
          <div className="box_inp">
            <input
              {...register(`${type}.camera_id`)}
              placeholder="숫자만 입력 가능"
              className="inp"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name">해상도 가로값 (Width)</label>
          <div className="box_inp">
            <input
              {...register(`${type}.resolution_width`)}
              placeholder="숫자만 입력 가능"
              className="inp"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="line">
        <div className="field">
          <label htmlFor="name">해상도 세로값 (Height)</label>
          <div className="box_inp">
            <input
              {...register(`${type}.resolution_height`)}
              placeholder="숫자만 입력 가능"
              className="inp"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="name">영상 프레임 (FPS)</label>
          <div className="box_inp">
            <input
              {...register(`${type}.fps`)}
              placeholder="숫자만 입력 가능"
              className="inp"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="line">
        <div className="field">
          <label htmlFor="name">카메라 사용</label>
          <div className="box_inp">
            <Controller
              control={control}
              name={`${type}.is_use`}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  defaultValue={`${value ?? 0}`}
                  options={[
                    { label: '사용', value: '1' },
                    { label: '사용 안함', value: '0' },
                  ]}
                  onChange={val => onChange(Number(val))}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraForm;
