'use strict';
let products = [];
let client = [];
let automat = [];
/*middle cashbox instant is copy value valueCoint **/
let cashBox = [{},{},{},{}];
/*********************************/
let arrValueCoint = [10,5,2,1];
let basketProduct = [];


class fabricaCoint{
    constructor(){
        this.initCoint(".panel_client","button",client);
        this.initCoint(".panel_automat","span",automat);
        this.initCashboxCoint();      
    }

    initCoint(selector1,selector2,arr){
        let coints = $(selector1).find('p');
        for(let i=0;i<coints.length;i++){
            let btn = coints.eq(i).find(selector2);
            let newBtn = new Coint(btn,selector1)
            arr.push(newBtn);
        }

        return arr;
    }

    initCashboxCoint(){
       for(let index =0; index<cashBox.length; index++){
           cashBox[index].value = arrValueCoint[index];
           cashBox[index].numberOfCoint = 0;
       }    
    }
}


class Coint{

    constructor(anchor,arr){

        this.arr = arr;
        this.anchor_HTML = anchor;
        this.many_obj = this.getMany_obj();
        this.numberOfCoint = Number(this.getNumberOfCoint());
        this.value = this.getValue();      
        this.click();
    }

    getMany_obj(){
        let parent = this.anchor_HTML.parent();
        let many = $(parent).find('.many');
        if(!$(many).hasClass('many')){
            many = $(parent).find('span');
        }
        return many;
    }
    getNumberOfCoint(){
        let num = $(this.many_obj).text();
        return Number(num);
    }
    getValue(){
        let value = $(this.anchor_HTML).val();
        if(value==""){
           return value = $(this.anchor_HTML).parent().text().split(' ')[0];
        };
        return Number(value);
    }

    click(){
        if(this.arr=='.panel_client'){
            $(this.anchor_HTML).click(()=> { 
                if((this.many_obj).text()!=0){
                    let transformed_element = cashBox.find(coint=>coint.value==this.value);
                    transformed_element.numberOfCoint+=1;
                    this.numberOfCoint-=1;
                    $(this.many_obj).text(this.numberOfCoint);                 
                    sumAllpurse();
                } 
            })
        }
    }
    newObjBasket(img){
        return '<img src="'+ img +'" width="150px" height="150px"'
    }
}

class Lot{

    constructor(obj){
        
        this.parent_obj = obj;
        this.price = $(this.parent_obj).find('.price').text();
        this.name = $(obj).find('p').eq(0).text().split('(')[0];
        this.buyBtn = $(this.parent_obj).find('button');
        this.number = $(this.parent_obj).find('.many-product');
        this.inBascet();
    }

    inBascet(){      
         $(this.buyBtn).click( ()=> {       
            if(+this.number.text()){
                let new_element = new productOfBasket(this.parent_obj);
                new_element.initializatia();
                this.number.text(this.number.text()-1); 
                forPayment+=+this.price;
                basketProduct.push(new_element);
                isVoid();
              
            }
        });
    }
}

class BuyBtn{

    constructor(){

        this.id = '#buyBtn';
        this.click();
    }

    click(){
        /*save context*/
        let _this = this;
        $(this.id).click(function(){
            automatTablo.setAnimatorMode('message');
            if(introducteMany()>=forPayment)
            {
                let payment = _this.doBuy(forPayment);
                sumAllpurse(); 
                if(payment!=0){
                    _this.getDelivery(payment)
                    sumAllpurse();
                }  
            }     
        })
    }
        getDelivery(payment){
            payment = +payment;
            for(let index = 0; index<automat.length;index++){
                let  cashbox = cashBox.find(coint=>coint.value == automat[index].value);
                if(cashbox.value + payment <= 0){        
                while(automat[index].numberOfCoint > 0 && (cashBox[index].value+payment)<=0){        
                    automat[index].numberOfCoint-=1;
                    payment=payment + +automat[index].value;
                    cashbox.numberOfCoint+=1;  
                    }  
                }
            }   
    }
    doBuy(payment){
        cashBox.forEach(elementCB => {
            let  automatCB = automat.find(coint=>coint.value == elementCB.value)
            while(elementCB.numberOfCoint>0 && payment>0){
                automatCB.numberOfCoint+=1;
                elementCB.numberOfCoint-=1;
                payment-=elementCB.value;
            }
        });
        clearBasket();
        flagSuccesBuy = true;
        automatTablo.setAnimatorMode('message');

        return payment;
    }
}

function sumCoint(arr, id) {
    let sum = 0;
    arr.forEach(element => {
        sum+= Number(element.value*element.numberOfCoint);
        if(arr!==cashBox){
        element.many_obj.text(element.numberOfCoint);}
        $(id).text(sum);
    });

    return Number(sum);
}
function refunded(){
    $('#delivery').click(function(){
        cashBox.forEach(element => {
        if(element.numberOfCoint!=0){
            let transformed_element = client.find(coint=>coint.value==element.value);
            transformed_element.numberOfCoint+= element.numberOfCoint;
            element.numberOfCoint = 0;
            sumAllpurse();
        }
       });
    });
}
function sumAllpurse(){
    let _client =     sumCoint(client, '#client');
    let _automat =    sumCoint(automat,'#automat');
    let cashBoxSum = sumCoint(cashBox, '#cassa');
    return [_client, _automat, cashBoxSum];
}
function fabricaProducts(){
    let arrLot = $('.lot');
    for( let index =0; index < arrLot.length; index++){
        products.push(new Lot(arrLot.eq(index))); 
    }
    
}
$(function(){
    new productOfBasket()
    new fabricaCoint();  
    new BuyBtn();
    fabricaProducts();
    sumAllpurse();
});