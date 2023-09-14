export default function decorate(block) {
  // decorate the text as a small text element
  const smallDiv = block.querySelector(':scope > div > div');
  const small = document.createElement('small');
  small.innerHTML = smallDiv.innerHTML;
  smallDiv.parentElement.replaceWith(small);
}
