import React from 'react';

import { SvgProps } from '../../../interfaces/Svg';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
               viewBox="0 0 20 20" version="1.1" {...props}>
      <g id="surface1">
        <path style={{stroke: 'none', fillRule: 'nonzero', fill: 'rgb(100%,100%,100%)', fillOpacity: 1}}
              d="M 5 1.667969 C 4.078125 1.667969 3.332031 2.414062 3.332031 3.332031 L 3.332031 16.667969 C 3.332031 17.585938 4.078125 18.332031 5 18.332031 L 13.691406 18.332031 C 13.453125 17.78125 13.332031 17.199219 13.332031 16.667969 L 5 16.667969 L 5 6.667969 L 15 6.667969 L 15 8.332031 L 16.667969 8.332031 L 16.667969 3.332031 C 16.667969 2.414062 15.921875 1.667969 15 1.667969 Z M 5 3.332031 L 15 3.332031 L 15 5 L 5 5 Z M 6.667969 8.332031 L 6.667969 10 L 8.332031 10 L 8.332031 8.332031 Z M 9.167969 8.332031 L 9.167969 10 L 10.832031 10 L 10.832031 8.332031 Z M 11.667969 8.332031 L 11.667969 10 L 13.332031 10 L 13.332031 8.332031 Z M 16.667969 10 L 16.667969 11 C 15.832031 11.25 15 12 15 13.332031 C 15 14.917969 16.332031 15.417969 17.167969 15.75 C 18.167969 16.167969 18.332031 16.25 18.332031 16.667969 C 18.332031 17.082031 18.167969 17.5 17.5 17.5 C 16.832031 17.5 16.667969 17.082031 16.667969 16.667969 L 15 16.667969 C 15 17.5 15.5 18.667969 16.667969 19 L 16.667969 20 L 18.332031 20 L 18.332031 19 C 19.5 18.667969 20 17.5 20 16.667969 C 20 15.082031 18.667969 14.582031 17.832031 14.25 C 16.832031 13.832031 16.667969 13.75 16.667969 13.332031 C 16.667969 12.667969 17.082031 12.5 17.5 12.5 C 18.167969 12.5 18.332031 12.917969 18.332031 13.332031 L 20 13.332031 C 20 12.5 19.5 11.332031 18.332031 11 L 18.332031 10 Z M 6.667969 10.832031 L 6.667969 12.5 L 8.332031 12.5 L 8.332031 10.832031 Z M 9.167969 10.832031 L 9.167969 12.5 L 10.832031 12.5 L 10.832031 10.832031 Z M 11.667969 10.832031 L 11.667969 12.5 L 13.332031 12.5 L 13.332031 10.832031 Z M 6.667969 13.332031 L 6.667969 15 L 8.332031 15 L 8.332031 13.332031 Z M 9.167969 13.332031 L 9.167969 15 L 13.332031 15 L 13.332031 13.332031 Z M 9.167969 13.332031 "/>
      </g>
    </svg>
  );
};

export default Icon;