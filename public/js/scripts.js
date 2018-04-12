$(window).on('load', () => getItems());

const getItems = async () => {
  const data = await getData('/api/v1/items')
  const itemsToDisplay = await appendItems(data)

  $('.items-display').empty();
  $('.items-display').prepend(`${itemsToDisplay}`)
}

const appendItems = (data) => {
  const items = data;
  return items.map( item => {
    const { name, id } = item;
    const checkedVar = item.packed === 'true' ? 'checked' : '';
    return(`
      <article class="item">
        <h3>${name}</h3>
        <div class="packed-styling">
          <input 
            onclick=togglePacked(event) 
            id="${id}" 
            name="${name}"
            ${checkedVar}
            type="checkbox"
            >
          <h4>Packed</h4>
        </div>
        <button 
          name=${id}
          onclick=deleteItem(event)>Delete</button>
      </article>

      `)
    }).join('')
}


const addItem = async (event) => {
  event.preventDefault();

  const name = $('.saveItemForm .nameInput').val();
  const packed = false;
  const newItem = { name, packed };

  await postData(newItem);
  await getItems();
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

const togglePacked = async (event) => {
  const { id, name } = event.target;
  console.log(event.target.checked)
  const packed = event.target.checked;
  const updatedItem = { name, packed };

  console.log(updatedItem)
  // debugger
  await patchData(id, updatedItem);
}

const patchData = async (id, body) => {
  await fetch(`/api/v1/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

