
const authHeaderConfig = (user, headerConfig) => {
    const authType = localStorage.getItem('authType')
    
    if (user.JWTtoken && authType==="JWT") {
        return {
            'Authorization': `Bearer ${user.JWTtoken}`,
            ...headerConfig
        }
    } 
    else if (authType==="session") {
        return headerConfig
    } else {
        console.log('unknown handler');
    }
}

module.exports = authHeaderConfig
