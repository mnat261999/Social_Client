export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export  const isPass = pass =>{
    const re =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
}
