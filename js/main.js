let firstName   = document.querySelector(".firstName");
let lastName    = document.querySelector(".lastName");
let username    = document.querySelector(".username");
let emailAddr   = document.querySelector(".email");
let phoneNum    = document.querySelector(".phone");
let password    = document.querySelector(".password");
let confirmPassword = document.querySelector(".confirmPassword");
let terms       = document.querySelector(".terms");
let submitBtn   = document.querySelector(".submitBtn");
let RegistrationForm = document.forms[0];
let dialog      = document.querySelectorAll(".dialog"); 
let info        = document.querySelectorAll(".info");

//  Show details when mouse over in info:
function displayDetails (event) {
    event.nextElementSibling.style.visibility = "visible";
    event.nextElementSibling.style.opacity = "1"
    event.nextElementSibling.style.transition = "all 0.8s ease"
}

//  hide details when mouse out from info:
function hideDetails (event) {
    event.nextElementSibling.style.visibility = "hidden";
    event.nextElementSibling.style.opacity = "1"
    event.nextElementSibling.style.transition = "all 0.8s ease"
}

//  modify dialog and info style:
function modifyDialogStyle () {
    dialog[2].style.top = "-13%";
    info[2].style.top = "20%";
}


//  Messages
class Messages {
    constructor (name) {
        this.message = name.parentElement.lastElementChild;
        this.name = name;
    }
    ErrorMessage (str) {
        this.message.innerHTML = str;
        this.message.style.visibility = 'visible';
        this.name.style.borderColor = 'tomato';
        this.name.focus();
    }
    SuccessMessage () {
        this.message.style.visibility = 'hidden';
        this.name.style.borderColor = 'green';
    }
}



//  firstName and lastName validation
function nameValidate (name, FirstOrLast) {
    let userName = new Messages (name);
    function validate () {
        let regName = /^[a-zA-Z]+$/;
        if (!regName.test(name.value.trim()) || name.value.trim().length < 3) {
            userName.ErrorMessage(`Your ${FirstOrLast}!`);
        } else {
            userName.SuccessMessage();
            return name.value.trim();
        }
    }
    name.addEventListener('change', validate)
    return validate;
}



//  username validation
function usernameValidate (userName) {
    //  checking string has minimum 1 Capital letter or not
    const isUpperCase = (str) => {
        let result = str.split('');
        let regExp = /[A-Z]/;
        result =  result.map(ch => regExp.test(ch));
        return result.includes(true)
    }
    function validate () {
        let usernameMessage = new Messages (userName);
        let regExp = /^[a-zA-Z0-9_\.]+$/;
        if (!isUpperCase(userName.value.trim())) {
            usernameMessage.ErrorMessage(`Enter a valid username!`);
            //  modify dialog style
            dialog[0].style.top = "-13%";
            info[0].style.top = "20%";
        } else if (!regExp.test(userName.value.trim()) || userName.value.trim().length < 3) {
            usernameMessage.ErrorMessage(`Enter a valid username!`);
            //  modify dialog style
            dialog[0].style.top = "-13%";
            info[0].style.top = "20%";
        } else {
            usernameMessage.SuccessMessage();
            return userName.value.trim();
        }
    }
    userName.addEventListener('change', validate);
    return validate;
}



//  Email Validate
function emailValidate (email) {
    function validate () {
        let regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let emailAddrMessage = new Messages (email);
        if (!regExp.test(email.value.trim())) {
            emailAddrMessage.ErrorMessage(`Enter a Valid Email Address!`);
        } else {
            emailAddrMessage.SuccessMessage()
            return email.value.trim();
        }
    }
    email.addEventListener('change', validate);
    return validate;
}



//  Phone Number Validation
function phoneNumValidate (phone) {
    function validate () {
        let regExp = /^\+?(88)?0(19|14|17|13|18|16|15)\d{8}$/;
        let phoneNumMessage = new Messages (phone);
        if (!regExp.test(phone.value)) {
            phoneNumMessage.ErrorMessage(`Enter a Valid Phone Number!`);
            dialog[1].style.top = "-13%";
            info[1].style.top = "20%";
        } else {
            phoneNumMessage.SuccessMessage();
            return phone.value;
        }
    }
    phone.addEventListener('change', validate);
    return validate;
}




