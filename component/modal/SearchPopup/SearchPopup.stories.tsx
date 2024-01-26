import { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Modal/SearchPopup',
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

// interface Props {
//   darkMode: boolean;
// }

// const ResultTempArr = [
//   {
//     idx: 0,
//     category: '피자',
//     name: '오리지널 페페로니 피자',

//     state: 'op',
//   },
//   {
//     idx: 1,
//     category: '피자',
//     name: '베이컨 포테이토 피자',

//     state: 'op',
//   },
//   {
//     idx: 2,
//     category: '피자',
//     name: '매니악 페로니 피자',

//     state: 'st',
//   },
//   {
//     idx: 3,
//     category: '피자',
//     name: '매니악 페로니 피자',

//     state: 'st',
//   },
//   {
//     idx: 4,
//     category: '피자',
//     name: '매니악 페로니 피자',
//     state: 'st',
//   },
// ];

// const StoryStorePopup: Story<Props> = args => {
//   const [isOpen, setIsOpen] = useState(false);

//   const columnName = {
//     searchBoxTitle: ['제품 상태', '제품 분류'],
//     th: ['제품 분류', '제품명', '제품 상태'],
//     col: [46, 180, 240, 180],
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isOpen]);

//   const handlerClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <StoryLayout
//       {...args}
//       customCss={css`
//         height: 500px;
//       `}
//     >
//       <div>
//         <Button variant="primary" onClick={() => setIsOpen(true)}>
//           제품 상세 설정
//         </Button>
//         <SearchPopup
//           data={ResultTempArr}
//           isOpen={isOpen}
//           onClose={handlerClose}
//           title="제품 상세 설정"
//           columnName={columnName}
//         />
//       </div>
//     </StoryLayout>
//   );
// };
// export const Default = StoryStorePopup.bind({});

// const ResultTempArr2 = [
//   {
//     id: 0,
//     kind: '시가지',
//     name: '광화문',
//     date: '2023-10-20',
//     state: 'op',
//   },
//   {
//     id: 1,
//     kind: '시가지',
//     name: '강남점',
//     date: '2023-10-20',
//     state: 'op',
//   },
//   {
//     id: 2,
//     kind: '직영점',
//     name: '홍대점',
//     date: '2023-10-20',
//     state: 'st',
//   },
//   {
//     id: 3,
//     kind: '직영점',
//     name: '개봉점',
//     date: '2023-10-20',
//     state: 'st',
//   },
//   {
//     id: 4,
//     kind: 'X-GOPIZZA',
//     name: '철산점',
//     date: '2023-10-20',
//     state: 'st',
//   },
// ];

// const columnName = {
//   searchBoxTitle: ['매장 상태', '매장 분류'],
//   th: ['매장 분류', '매장명', '매장 오픈일', '매장 상태'],
//   col: [46, 130, 100, 190, 180],
// };

// const StoryStorePopup2: Story<Props> = args => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isOpen]);

//   const handlerClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <StoryLayout
//       {...args}
//       customCss={css`
//         height: 500px;
//       `}
//     >
//       <div>
//         <Button variant="primary" onClick={() => setIsOpen(true)}>
//           다른 곳에서 사용될때
//         </Button>
//         <SearchPopup
//           title="매장 검색"
//           // columnName={columnName}
//           // data={ResultTempArr2}
//           isOpen={isOpen}
//           onClose={handlerClose}
//         />
//       </div>
//     </StoryLayout>
//   );
// };
// export const Various = StoryStorePopup2.bind({});

// const StoryStorePopup3: Story<Props> = args => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isOpen]);

//   const handlerClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <StoryLayout
//       {...args}
//       customCss={css`
//         height: 500px;
//       `}
//     >
//       <div>
//         <Button variant="primary" onClick={() => setIsOpen(true)}>
//           라디오 스타일
//         </Button>
//         <SearchPopup
//           title="매장 검색"
//           type="radio"
//           columnName={columnName}
//           data={ResultTempArr2}
//           isOpen={isOpen}
//           onClose={handlerClose}
//         />
//       </div>
//     </StoryLayout>
//   );
// };
// export const RadioSty = StoryStorePopup3.bind({});
