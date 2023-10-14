const testEl1 = document.querySelector('.testing-item-1');
const testEl2 = document.querySelector('.testing2');

const testVariable1 = new URLSearchParams(window.location.search).get(
  'testVariable1'
);

const testVariable2 = new URLSearchParams(window.location.search).get(
  'testVariable2'
);

console.log(testEl1);
console.log(testEl2);

testEl1.innerText = testVariable1;
testEl2.innerText = testVariable2;

console.log(testVariable1);
console.log(testVariable2);
