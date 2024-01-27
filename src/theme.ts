import { Theme } from './types/theme';

export const darkTheme: Theme = {
  name: 'dark-theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '4px',
    '--theme-rounded-chip': '4px',
    '--theme-rounded-badge': '9999px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--color-on-primary': '0 0 0',
    '--color-on-secondary': '0 0 0',
    '--color-on-tertiary': '0 0 0',
    '--color-on-success': '0 0 0',
    '--color-on-warning': '0 0 0',
    '--color-on-error': '0 0 0',
    '--color-on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #fec039
    '--color-primary-50': '255 246 225', // #fff6e1
    '--color-primary-100': '255 242 215', // #fff2d7
    '--color-primary-200': '255 239 206', // #ffefce
    '--color-primary-300': '255 230 176', // #ffe6b0
    '--color-primary-400': '254 211 116', // #fed374
    '--color-primary-500': '254 192 57', // #fec039
    '--color-primary-600': '229 173 51', // #e5ad33
    '--color-primary-700': '191 144 43', // #bf902b
    '--color-primary-800': '152 115 34', // #987322
    '--color-primary-900': '124 94 28', // #7c5e1c
    // secondary | #cd71fe
    '--color-secondary-50': '248 234 255', // #f8eaff
    '--color-secondary-100': '245 227 255', // #f5e3ff
    '--color-secondary-200': '243 220 255', // #f3dcff
    '--color-secondary-300': '235 198 255', // #ebc6ff
    '--color-secondary-400': '220 156 254', // #dc9cfe
    '--color-secondary-500': '205 113 254', // #cd71fe
    '--color-secondary-600': '185 102 229', // #b966e5
    '--color-secondary-700': '154 85 191', // #9a55bf
    '--color-secondary-800': '123 68 152', // #7b4498
    '--color-secondary-900': '100 55 124', // #64377c
    // tertiary | #5c92ff
    '--color-tertiary-50': '231 239 255', // #e7efff
    '--color-tertiary-100': '222 233 255', // #dee9ff
    '--color-tertiary-200': '214 228 255', // #d6e4ff
    '--color-tertiary-300': '190 211 255', // #bed3ff
    '--color-tertiary-400': '141 179 255', // #8db3ff
    '--color-tertiary-500': '92 146 255', // #5c92ff
    '--color-tertiary-600': '83 131 230', // #5383e6
    '--color-tertiary-700': '69 110 191', // #456ebf
    '--color-tertiary-800': '55 88 153', // #375899
    '--color-tertiary-900': '45 72 125', // #2d487d
    // success | #71d26a
    '--color-success-50': '234 248 233', // #eaf8e9
    '--color-success-100': '227 246 225', // #e3f6e1
    '--color-success-200': '220 244 218', // #dcf4da
    '--color-success-300': '198 237 195', // #c6edc3
    '--color-success-400': '156 224 151', // #9ce097
    '--color-success-500': '113 210 106', // #71d26a
    '--color-success-600': '102 189 95', // #66bd5f
    '--color-success-700': '85 158 80', // #559e50
    '--color-success-800': '68 126 64', // #447e40
    '--color-success-900': '55 103 52', // #376734
    // warning | #ff9147
    '--color-warning-50': '255 239 227', // #ffefe3
    '--color-warning-100': '255 233 218', // #ffe9da
    '--color-warning-200': '255 228 209', // #ffe4d1
    '--color-warning-300': '255 211 181', // #ffd3b5
    '--color-warning-400': '255 178 126', // #ffb27e
    '--color-warning-500': '255 145 71', // #ff9147
    '--color-warning-600': '230 131 64', // #e68340
    '--color-warning-700': '191 109 53', // #bf6d35
    '--color-warning-800': '153 87 43', // #99572b
    '--color-warning-900': '125 71 35', // #7d4723
    // error | #ff4258
    '--color-error-50': '255 227 230', // #ffe3e6
    '--color-error-100': '255 217 222', // #ffd9de
    '--color-error-200': '255 208 213', // #ffd0d5
    '--color-error-300': '255 179 188', // #ffb3bc
    '--color-error-400': '255 123 138', // #ff7b8a
    '--color-error-500': '255 66 88', // #ff4258
    '--color-error-600': '230 59 79', // #e63b4f
    '--color-error-700': '191 50 66', // #bf3242
    '--color-error-800': '153 40 53', // #992835
    '--color-error-900': '125 32 43', // #7d202b
    // surface | #222449
    '--color-surface-50': '222 222 228', // #dedee4
    '--color-surface-100': '211 211 219', // #d3d3db
    '--color-surface-200': '200 200 210', // #c8c8d2
    '--color-surface-300': '167 167 182', // #a7a7b6
    '--color-surface-400': '100 102 128', // #646680
    '--color-surface-500': '34 36 73', // #222449
    '--color-surface-600': '31 32 66', // #1f2042
    '--color-surface-700': '26 27 55', // #1a1b37
    '--color-surface-800': '20 22 44', // #14162c
    '--color-surface-900': '17 18 36', // #111224
  },
};

