
exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('items').del()
     .then(function () {
       return Promise.all([
         knex('items').insert({
           name: 'Test Packing Item Name',
           packed: false
         }, 'id')
         .then(() => console.log('Seeding complete!'))
         .catch( error => console.log(`Error seeding data: ${error}`))
       ])
   })
};
