// onload , render items/get items from the database
$(window).on('load', () => getItems());

const getItems = () => {
  console.log('getItems was called')
}

// on submit, post item to the database

const addItem = (event) => {
  event.preventDefault();

  const name = $('.saveItemForm .nameInput').val();
  const packed = false;
  const newItem = { name, packed };
  postData(newItem);
}
// return the items in the post response for rendering

const postData = (body) => {
  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify(body), 
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

// on selection of a item delete, delete item from database
// on selection of an item as packed, update database


