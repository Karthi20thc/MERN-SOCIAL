export const LoginStart = (userCredentials) => (
 {
  type: 'LOGIN_START'
 }
)
export const LoginSucess = (user) => (
 {
  type: "LOGIN_SUCCESS",
  payload: user,
 }
)
export const LoginFailure = (error) => (
 {
  type: 'LOGIN_START',
  payload: error
 }
)


// when we dispatch FOLLOW , we are going to take userId and pass throught the reducer.
export const Follow = (userId) => (
 {
  type: "FOLLOW",
  payload: userId
 }
)
export const UnFollow = (userId) => (
 {
  type: "UNFOLLOW",
  payload: userId
 }
)