//  password validation
function passwordValidate (password) {
    function validate () {
        let passwordMessage = new Messages (password);
        if (password.value.trim().length === 0) {
            passwordMessage.ErrorMessage('Enter Your Password');
            modifyDialogStyle();
        } else if (/^(?=.*\s)/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('Password must not contain any whitespaces!');
            modifyDialogStyle()
        } 
        else if (!/^(?=.*[A-Z]).*$/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('The Password must contain!');
            modifyDialogStyle()
        } 
        else if (!/^(?=.*[a-z])/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('The Password must contain at least one Lowercase character!');
            modifyDialogStyle();
        } 
        else if (!/^(?=.*[0-9])/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('The Password must contain at least one digit!');
            modifyDialogStyle();
        } 
        else if (!/^(?=.*[~`!@#$%^&*()--+={}[]|\:;"'<>,.?])/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('The Password must have at least one Special Symbol.');
            modifyDialogStyle();
        } 
        else if (!/^.{8,16}$/.test(password.value.trim())) {
            passwordMessage.ErrorMessage('The Password must be 8-16 characters long.');
            modifyDialogStyle();
        } else {
            passwordMessage.SuccessMessage();
            return password.value.trim();
        }
    }
    password.addEventListener('change', validate);
    return validate;
}




//  confirm password validation
function confirmPasswordValidate (confirmPass) {
    function validate () {
        const confirmPasswordMessage = new Messages (confirmPass);
        const oldPass = passwordNum();
        if (confirmPass.value.trim().length === 0) {
            confirmPasswordMessage.ErrorMessage('Re-type Your Password');
        } else if (oldPass !== confirmPass.value.trim()) {
            confirmPasswordMessage.ErrorMessage('The Password didn\'t match.');
        } else {
            confirmPasswordMessage.SuccessMessage();
            return confirmPass.value.trim();
        }
    }
    confirmPass.addEventListener('change', validate);
    return validate;
}




//  terms and condition validation
function termsCondtionValidate (term) {
    function validate () {
        if (term.checked == false) {
            terms.parentElement.style.color = 'tomato';
        } else {
            terms.parentElement.style.color = 'green';
            return term.value;
        }
    }
    return validate;
}



//  collect all the data after validation
let FName       = nameValidate(firstName, 'First Name');
let LName       = nameValidate(lastName, 'Last Name');
let UName       = usernameValidate(username);
let EAddr       = emailValidate(emailAddr);
let passwordNum = passwordValidate(password);
let confirmPass = confirmPasswordValidate(confirmPassword);
let termsCondition = termsCondtionValidate(terms);
let phoneNumber = phoneNumValidate(phoneNum);




//  After Submit The Registratiion Form
RegistrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('First Name: ' + FName())
    console.log('Last Name: ' + LName())
    console.log('username: ' + UName())
    console.log('Email Addres: ' + EAddr())
    console.log('Phone Number: ' + phoneNumber())
    console.log('Password: ' + passwordNum())
    console.log('Confirm Password: ' + confirmPass())
    console.log('Terms & Condition: ' + termsCondition())

    if (FName() && LName() && UName() && EAddr() && phoneNumber() && passwordNum() && confirmPass()) {
        swal({
            title: "Good job!",
            text: "Form Submitted Successfully",
            icon: "success",
            button: "Close",
        });
    } else {
        dialog[0].style.top = "-13%";
        info[0].style.top = "20%";
        dialog[1].style.top = "-13%";
        info[1].style.top = "20%";
        dialog[2].style.top = "-13%";
        info[2].style.top = "20%";
        swal({
            title: "Sorry!",
            text: "Please Try Again Carefully",
            icon: "error",
            button: "Close",
        });
    }
});