export const lightTheme: Theme = {
  name: 'light-theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '4px',
    '--theme-rounded-chip': '4px',
    '--theme-rounded-badge': '9999px',
    '--theme-border-base': '2px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '0 0 0',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '0 0 0',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #fec039
    '--color-primary-50': '255 246 225', // #fff6e1
    '--color-primary-100': '255 242 215', // #fff2d7
    '--color-primary-200': '255 239 206', // #ffefce
    '--color-primary-300': '255 230 176', // #ffe6b0
    '--color-primary-400': '254 211 116', // #fed374
    '--color-primary-500': '254 192 57', // #fec039
    '--color-primary-600': '229 173 51', // #e5ad33
    '--color-primary-700': '191 144 43', // #bf902b
    '--color-primary-800': '152 115 34', // #987322
    '--color-primary-900': '124 94 28', // #7c5e1c
    // secondary | #cd71fe
    '--color-secondary-50': '248 234 255', // #f8eaff
    '--color-secondary-100': '245 227 255', // #f5e3ff
    '--color-secondary-200': '243 220 255', // #f3dcff
    '--color-secondary-300': '235 198 255', // #ebc6ff
    '--color-secondary-400': '220 156 254', // #dc9cfe
    '--color-secondary-500': '205 113 254', // #cd71fe
    '--color-secondary-600': '185 102 229', // #b966e5
    '--color-secondary-700': '154 85 191', // #9a55bf
    '--color-secondary-800': '123 68 152', // #7b4498
    '--color-secondary-900': '100 55 124', // #64377c
    // tertiary | #5c92ff
    '--color-tertiary-50': '231 239 255', // #e7efff
    '--color-tertiary-100': '222 233 255', // #dee9ff
    '--color-tertiary-200': '214 228 255', // #d6e4ff
    '--color-tertiary-300': '190 211 255', // #bed3ff
    '--color-tertiary-400': '141 179 255', // #8db3ff
    '--color-tertiary-500': '92 146 255', // #5c92ff
    '--color-tertiary-600': '83 131 230', // #5383e6
    '--color-tertiary-700': '69 110 191', // #456ebf
    '--color-tertiary-800': '55 88 153', // #375899
    '--color-tertiary-900': '45 72 125', // #2d487d
    // success | #71d26a
    '--color-success-50': '234 248 233', // #eaf8e9
    '--color-success-100': '227 246 225', // #e3f6e1
    '--color-success-200': '220 244 218', // #dcf4da
    '--color-success-300': '198 237 195', // #c6edc3
    '--color-success-400': '156 224 151', // #9ce097
    '--color-success-500': '113 210 106', // #71d26a
    '--color-success-600': '102 189 95', // #66bd5f
    '--color-success-700': '85 158 80', // #559e50
    '--color-success-800': '68 126 64', // #447e40
    '--color-success-900': '55 103 52', // #376734
    // warning | #ff9147
    '--color-warning-50': '255 239 227', // #ffefe3
    '--color-warning-100': '255 233 218', // #ffe9da
    '--color-warning-200': '255 228 209', // #ffe4d1
    '--color-warning-300': '255 211 181', // #ffd3b5
    '--color-warning-400': '255 178 126', // #ffb27e
    '--color-warning-500': '255 145 71', // #ff9147
    '--color-warning-600': '230 131 64', // #e68340
    '--color-warning-700': '191 109 53', // #bf6d35
    '--color-warning-800': '153 87 43', // #99572b
    '--color-warning-900': '125 71 35', // #7d4723
    // error | #ff4258
    '--color-error-50': '255 227 230', // #ffe3e6
    '--color-error-100': '255 217 222', // #ffd9de
    '--color-error-200': '255 208 213', // #ffd0d5
    '--color-error-300': '255 179 188', // #ffb3bc
    '--color-error-400': '255 123 138', // #ff7b8a
    '--color-error-500': '255 66 88', // #ff4258
    '--color-error-600': '230 59 79', // #e63b4f
    '--color-error-700': '191 50 66', // #bf3242
    '--color-error-800': '153 40 53', // #992835
    '--color-error-900': '125 32 43', // #7d202b
    // surface | #222449
    '--color-surface-50': '222 222 228', // #dedee4
    '--color-surface-100': '211 211 219', // #d3d3db
    '--color-surface-200': '200 200 210', // #c8c8d2
    '--color-surface-300': '167 167 182', // #a7a7b6
    '--color-surface-400': '100 102 128', // #646680
    '--color-surface-500': '34 36 73', // #222449
    '--color-surface-600': '31 32 66', // #1f2042
    '--color-surface-700': '26 27 55', // #1a1b37
    '--color-surface-800': '20 22 44', // #14162c
    '--color-surface-900': '17 18 36', // #111224
  },
};
