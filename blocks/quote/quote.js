export default function decorate(block) {
  // decorate the quote as a blockquote element
  const quoteDiv = block.querySelector(':scope > div > div');
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = quoteDiv.innerHTML;
  quoteDiv.replaceWith(blockquote);

  // decorate the author
  const authorDiv = block.querySelector(':scope blockquote p:last-child');
  if (authorDiv) {
    const cite = document.createElement('cite');
    cite.classList.add('small');
    cite.innerHTML = authorDiv.innerText;
    authorDiv.replaceWith(cite);
  }
}
