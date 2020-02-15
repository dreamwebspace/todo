const list=document.querySelector('ul');

const addRecipe = (recipe) => {
    console.log(recipe.created_at);
    let html = `
    <li>
        <div>${recipe.title}</div>
        
    </li>
    `;
    list.innerHTML +=html;
}

db.collection('recipes').get().then((snapshot) => {
    //when we have data
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        addRecipe(doc.data());
    });
}).catch(err=>{
    console.log(err);
})