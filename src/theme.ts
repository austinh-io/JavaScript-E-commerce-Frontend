import { Theme } from './types/theme';

export const darkTheme: Theme = {
  name: 'dark-theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-color-base': 'rgb(0 0 0)',
    '--theme-font-color-dark': 'rgb(255 255 255)',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '4px',
    '--theme-rounded-chip': '4px',
    '--theme-rounded-badge': '9999px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--color-on-primary': 'rgb(0 0 0)',
    '--color-on-secondary': 'rgb(0 0 0)',
    '--color-on-tertiary': 'rgb(0 0 0)',
    '--color-on-success': 'rgb(0 0 0)',
    '--color-on-warning': 'rgb(0 0 0)',
    '--color-on-error': 'rgb(0 0 0)',
    '--color-on-surface': 'rgb(255 255 255)',
    // =~= Theme Colors  =~=
    // primary | #fec039
    '--color-primary-50': 'rgb(255 246 225)', // #fff6e1
    '--color-primary-100': 'rgb(255 242 215)', // #fff2d7
    '--color-primary-200': 'rgb(255 239 206)', // #ffefce
    '--color-primary-300': 'rgb(255 230 176)', // #ffe6b0
    '--color-primary-400': 'rgb(254 211 116)', // #fed374
    '--color-primary-500': 'rgb(254 192 57)', // #fec039
    '--color-primary-600': 'rgb(229 173 51)', // #e5ad33
    '--color-primary-700': 'rgb(191 144 43)', // #bf902b
    '--color-primary-800': 'rgb(152 115 34)', // #987322
    '--color-primary-900': 'rgb(124 94 28)', // #7c5e1c
    // secondary | #cd71fe
    '--color-secondary-50': 'rgb(248 234 255)', // #f8eaff
    '--color-secondary-100': 'rgb(245 227 255)', // #f5e3ff
    '--color-secondary-200': 'rgb(243 220 255)', // #f3dcff
    '--color-secondary-300': 'rgb(235 198 255)', // #ebc6ff
    '--color-secondary-400': 'rgb(220 156 254)', // #dc9cfe
    '--color-secondary-500': 'rgb(205 113 254)', // #cd71fe
    '--color-secondary-600': 'rgb(185 102 229)', // #b966e5
    '--color-secondary-700': 'rgb(154 85 191)', // #9a55bf
    '--color-secondary-800': 'rgb(123 68 152)', // #7b4498
    '--color-secondary-900': 'rgb(100 55 124)', // #64377c
    // tertiary | #5c92ff
    '--color-tertiary-50': 'rgb(231 239 255)', // #e7efff
    '--color-tertiary-100': 'rgb(222 233 255)', // #dee9ff
    '--color-tertiary-200': 'rgb(214 228 255)', // #d6e4ff
    '--color-tertiary-300': 'rgb(190 211 255)', // #bed3ff
    '--color-tertiary-400': 'rgb(141 179 255)', // #8db3ff
    '--color-tertiary-500': 'rgb(92 146 255)', // #5c92ff
    '--color-tertiary-600': 'rgb(83 131 230)', // #5383e6
    '--color-tertiary-700': 'rgb(69 110 191)', // #456ebf
    '--color-tertiary-800': 'rgb(55 88 153)', // #375899
    '--color-tertiary-900': 'rgb(45 72 125)', // #2d487d
    // success | #71d26a
    '--color-success-50': 'rgb(234 248 233)', // #eaf8e9
    '--color-success-100': 'rgb(227 246 225)', // #e3f6e1
    '--color-success-200': 'rgb(220 244 218)', // #dcf4da
    '--color-success-300': 'rgb(198 237 195)', // #c6edc3
    '--color-success-400': 'rgb(156 224 151)', // #9ce097
    '--color-success-500': 'rgb(113 210 106)', // #71d26a
    '--color-success-600': 'rgb(102 189 95)', // #66bd5f
    '--color-success-700': 'rgb(85 158 80)', // #559e50
    '--color-success-800': 'rgb(68 126 64)', // #447e40
    '--color-success-900': 'rgb(55 103 52)', // #376734
    // warning | #ff9147
    '--color-warning-50': 'rgb(255 239 227)', // #ffefe3
    '--color-warning-100': 'rgb(255 233 218)', // #ffe9da
    '--color-warning-200': 'rgb(255 228 209)', // #ffe4d1
    '--color-warning-300': 'rgb(255 211 181)', // #ffd3b5
    '--color-warning-400': 'rgb(255 178 126)', // #ffb27e
    '--color-warning-500': 'rgb(255 145 71)', // #ff9147
    '--color-warning-600': 'rgb(230 131 64)', // #e68340
    '--color-warning-700': 'rgb(191 109 53)', // #bf6d35
    '--color-warning-800': 'rgb(153 87 43)', // #99572b
    '--color-warning-900': 'rgb(125 71 35)', // #7d4723
    // error | #ff4258
    '--color-error-50': 'rgb(255 227 230)', // #ffe3e6
    '--color-error-100': 'rgb(255 217 222)', // #ffd9de
    '--color-error-200': 'rgb(255 208 213)', // #ffd0d5
    '--color-error-300': 'rgb(255 179 188)', // #ffb3bc
    '--color-error-400': 'rgb(255 123 138)', // #ff7b8a
    '--color-error-500': 'rgb(255 66 88)', // #ff4258
    '--color-error-600': 'rgb(230 59 79)', // #e63b4f
    '--color-error-700': 'rgb(191 50 66)', // #bf3242
    '--color-error-800': 'rgb(153 40 53)', // #992835
    '--color-error-900': 'rgb(125 32 43)', // #7d202b
    // surface | #222449
    '--color-surface-50': 'rgb(222 222 228)', // #dedee4
    '--color-surface-100': 'rgb(211 211 219)', // #d3d3db
    '--color-surface-200': 'rgb(200 200 210)', // #c8c8d2
    '--color-surface-300': 'rgb(167 167 182)', // #a7a7b6
    '--color-surface-400': 'rgb(100 102 128)', // #646680
    '--color-surface-500': 'rgb(34 36 73)', // #222449
    '--color-surface-600': 'rgb(31 32 66)', // #1f2042
    '--color-surface-700': 'rgb(26 27 55)', // #1a1b37
    '--color-surface-800': 'rgb(20 22 44)', // #14162c
    '--color-surface-900': 'rgb(17 18 36)', // #111224
  },
};

