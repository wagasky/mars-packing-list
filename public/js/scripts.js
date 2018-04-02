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
        <input 
          onclick=togglePacked(event) 
          id="${id}" 
          name="${name}"
          type="checkbox"${checked}><h4>Packed</h4>
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
  getItems();
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
  const itemId = event.target.name
  await fetch(`/api/v1/items/${itemId}`, {
    method: 'DELETE'
  })

  getItems()
}
// on selection of an item as packed, update database

const togglePacked = (event) => {
  const { id, name } = event.target;
  const packed = event.target.checked;
}

