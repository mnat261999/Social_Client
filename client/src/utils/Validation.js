const Validation =({firstName, lastName, email,phone, password, cf_password}) =>{
    const err = {}

    if(!firstName) {
        err.firstName = "Please add your first name."
    }

    if(!lastName) {
        err.lastName = "Please add your last name."
    }else if(lastName.replace(/ /g, '').length > 25){
        err.lastName = "Last name is up to 25 characters long."
    }

    if(!email) {
        err.email = "Please add your email."
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect."
    }

    if(!phone) {
        err.phone = "Please add your phone."
    }else if(!isPhone(phone)){
        err.phone = "Phone format is incorrect."
    }

    if(!password) {
        err.password = "Please add your password."
    }else if(!isPass(password)){
        err.password = "Password must be at least 8 characters, one letter and one number."
    }

    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isPass(pass) {
    const re =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}

function isPhone(phone) {
    const re =/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return re.test(phone);
}
  
export default Validation