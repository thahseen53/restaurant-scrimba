import { menuArray } from '/data.js'
const orderContainer= document.getElementById('order-container')
const orderBtn= document.getElementById('order-btn')
const modal= document.getElementById('modal')
const submitBtn = document.getElementById('submit-btn')
const input =document.getElementById('name')
const thanksContainer =document.getElementById('thanks-container')
const orders = []
let total = 0

document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        handleAddButton(e.target.dataset.add)
        orderContainer.style.display='block'
    }
    else if(e.target.dataset.remove){
        handleRemoveButton(e.target.dataset.remove,e.target.dataset.index)
    }
    render()
})

orderBtn.addEventListener('click',function(){
    modal.style.display='block'
})

submitBtn.addEventListener('click',function(e){
    e.preventDefault()
    orderContainer.style.display='none'
    modal.style.display='none'
    thanksContainer.style.display='block'
    
})
function handleAddButton(itemId){
    const itemToAdd =  menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    orders.push(itemToAdd)
    total += itemToAdd.price
    // console.log(total)
}
function handleRemoveButton(itemId,index){
        const itemToRemove =  orders.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    orders.splice(index,1)
    total -= itemToRemove.price
    if(total === 0){
        orderContainer.style.display='none'
    }
    render()
}
function orderDiv(){
    let orderSec =``
        orders.forEach(function(order,index){
            
            orderSec +=`
            <div class="order-list">
            <h3>${order.name}</h3>
            <button class="remove-btn" data-remove="${order.id}" data-index="${index}">remove</button>
             <span class="item-price">$${order.price}</span>
              </div>      `
        })
         return orderSec
   
}
function feedHtml(){
    let feedHtml = ``
    menuArray.forEach(function(menu){
        feedHtml+=`
            <div class="menu-item" >
                <div class="menu-item-details">
                   <div class="icon"> ${menu.emoji}</div>
                    <div class="details">
                    <h2>${menu.name}</h2>
                    <p>${menu.ingredients}</p>
                    <span class="price">$ ${menu.price}</span>
                </div>
                </div >

                <button class="add-btn" data-add="${menu.id}">+</button>
            </div>
      
        `
    })
    return feedHtml
}
function thanks(){
        let thanksHtml = ''
    
     thanksHtml = `
            <div class="thanks" id="thanks">
                <h5> Thanks, ${input.value}! Your order is on its way!</h5>
            </div>
     `
     return thanksHtml
}
function render(){
    document.getElementById('menu').innerHTML=feedHtml()
    document.getElementById('orders').innerHTML=orderDiv()
    document.getElementById('total').textContent=`$${total}`
     thanksContainer.innerHTML=thanks()
}
render()