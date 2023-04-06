import React from "react";
import { ImgRadioContainer, RadioButton, WrapImageRadio } from "./imgRadioSty";

interface IImageRadio {
  radioId: string;
  RadioOptions: number[];
  selectedRadios: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
  height: number;
  url: string;
}

export function ImageRadio({ radioId, RadioOptions, selectedRadios, onChange, width, height, url }: IImageRadio) {
  return (
    <ImgRadioContainer>
      {RadioOptions.map((optionValue, i) => (
        <WrapImageRadio key={optionValue} i={i} width={width} height={height} url={url}>
          <RadioButton
            id={`${radioId}${i}`}
            type="radio"
            name={`${radioId}`}
            value={optionValue}
            checked={optionValue === Number(selectedRadios)}
            onChange={onChange}
          />
          <label htmlFor={`${radioId}${i}`} />
        </WrapImageRadio>
      ))}
    </ImgRadioContainer>
  );
}
