import './mainImports.ts';
import {
  initLightMode,
  currentTheme,
  initIconColorUpdateListener,
} from './utils/themeManager.ts';

const app = document.querySelector<HTMLDivElement>('#app');
document.querySelector('body')!.classList.add('bg-gradient');

initLightMode();

app!.innerHTML = /* HTML */ `
  <nav-bar></nav-bar>
  <div>
    <example-component></example-component>
    <div class="btn-group">
      <app-button>Home</app-button>
      <button class="btn btn-secondary">
        <div class="btn-content">
          <box-icon
            type="logo"
            name="facebook-square"
            color=${currentTheme.theme.properties[
              '--color-on-secondary'
            ]}></box-icon>
          Facebook
        </div>
      </button>

      <button class="btn btn-tertiary">
        <div class="btn-content">
          <box-icon
            type="solid"
            name="hot"
            color=${currentTheme.theme.properties[
              '--color-on-tertiary'
            ]}></box-icon>
          Lorem Ipsum
        </div>
      </button>

      <button class="btn btn-primary">
        <div class="btn-content">
          <box-icon
            type="solid"
            name="color"
            color=${currentTheme.theme.properties[
              '--color-on-primary'
            ]}></box-icon>
          Lorem Ipsum
        </div>
      </button>
    </div>

    <light-toggle></light-toggle>
  </div>

  <div>
    <h2>Hello, world!</h2>
    <p>lorem ipsum</p>
  </div>

  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ipsum suspendisse
    ultrices gravida dictum fusce ut placerat. Accumsan in nisl nisi scelerisque
    eu ultrices vitae auctor eu. Iaculis urna id volutpat lacus laoreet non.
    Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nulla
    porttitor massa id neque aliquam vestibulum morbi. Non tellus orci ac auctor
    augue. Pharetra sit amet aliquam id diam maecenas ultricies. Lectus
    vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisi vitae
    suscipit tellus mauris a diam. Faucibus ornare suspendisse sed nisi. Orci
    nulla pellentesque dignissim enim. Vestibulum lectus mauris ultrices eros in
    cursus turpis. Pellentesque nec nam aliquam sem. Et malesuada fames ac
    turpis. Scelerisque in dictum non consectetur a erat. Sed odio morbi quis
    commodo odio aenean sed adipiscing diam. Libero id faucibus nisl tincidunt
    eget nullam. Tempus quam pellentesque nec nam aliquam sem et tortor. Turpis
    cursus in hac habitasse platea. Velit sed ullamcorper morbi tincidunt ornare
    massa eget egestas. Facilisi morbi tempus iaculis urna id volutpat. Mattis
    ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Viverra
    nam libero justo laoreet sit amet cursus. Velit dignissim sodales ut eu sem
    integer vitae justo eget. Id cursus metus aliquam eleifend mi in nulla
    posuere sollicitudin. Ultricies integer quis auctor elit sed vulputate mi
    sit amet. Scelerisque varius morbi enim nunc faucibus a pellentesque.
    Pellentesque eu tincidunt tortor aliquam. Et magnis dis parturient montes
    nascetur ridiculus mus. Leo in vitae turpis massa sed elementum tempus
    egestas sed. Sed turpis tincidunt id aliquet risus. Enim tortor at auctor
    urna nunc id cursus metus aliquam. Amet tellus cras adipiscing enim eu. A
    pellentesque sit amet porttitor. Sed turpis tincidunt id aliquet. Interdum
    velit laoreet id donec ultrices. Bibendum est ultricies integer quis auctor
    elit. Nec feugiat in fermentum posuere urna nec. Mattis molestie a iaculis
    at erat pellentesque adipiscing commodo elit. Volutpat diam ut venenatis
    tellus in metus vulputate eu scelerisque. Phasellus faucibus scelerisque
    eleifend donec. Venenatis cras sed felis eget velit aliquet sagittis id.
    Sodales neque sodales ut etiam sit amet nisl. Scelerisque fermentum dui
    faucibus in ornare quam. Diam sollicitudin tempor id eu nisl nunc.
    Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Vehicula
    ipsum a arcu cursus vitae congue. Lobortis elementum nibh tellus molestie
    nunc non blandit massa. Eget aliquet nibh praesent tristique magna sit. Ut
    ornare lectus sit amet est placerat in egestas. Scelerisque fermentum dui
    faucibus in ornare quam viverra orci. Elit duis tristique sollicitudin nibh
    sit amet commodo nulla facilisi. Pellentesque id nibh tortor id aliquet.
    Sapien et ligula ullamcorper malesuada. Dolor magna eget est lorem ipsum
    dolor. Leo a diam sollicitudin tempor. In mollis nunc sed id semper risus.
    Consectetur adipiscing elit duis tristique sollicitudin nibh. Magna
    fermentum iaculis eu non diam phasellus vestibulum lorem. Egestas sed sed
    risus pretium quam vulputate dignissim. Etiam non quam lacus suspendisse
    faucibus interdum. Ipsum consequat nisl vel pretium. Consectetur adipiscing
    elit duis tristique sollicitudin nibh sit. Elit eget gravida cum sociis
    natoque penatibus et magnis. Tellus orci ac auctor augue mauris augue. Nunc
    sed augue lacus viverra vitae congue eu consequat. Ac feugiat sed lectus
    vestibulum mattis ullamcorper velit. Posuere lorem ipsum dolor sit. In
    cursus turpis massa tincidunt dui ut.
  </div>
`;

initIconColorUpdateListener();
