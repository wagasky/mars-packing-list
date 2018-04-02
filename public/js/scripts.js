$(window).on('load', () => getItems());

const getItems = async () => {
  const data = await getData('/api/v1/items')
  const itemsToDisplay = appendItems(data)

  $('.items-display').empty();
  $('.items-display').prepend(`${itemsToDisplay}`)
}

const appendItems = (data) => {
  const items = data;
  return items.map( item => {
  let { name, packed, id } = item;
  const checked = !item.packed ? 'checked' : '' 
  return(`
    <article class="item">
      <h3>${name}</h3>
      <span>
        <input id="checkBox" type="checkbox" ${checked}><h4>Packed</h4>
      </span>
      <button 
        name=${id}
        onclick=deleteItem(event)>Delete</button>
    </article>

    `)
  }).join('')
}


const addItem = (event) => {
  event.preventDefault();

  const name = $('.saveItemForm .nameInput').val();
  const packed = false;
  const newItem = { name, packed };
  postData(newItem);
}

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

const deleteItem = async (event) => {
  console.log('delete selected', event.target.name)
  const itemId = event.target.name
  await fetch(`/api/v1/items/${itemId}`, {
    method: 'DELETE'
  })
}
// on selection of a item delete, delete item from database
// on selection of an item as packed, update database


