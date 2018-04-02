// onload , render items/get items from the database
$(window).on('load', () => getItems());

const getItems = () => {
  console.log('getItems was called')
}

// on submit, post item to the database

const addItem = (event) => {
  event.preventDefault();

  const name = $('.saveItemForm .nameInput').val();

  postData()
  console.log(name)
}
// return the items in the post response for rendering

const postData = () => {
  console.log('postData was called')
}

// on selection of a item delete, delete item from database
// on selection of an item as packed, update database


