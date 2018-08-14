const serverPort = process.env.NODE_ENV == 'production' ? 6702 : 6802;
export const API_TIMEOUT = 30000
export const SERVERURL = typeof window === 'undefined' ? `http://127.0.0.1:${serverPort}/api` : '/api'
