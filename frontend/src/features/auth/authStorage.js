const TOKEN_KEY = "accessToken"
const USER_KEY ='authUser'
export const saveAuthData = ({token , user}) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getStoredAuth =()=>{
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    let user;
    try{
        user = storedUser ? JSON.parse(storedUser) : null;
    }
    catch {
    user = null;
  }
  return{
    token, user
  }
}

export const clearAuth = () =>{
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY)
}