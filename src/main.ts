import './css/app.css';
import './css/global.css';
import './components.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
  <div>
    <example-button></example-button>
    <example-component></example-component>
    <box-icon
      type="logo"
      name="facebook-square"></box-icon>
    <box-icon
      type="solid"
      name="hot"></box-icon>
    <p>Lorem Ipsum</p>
    <theme-toggle></theme-toggle>
  </div>
`;
