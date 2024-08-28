// AUTH
export { default as register } from './auth/register.js'
export { default as login } from './auth/login.js'
export { default as logout } from './auth/logout.js'
export { default as verifyEmail } from './auth/verify-email.js'
export { default as refreshToken } from './auth/refresh-token.js'
export { default as forgotPassword } from './auth/forgot-password.js'
export { default as sendVerificationCode } from './auth/send-verification-code.js'
export { default as checkEmailRegistered } from './check-email-registerd.js'

// EDIT
export { default as changePassword } from './edit/change-password.js'
export { default as editUser } from './edit/edit-user.js'

// OTHER
export { default as getUser } from './get-user.js'
export { default as getUsersByIds } from './get-user-by-ids.js'
export { default as deleteUser } from './delete-user.js'

//Friends
export { default as follow } from './friends/follow.js'
export { default as unFollow } from './friends/unfollow.js'
export { default as getFollowers } from './friends/get-follower-list.js'
export { default as getFollowings } from './friends/get-following-list.js'


