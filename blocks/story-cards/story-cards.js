import {
  createOptimizedPicture, loadCSS, readBlockConfig,
} from '../../scripts/lib-franklin.js';

export function buildCard(card, large = false) {
  const {
    path, title, image, category, description,
  } = card;

  const cardElement = document.createElement('div');
  cardElement.classList.add('post-listing--item');

  cardElement.innerHTML = `
    <a href="${path}" target="_self" class="teaser-link">
      <span class="overline small">
          <span>${category}</span>
      </span>
      <h2 class="headline">${title}</h2>
      <div class="excerpt">
        <p>${description}</p>
      </div>
      <span class="small read-story">
        <span>Read More</span>
      </span>
    </a>`;

  // Width based on max-width set in css
  const breakpoints = [{ width: large ? '1000' : '450' }];
  const pictureElement = createOptimizedPicture(image, `Image symbolising ${title}`, false, breakpoints);
  if (image && pictureElement) {
    cardElement.prepend(pictureElement);
  }
  return cardElement;
}

function addCardsToCardList(cards, cardList) {
  cards.forEach((card, index) => {
    const storyListItem = document.createElement('li');
    storyListItem.classList.add('related-list-item');

    const largeCard = index === 0;

    storyListItem.append(buildCard(card, largeCard));
    cardList.appendChild(storyListItem);
  });
}

export async function getStories(category) {
  const response = await fetch(`/${category}/query-index.json`);
  const json = await response.json();
  const queryResult = json.data.filter(((data) => data.category.includes(category)));
  return queryResult;
}

export async function getFeaturedStories(storyPath) {
  const response = await fetch('/query-index.json');
  const json = await response.json();
  const queryResult = json.data.filter(((data) => data.path.includes(storyPath)));
  return queryResult;
}

async function loadStories(block, categories, featuredStoryPaths) {
  const storyList = document.createElement('ul');
  storyList.classList.add('related-list', 'story-cards-container');

  if (featuredStoryPaths) {
    await featuredStoryPaths.map(async (storyPath) => {
      const stories = await getFeaturedStories(storyPath);
      addCardsToCardList(stories, storyList);
    });
  }

  if (categories) {
    await categories.map(async (category) => {
      const stories = await getStories(category);
      addCardsToCardList(stories, storyList);
    });
  }

  block.appendChild(storyList);
}

export default async function decorate(block) {
  loadCSS('/blocks/story-posts/story-cards.css');

  const config = readBlockConfig(block);
  const categories = config.categories ? config.categories.split(', ') : null;
  let featuredStoryPaths = config.featured ? config.featured : null;

  if (featuredStoryPaths && !Array.isArray(featuredStoryPaths)) {
    featuredStoryPaths = featuredStoryPaths.split();
  }

  block.innerHTML = '';

  await loadStories(block, categories, featuredStoryPaths);
}
