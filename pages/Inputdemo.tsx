import React, { useState, useCallback, ChangeEventHandler } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import dayjs from "dayjs";
import { GoRadio } from "../components/elements/GoRadio";
import { ImageRadio } from "../components/elements/ImageRadio";
import GoCheckBox, { ListCustomCheckBox } from "../components/elements/GoCheckbox";
import { Datepicker } from "../components/elements/Datepicker";

function InputDemo() {
  // radio handler (onChange 방식)
  const [selesctValue, setSelesctValue] = useState("");

  const handlerRadio = (e: any) => {
    setSelesctValue(e.target.value);
  };

  const {
    control,
    watch,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // 이미지라디오
  const RadioOptions = [1, 2, 3, 4, 5];
  const [radios, setRadios] = useState({
    work_score: 0,
    service_score: 0,
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const selected = RadioOptions.find((optionValue) => optionValue === Number(value));
    if (selected) {
      setRadios({
        ...radios,
        [name]: value,
      });
    }
  };

  // checkbox - onChange
  const [checkedInputs, setCheckedInputs] = useState<string[]>([]);

  const changeHandler = (isChk: boolean, id: string) => {
    if (isChk) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el: string) => el !== id));
    }
  };

  //리스트체크박스
  const IsChk = watch("occur_type");

  //데이터picker
  // 달력 - 하루만 지정하고 싶을때
  const [startDate, setStartDate] = useState("");
  const [startDate2, setStartDate2] = useState("");

  const handlerChange = (dates: any) => {
    const [start] = dates;
    setStartDate(start);
  };
  const handlerChange2 = (dates: any) => {
    const [start] = dates;
    setStartDate2(start);
  };

  // 달력 - 시작일과 끝일
  const NOW = Date.now();
  const DAY = 60 * 60 * 24 * 1000;
  const initialStartDate = dayjs(NOW - DAY * 2);
  const initialEndDate = dayjs(NOW - DAY);
  const [params, setParams] = useState({
    record_start_dt: initialStartDate.format("YYYY-MM-DD"),
    record_end_dt: initialEndDate.format("YYYY-MM-DD"),
    sort_type: 1,
  });
  const handleDateChange = ([record_start_dt, record_end_dt]: string[]) =>
    setParams({
      ...params,
      record_start_dt,
      record_end_dt,
    });

  return (
    <>
      <h1>공통컴포넌트 모음</h1>
      <h2>라디오</h2>
      <div className="tit">input radio onChange 방식</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <GoRadio
            key={`goRadio${i}`}
            label={el}
            id={`claimRadio2${i}`}
            selesctValue={selesctValue}
            onChange={handlerRadio}
            value={i}
          />
        ))}
      </div>
      <div className="tit">input radio onChange 방식 (circleSize : xs, s, m, l) (color : 지정)</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <GoRadio
            key={`goRadio2${i}`}
            label={el}
            id={`claimRadio3${i}`}
            selesctValue={selesctValue}
            onChange={handlerRadio}
            value={i}
            circleSize={"s"}
            circleColor={"#ff862c"}
          />
        ))}
      </div>
      <div className="tit">input radio onChange 방식 (circleSize : xs, s, m, l) (color : 지정) disable</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <GoRadio
            key={`goRadio3${i}`}
            label={el}
            id={`claimRadio3${i}`}
            selesctValue={selesctValue}
            onChange={handlerRadio}
            value={i}
            circleSize={"s"}
            circleColor={"#ff862c"}
            disabled={true}
          />
        ))}
      </div>
      <div className="tit">input radio onChange 방식 Round</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <GoRadio
            key={`goRadio4${i}`}
            label={el}
            className="round"
            id={`claimRadio3${i}`}
            selesctValue={selesctValue}
            onChange={handlerRadio}
            value={i}
          />
        ))}
      </div>
      <div className="tit">input radio react hook form </div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <GoRadio
            key={`goRadio5${i}`}
            label={el}
            id={`claimRadio${i}`}
            register={{
              ...register(`claimRadio`, {
                required: true,
              }),
            }}
          />
        ))}
      </div>
      <div className="tit">이미지 라디오 </div>
      <div style={{ width: 300 }}>
        <ImageRadio
          radioId={"work_score"}
          RadioOptions={RadioOptions}
          selectedRadios={radios.work_score}
          onChange={onChange}
          width={24}
          height={24}
          url="ico_as_"
        />
      </div>
      <hr />
      <h2>체크박스</h2>
      <div className="tit"> onChange 방식 checkbox Default</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <div key={i}>
            <input
              key={`goCheck${i}`}
              id={`check${i}`}
              type="checkbox"
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, `check${i}`);
              }}
              checked={checkedInputs.includes(`check${i}`) ? true : false}
            />{" "}
            체크 <label htmlFor={`check${i}`}>{i}</label>
          </div>
        ))}
      </div>
      <div className="tit"> onChange 방식 checkbox Custom </div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <div key={i}>
            <GoCheckBox
              key={`goCheck2${i}`}
              label={el}
              id={`check2${i}`}
              onChange={changeHandler}
              checked={checkedInputs.includes(`check2${i}`) ? true : false}
            />
          </div>
        ))}
      </div>
      <div className="tit">react hook form 방식 checkbox</div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <div key={i}>
            <GoCheckBox
              key={`goCheck3${i}`}
              label={el}
              id={`claimkind2${i}`}
              register={{
                ...register(`claimkind2.${i}`, {
                  required: true,
                }),
              }}
            />
          </div>
        ))}
      </div>
      <div>
        {["이물혼입", "배송불량", "입수부족", "기타(상세기재)"].map((el, i) => (
          <div key={i}>
            <ListCustomCheckBox
              label={el}
              key={i}
              value={i}
              id={`occur_type${i}`}
              className={IsChk && IsChk.includes(String(i)) ? "on" : ""}
              register={{
                ...register(`occur_type.${i}`, {
                  validate: () => getValues("occur_type").filter((el: boolean) => el !== false).length !== 0,
                }),
              }}
              register2={{
                ...register("occur_etc"),
              }}
            />
          </div>
        ))}
      </div>
      <div className="tit">react hook form 방식 DatePicker</div>
      {/* 단일선택 */}
      <div>
        <Datepicker value={[startDate]} editable={false} onChange={handlerChange} />
      </div>
      <div>
        <Datepicker value={[startDate2]} editable={false} onChange={handlerChange2} />
      </div>
      {/* 시작일과 끝일 */}
      <div>
        <Datepicker
          value={[params.record_start_dt, params.record_end_dt]}
          editable={false}
          onChange={handleDateChange}
          range
        />
      </div>
    </>
  );
}

export default InputDemo;
