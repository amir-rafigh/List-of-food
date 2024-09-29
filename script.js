const additems_action = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

//display item
const displayitems_action = document.querySelector('.displayItems-action');
const list = document.querySelector('.grocery-list');
const clear = document.querySelector('.displayItems-clear');




//Add event Listener
//submit listener
submit.addEventListener('click' , additem );
document.addEventListener("DOMContentLoaded" , transfer_local_list)
list.addEventListener('click' , remove_single_item);
clear.addEventListener('click' , clearitems);

function additem(event){
    event.preventDefault();
    let value = input.value
    if(value===""){
        showAction(additems_action , `چیزی نوشته نشده است` , false);
    }
    else{
        showAction(additems_action , `${value} به لیست مواد غذایی اضافه شد` , true);
        createlement(value);
        updateStorage(value);
    }



}

function showAction(element , text , value){
    if(value === false){
        element.classList.add('alert')
        element.innerText = text;        
        setTimeout(() => {
            element.classList.remove('alert')
        }, 3000);
    }
    else{
        element.classList.add('success');
        element.innerText = text;
        input.value = "";
        setTimeout(() => {
            element.classList.remove('success')
        }, 3000);

    }



}


function createlement(value){
    let item = document.createElement('div');
    item.classList.add('grocery-item');
    item.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
                    <a href="#" class="grocery-item__link" >
                        <i class="far fa-trash-alt"></i>
                    </a>`

    list.appendChild(item);



}

function updateStorage(value){
    let storageitems;
    storageitems = localStorage.getItem('nutritionlist')?JSON.parse(localStorage.getItem('nutritionlist')):[];
    storageitems.push(value);
    localStorage.setItem('nutritionlist' , JSON.stringify(storageitems));

}

function transfer_local_list(){
  let items;
  items = JSON.parse(localStorage.getItem('nutritionlist'));
  for(x of items){
    createlement(x)
  }
}


function remove_single_item(event){
    event.preventDefault();

    let remove = event.target.parentElement.parentElement;
    let text = event.target.parentElement.previousElementSibling.innerHTML;
    
    list.removeChild(remove);
    showAction(displayitems_action , `${text} حذف شد` ,false);
    editStorage(text);



}
function editStorage(text){
    let valuestorage = JSON.parse(localStorage.getItem('nutritionlist'));
    let index = valuestorage.indexOf(text);
    valuestorage.splice(index , 1);
    localStorage.removeItem('nutritionlist');
    localStorage.setItem('nutritionlist' ,JSON.stringify(valuestorage))

}


function clearitems(){
    localStorage.clear('nutritionlist');
    

    let items = document.querySelectorAll('.grocery-item');
    if(items.length>0){
        items.forEach(element => {
            list.removeChild(element);
        });
        showAction(displayitems_action , "همه اقلام حذف شدند" , false)       
    }
    else{
        showAction(displayitems_action , "اقلامی برای حذف شدن وجود ندارد " , false)       
    }





}