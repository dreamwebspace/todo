const list=document.querySelector('ul');
const form=document.querySelector('form');


const addRecipe = (recipe,id) => {
    console.log(recipe);
    //let time = recipe.created_at.toDate();
    let html = `
    <li data-id="${id}">
        <div>${recipe.title}</div>
        <button class="btn btn-danger btn-sm my-2">Delete</button>
        
    </li>
    `;
    list.innerHTML +=html;
}
const deleteRecipe = (id)=>{
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe=>{
        if(recipe.getAttribute('data-id')===id){
            recipe.remove();
        }
    })
}
//get documents
db.collection('recipes').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        const doc=change.doc;
        console.log(doc);
        if (change.type==='added'){
            addRecipe(doc.data(), doc.id);
        } else if (change.type==='removed') {
            deleteRecipe(doc.id);
        }
    }) 
});
// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
//    const now = new Date();
    const recipe = {
        title: form.recipe.value

    };

db.collection('recipes').add(recipe).then(()=> {
    console.log('recipe added');
}).catch(err=>{
        console.log(err);

})

});
//delete
list.addEventListener('click', e=>{
    if (e.target.tagName==='BUTTON'){
        const id=e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(()=>{
            console.log('rec deleted')
        })
    }
})