export const lightTheme: Theme = {
  name: 'light-theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-color-base': 'rgb(0 0 0)',
    '--theme-font-color-dark': 'rgb(255 255 255)',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '4px',
    '--theme-rounded-chip': '4px',
    '--theme-rounded-badge': '9999px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--color-on-primary': 'rgb(0 0 0)',
    '--color-on-secondary': 'rgb(0 0 0)',
    '--color-on-tertiary': 'rgb(0 0 0)',
    '--color-on-success': 'rgb(0 0 0)',
    '--color-on-warning': 'rgb(0 0 0)',
    '--color-on-error': 'rgb(0 0 0)',
    '--color-on-surface': 'rgb(255 255 255)',
    // =~= Theme Colors  =~=
    // primary | #fec039
    '--color-primary-50': 'rgb(255 246 225)', // #fff6e1
    '--color-primary-100': 'rgb(255 242 215)', // #fff2d7
    '--color-primary-200': 'rgb(255 239 206)', // #ffefce
    '--color-primary-300': 'rgb(255 230 176)', // #ffe6b0
    '--color-primary-400': 'rgb(254 211 116)', // #fed374
    '--color-primary-500': 'rgb(254 192 57)', // #fec039
    '--color-primary-600': 'rgb(229 173 51)', // #e5ad33
    '--color-primary-700': 'rgb(191 144 43)', // #bf902b
    '--color-primary-800': 'rgb(152 115 34)', // #987322
    '--color-primary-900': 'rgb(124 94 28)', // #7c5e1c
    // secondary | #cd71fe
    '--color-secondary-50': 'rgb(248 234 255)', // #f8eaff
    '--color-secondary-100': 'rgb(245 227 255)', // #f5e3ff
    '--color-secondary-200': 'rgb(243 220 255)', // #f3dcff
    '--color-secondary-300': 'rgb(235 198 255)', // #ebc6ff
    '--color-secondary-400': 'rgb(220 156 254)', // #dc9cfe
    '--color-secondary-500': 'rgb(205 113 254)', // #cd71fe
    '--color-secondary-600': 'rgb(185 102 229)', // #b966e5
    '--color-secondary-700': 'rgb(154 85 191)', // #9a55bf
    '--color-secondary-800': 'rgb(123 68 152)', // #7b4498
    '--color-secondary-900': 'rgb(100 55 124)', // #64377c
    // tertiary | #5c92ff
    '--color-tertiary-50': 'rgb(231 239 255)', // #e7efff
    '--color-tertiary-100': 'rgb(222 233 255)', // #dee9ff
    '--color-tertiary-200': 'rgb(214 228 255)', // #d6e4ff
    '--color-tertiary-300': 'rgb(190 211 255)', // #bed3ff
    '--color-tertiary-400': 'rgb(141 179 255)', // #8db3ff
    '--color-tertiary-500': 'rgb(92 146 255)', // #5c92ff
    '--color-tertiary-600': 'rgb(83 131 230)', // #5383e6
    '--color-tertiary-700': 'rgb(69 110 191)', // #456ebf
    '--color-tertiary-800': 'rgb(55 88 153)', // #375899
    '--color-tertiary-900': 'rgb(45 72 125)', // #2d487d
    // success | #71d26a
    '--color-success-50': 'rgb(234 248 233)', // #eaf8e9
    '--color-success-100': 'rgb(227 246 225)', // #e3f6e1
    '--color-success-200': 'rgb(220 244 218)', // #dcf4da
    '--color-success-300': 'rgb(198 237 195)', // #c6edc3
    '--color-success-400': 'rgb(156 224 151)', // #9ce097
    '--color-success-500': 'rgb(113 210 106)', // #71d26a
    '--color-success-600': 'rgb(102 189 95)', // #66bd5f
    '--color-success-700': 'rgb(85 158 80)', // #559e50
    '--color-success-800': 'rgb(68 126 64)', // #447e40
    '--color-success-900': 'rgb(55 103 52)', // #376734
    // warning | #ff9147
    '--color-warning-50': 'rgb(255 239 227)', // #ffefe3
    '--color-warning-100': 'rgb(255 233 218)', // #ffe9da
    '--color-warning-200': 'rgb(255 228 209)', // #ffe4d1
    '--color-warning-300': 'rgb(255 211 181)', // #ffd3b5
    '--color-warning-400': 'rgb(255 178 126)', // #ffb27e
    '--color-warning-500': 'rgb(255 145 71)', // #ff9147
    '--color-warning-600': 'rgb(230 131 64)', // #e68340
    '--color-warning-700': 'rgb(191 109 53)', // #bf6d35
    '--color-warning-800': 'rgb(153 87 43)', // #99572b
    '--color-warning-900': 'rgb(125 71 35)', // #7d4723
    // error | #ff4258
    '--color-error-50': 'rgb(255 227 230)', // #ffe3e6
    '--color-error-100': 'rgb(255 217 222)', // #ffd9de
    '--color-error-200': 'rgb(255 208 213)', // #ffd0d5
    '--color-error-300': 'rgb(255 179 188)', // #ffb3bc
    '--color-error-400': 'rgb(255 123 138)', // #ff7b8a
    '--color-error-500': 'rgb(255 66 88)', // #ff4258
    '--color-error-600': 'rgb(230 59 79)', // #e63b4f
    '--color-error-700': 'rgb(191 50 66)', // #bf3242
    '--color-error-800': 'rgb(153 40 53)', // #992835
    '--color-error-900': 'rgb(125 32 43)', // #7d202b
    // surface | #222449
    '--color-surface-50': 'rgb(222 222 228)', // #dedee4
    '--color-surface-100': 'rgb(211 211 219)', // #d3d3db
    '--color-surface-200': 'rgb(200 200 210)', // #c8c8d2
    '--color-surface-300': 'rgb(167 167 182)', // #a7a7b6
    '--color-surface-400': 'rgb(100 102 128)', // #646680
    '--color-surface-500': 'rgb(34 36 73)', // #222449
    '--color-surface-600': 'rgb(31 32 66)', // #1f2042
    '--color-surface-700': 'rgb(26 27 55)', // #1a1b37
    '--color-surface-800': 'rgb(20 22 44)', // #14162c
    '--color-surface-900': 'rgb(17 18 36)', // #111224
  },
};
