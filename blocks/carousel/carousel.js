export default function decorate(block) {
  [...block.children].forEach((row) => {
    block.append(...row.children);
    row.remove();
  });
  [...block.children].forEach((cell) => {
    if (cell.childNodes[0].textContent.trim() === '') {
      cell.childNodes[0].remove();
    }
  });
}
