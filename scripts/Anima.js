'use strict'
let flagSuccesBuy = false;
let automatTablo;
let forPayment = 0;
let introducteMany = function(){return sumAllpurse()[2]};

let boxMessage = {
    watchout:function(){
        return [`победим жажду`,`вместе`,`HUNGER-shop`]} ,
    buy:function(){
        return[`к оплате: ${forPayment}`,`внесено : ${sumAllpurse()[2]}`]},
    message:function(){
        let precalculate = forPayment-sumAllpurse()[2];
        if(precalculate>0){                                                                 //*слабое место?/
            return [`Внесите еще ${precalculate}`];
        }else{
            if(flagSuccesBuy === false){
            return [`Подтвердите покупку`]
            }else{
                return ['Продано']
            }
        }                                                                                     /**          */
    }
}
class AutomatTablo{

    constructor(){

        this.tablo = $('#automatTablo');
        this.mode = 'watchout';
        this.textIndex = 0;
        this.animator = {
            countAnimate: 0,
            maxCountAnimate: 6,
            timeInterval:800,
            delegateInterval:this.watchoutMode,
            watchoutMode : ()=>{
                this.blincTablo(boxMessage.watchout(), "blue"); 
            },
            buyMode : ()=>{
                this.blincTablo(boxMessage.buy(), "blue"); 
            },
            soloMessageMode : ()=>{
                if(boxMessage.message() == 'Продано'){                        /**слабое место?*/
                    setTimeout(()=>{
                        this.setAnimatorMode('watchout');
                        flagSuccesBuy = false;
                    },800)
                }                                                                 /**             */
                this.blincTablo(boxMessage.message(), "red",true);
            } 
        }
        this.setAnimatorMode();
    }

    setAnimatorMode(str){
        clearInterval(this.animator.delegateInterval);
        let mode = this.getModeOfString(str);
        this.animator.delegateInterval = setInterval(()=>{mode.apply(arguments)},this.animator.timeInterval); 

    }

    getModeOfString(){                                                              /**где enum в js неужели так уродливо заменять? */

        switch (arguments[0]){
            case "buy" :          
                return this.animator.buyMode;break;
            case "message" :
                return this.animator.soloMessageMode;break;
            default:
                return this.animator.watchoutMode;break;
        }
    }

    setTextandColor(str,color){

        $(this.tablo).text(str);
        if(color!==undefined){
            $(this.tablo).css({'color':color});
        }
    }

    blincTablo(arr,color,flag){
       
        var visibleText = $('#automatTablo').css('display');
        if(visibleText === 'none'||flag){
            $('#automatTablo').css({'display':'inline-block'})
            this.setTextandColor(arr[this.textIndex],color)
            this.textIndex++;
            if(this.textIndex>=arr.length)this.textIndex=0;    
        }else{
            $('#automatTablo').css({'display':'none'});
        }  
      
    }
}
$(function(){
   
    automatTablo = new AutomatTablo(); 
});