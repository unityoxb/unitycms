import { atom } from 'recoil'

// 本地存储
const storage = window.localStorage;
const username = storage.scifanchain_username

export const usernameState = atom({
    key: 'username', 
    default: username,
});