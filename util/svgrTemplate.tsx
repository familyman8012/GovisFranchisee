/* eslint-disable no-shadow */
// @ts-nocheck
// const generate = require('@babel/generator').default;

// function template(variables, { tpl }) {
//   const { imports, interfaces } = variables;

//   console.log('interfaces', interfaces);

//   // React import 제거
//   const newImports = imports
//     .map(imp => {
//       if (imp.source.value === 'react') {
//         return null; // React import 제거
//       }
//       const specifiers = imp.specifiers.map(spec => spec.local.name).join(', ');
//       return `import { ${specifiers} } from '${imp.source.value}';`;
//     })
//     .filter(Boolean) // null 제거
//     .join('\n');

//   let svgElement = `
//   ${generate(variables.jsx).code}
//   `;

//   // width와 height 속성을 size prop을 사용하도록 수정
//   // eslint-disable-next-line no-template-curly-in-string
//   svgElement = svgElement.replace('<svg', '<svg css={css`${props.customCss}`}');
//   svgElement = svgElement.replace('width={24}', 'width={size || 16}');
//   svgElement = svgElement.replace('height={24}', 'height={size || 16}');
//   svgElement = svgElement.replace(
//     'viewBox="0 0 24 24"',
//     // eslint-disable-next-line no-template-curly-in-string
//     'viewBox={`0 0 ${viewBoxSize || 24} ${viewBoxSize || 24}`}'
//   );

//   const componentNameWithoutSvgPrefix = variables.componentName.replace(
//     /^Svg/,
//     ''
//   );

//   return tpl`
//   import { css } from '@emotion/react';

// ${newImports}

// type Props = React.SVGProps<SVGSVGElement> & {
//   size?: number;
//   viewBoxSize?:number;
//   customCss?: any;
// };
// const ${componentNameWithoutSvgPrefix} = ({ size, viewBoxSize, ...props }: Props) => (

//     ${svgElement}
// );
// export default ${componentNameWithoutSvgPrefix};

//   `;
// }

// module.exports = template;
console.log('aaa');
