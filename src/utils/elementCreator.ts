export function createButton(
  text: string = 'Button',
  onClick: () => void,
  type: 'primary' | 'secondary' | 'tertiary' = 'primary'
) {
  const button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add(`btn-${type}`);
  button.addEventListener('click', onClick);
  button.textContent = text;
  return button;
}
