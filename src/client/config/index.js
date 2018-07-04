const nginxPort = 6800
export const API_TIMEOUT = 10000
export const SERVERURL = typeof window === 'undefined' ? `http://127.0.0.1:${nginxPort}/api` : '/api'
