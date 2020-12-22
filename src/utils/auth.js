import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserId = 'user-id'
const GuestToken = 'shopping_cart_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(id) {
  return Cookies.set(UserId, id)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function removeGuestToken() {
  return Cookies.remove(GuestToken)
}
