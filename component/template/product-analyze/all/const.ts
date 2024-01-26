import { IOption } from '@ComponentFarm/atom/Select/Select';

export const options: IOption[] = [
  {
    value: 'hourly',
    label: '시간별',
  },
  {
    value: 'daily',
    label: '일별',
  },
  {
    value: 'weekly',
    label: '주별',
  },
  {
    value: 'monthly',
    label: '월별',
  },
];

const typeValue =
  typeof window !== 'undefined' &&
  new URLSearchParams(new URL(window.location.href).search).get('type');

export const calCulateXformat = (formValue: string, type?: string) => {
  if (typeValue === 'hourly') {
    return type === 'chart' ? `${formValue}시` : `${formValue}:00`;
  }
  if (typeValue === 'daily') {
    return type === 'chart' ? `11.${formValue}` : `2023-11-${formValue}`;
  }
  if (typeValue === 'monthly') {
    return `${formValue}월`;
  }
  return formValue;
};
