const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('span');
    
    li.setAttribute('data-id', doc.id);

    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('resturants').doc(id).delete();
        alert('are you sure you want to delete this item?');
    })
}
//getting data and rendering to screen
db.collection('resturants').get().then((snapshots) =>{
    snapshots.docs.forEach(doc => {
        console.log(doc.data())
        renderCafe(doc)
    })
});

//saving data
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('resturants').add({
        city: form.city.value,
        name: form.name.value
    })
    form.city.value=''
    form.city.city =''
})