
let isLoggedIn = false
let userId

document.getElementById('register').addEventListener('click', event => {
  //empty out error message
  document.getElementById('errorMessage').innerHTML=''
  document.getElementById('message').innerHTML=''
  event.preventDefault()
  if( document.getElementById('username').value ==='' || document.getElementById('password').value ===''){
    document.getElementById('errorMessage').textContent = 'Invalid Inputs'
  }else{
    axios.post('/api/villagers/register', {username: document.getElementById('username').value, password: document.getElementById('password').value})
    .then( () =>{
      document.getElementById('message').textContent= "Account has been registered"
      document.getElementById('username').value = ''
      document.getElementById('password').value = ''
    })
    .catch(error => console.error(error))
  }
})

document.getElementById('signIn').addEventListener('click', event => {
  //empty out error message
  document.getElementById('errorMessage').innerHTML = ''
  document.getElementById('message').innerHTML = ''
  event.preventDefault()
  if (document.getElementById('username').value === '' || document.getElementById('password').value === ''){
  document.getElementById('errorMessage').textContent = 'Invalid Inputs'
}else {
  axios.post('/api/villagers/login', { username: document.getElementById('username').value, password: document.getElementById('password').value })
    .then( ({data: villager}) => {
      isLoggedIn = villager.isLoggedIn
      userId = villager.id
      if(isLoggedIn === true){
        document.getElementById('loginPage').style.display = 'none'
        document.getElementById('foodMarket').style.display ='block'
        }
        else{
          document.getElementById('errorMessage').textContent = "Invalid Username or Password"
          document.getElementById('password').value =''
        }
      })
      .catch(error => console.error(error))
    }
})