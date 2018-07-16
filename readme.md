# React ssr template

1. npm install

### development 
When in development mode, 2 servers need to be start.One for the client side pages by `npm run dev`,another for server side api by `npm run server`.
Then you need a third server to distribute the request.The config can be below.

```bash
 server {
    listen    6800;
    proxy_set_header   X-NginX-Proxy    true;
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    location / {
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:6801;
        proxy_hide_header Access-Control-Allow-Origin;
    }
    location /api {
        proxy_pass_header X-Ndog-Token;
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:6802;
        proxy_hide_header Access-Control-Allow-Origin;
    }
}

```

1. `npm run dev` start a server on port `6801` to serve all the client requests include page hotload.

2. `npm run server` start a server on port `6802` to server all the requests to server include static files and all of the api.

3. `sudo nginx` start the nginx to distribute the requests.So you can visit the webpage at `127.0.0.1:6800`.