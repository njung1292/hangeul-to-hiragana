import _ from 'lodash';

export function getItemsForTamas(tamas) {
  return getItemsForTamasHelper(tamas, []);
}

function getItemsForTamasHelper(tamas, items) {
  if (tamas.length === 0) {
    return items;
  }

  if (tamas.length === 1) {
    items.push(tamas[0].favoriteItems[0]);
    return items;
  }

  const allFavoriteItems = _
    .chain(tamas)
    .map('favoriteItems')
    .flatten()
    .union()
    .value()
    .sort((a, b) => {
      const aScore = tamas.filter(tama => _.includes(tama.favoriteItems, a)).length;
      const bScore = tamas.filter(tama => _.includes(tama.favoriteItems, b)).length;
      return bScore - aScore;
    });

  items.push(allFavoriteItems[0]);

  return getItemsForTamasHelper(
    tamas.filter(tama => !hasCommonItem(tama.favoriteItems, items)),
    items
  );
}

function hasCommonItem(arr1, arr2) {
  return arr1.some(item => _.includes(arr2, item));
}
