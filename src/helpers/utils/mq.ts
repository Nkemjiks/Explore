/* eslint-disable */
// https://github.com/styled-components/styled-components/blob/master/packages/styled-components/docs/tips-and-tricks.md
import { css } from 'styled-components';

const sizes = {
  mobile: 425,
  tablet: 768,
  laptopSmall: 1024,
  laptop: 1280,
  desktop: 1440,
  xtralarge: 1840
};

const mediaQueries = Object.keys(sizes).reduce(
  (accumulator: any, label: any) => {
    // @ts-ignore
    const emSize: number = sizes[label] / 16;

    accumulator[label] = (...args: any[]) => css`
      @media (min-width: ${emSize}em) {
        // @ts-ignore
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export default mediaQueries;