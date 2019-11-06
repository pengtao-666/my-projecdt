/* eslint-disable camelcase */
import api from '../axios'

export const apiLogin = params => api.fetchPost('/login', params)
