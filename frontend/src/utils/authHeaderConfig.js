
const authHeaderConfig = (user, headerConfig) => {
    console.log(user)
    if (user.JWTtoken) {
        return {
            'Authorization': `Bearer ${user.JWTtoken}`,
            ...headerConfig
        }
    } else {
        return headerConfig
    }
}

module.exports = authHeaderConfig
