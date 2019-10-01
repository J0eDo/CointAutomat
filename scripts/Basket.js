'use strict'
//for optimization
let idEnterProducts = [];
//search object[element] by id */

let lotInBasket = [];

class productOfBasket{
    
    constructor(obj){
        this.index;
        this.parent_obj = obj;
        this.id = $(this.parent_obj).attr('id');
        //postfix "p" for paragraph in basket position
        this.idNumberOf = '#'+this.id + 'p';
        /************************* */
        this.src = $(this.parent_obj).find('img').attr('src');
        this.hasInBasket =  $.inArray(this.id, idEnterProducts);
    }
    
    initializatia(){
        if(this.hasInBasket<0){

            this.index = lotInBasket.length;
            idEnterProducts.push(this.id);
            lotInBasket.push(this);
            this.renderHTML();
        }else{        
            this.index = this.hasInBasket;
            this.plusNumberOfit();
        }      
    }

    plusNumberOfit(){   
        let numPlus = +($(this.idNumberOf).text()).split('X')[1] + 1;
       $(this.idNumberOf).text("X" + numPlus);
    }

    renderHTML(){
        let new_element  = `<div class = "basket_block">
                                <img width = "90vh" src=${this.src}>
                                <p id="${this.id + "p"}" class = "product_basket__count">X1</p>
                            </div>`;
        $('#basket').append(new_element);
    }
}

function clearBasket(){
    $('#basket').children().remove();
    forPayment = 0;
    idEnterProducts = [];
    lotInBasket = [];
}

function isVoid(){ 
    let isVoidBasket = $('#basket').children();
    if(!!isVoidBasket){
        automatTablo.setAnimatorMode('buy');
    }
    return isVoidBasket;
}

