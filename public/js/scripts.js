// onload , render items/get items from the database
$(window).on('load', () => getItems());

const getItems = async () => {
  const data = await getData('/api/v1/items')
  console.log(data)
  console.log('getItems was called')
}


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

const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

// on selection of a item delete, delete item from database
// on selection of an item as packed, update database


