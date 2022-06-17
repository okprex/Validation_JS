"use strict";

class FormValidator{
    constructor(formElement){
        this.formElement = formElement;
        this.inputList = this.formElement.querySelectorAll('[data-val]');
        this.error = false;
    }

    validate(){
        for(let elem of this.inputList){

            //helper function to dont repeat myself
            function valid(){
                elem.classList.add('valid');
            };
        
            function invalid(){
                elem.classList.add('invalid');
                FormValidator.error = true;
            };


            elem.classList.remove('invalid');
            elem.classList.remove('valid');
            let error = false;

            if(elem.dataset.val != ''){
                let k_v = elem.dataset.val.split('-');

                switch(k_v[0]){
                    case 'min': if( !this.min(elem,k_v[1]) ){
                        invalid();
                    }else {
                        valid();
                    }break;
                    case 'max': if( !this.max(elem,k_v[1]) ){
                        invalid();
                    }else {
                        valid();
                    }break;
                    case 'email': if( !this.email(elem.value) ){
                        invalid();
                    }else{
                        valid();
                    };break;
                    case 'radio': (!this.radio(elem))? invalid() : valid();
                    break; 
                    case 'checkMin': (!this.checkMin(elem,k_v[1]))? invalid() : valid();
                    break; 
                    case 'date': (!this.date(elem))? invalid() : valid();
                    break;
                }


            }
        }

        if(this.error){
            this.formElement.querySelector('.form_error').style.display = 'block';
        }else {
            this.formElement.querySelector('.form_error').style.display = 'none';
            console.log('Form is Valid!');
        }

    }




    min(element,int){
        return (element.value.length >= int)? true:false;
    }


    max(element,int){
        return (element.value.length < int)? true:false;
    }

    email(emailSring){
        return (emailSring.match(/^[^\s@]+@[a-z\-\.]+\.[a-z]{2,}$/i))? true:false;
    }

    radio(radioDiv){
        let radios = radioDiv.querySelectorAll('input[type="radio"]');
        let valid = false;

        for(let rad of radios){
            if(rad.checked){valid = true;};
        }

        return valid;
    }

    checkMin(element, int){
        let checkboxes = element.querySelectorAll('input[type="checkbox"]');
        let checkedCounter = 0;
        for(let cBox of checkboxes){
            (cBox.checked)?checkedCounter++:'';
        }

        return (checkedCounter < int)? false:true;
    }

    // this date-validation function only checks if the values are numbers or not!
    date(element){
        let selects = element.querySelectorAll('select');
        let valid = true;
        for(let select of selects){
            ( isNaN(select.value) )? valid=false:'';
        }

        return valid;
    }

}