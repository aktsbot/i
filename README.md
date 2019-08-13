# i - client info 

I got tired of visiting https://whatismyipaddress.com/ and other sites that
bombard me with ads when I just want my **public ip**.

## Setup 

```
$ git clone https://github.com/aktsbot/i
$ cd i
$ npm install
```

**Over at nginx's side**

[Reference](https://community.cloudflare.com/t/unable-to-get-visitors-ip-in-nginx/55038/2). 
Add this in the vhost file of our server definition.

```
# $remote_addr rewriting in case of NGINX behind CloudFlare.
# See also mod_cloudflare Apache module configuration.

set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 104.16.0.0/12;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 199.27.128.0/21;

real_ip_header CF-Connecting-IP;

...

location / {
  proxy_pass http://localhost:1337;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr; # <- imp
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # <- imp
  proxy_cache_bypass $http_upgrade;
}

```

## Run

```
$ PORT=1337 node server.js
```

**Live:** <https://i.aktsbot.in>

## Check

Browsers default to ipv6

```
$ curl -4 https://i.aktsbot.in # for ipv4
$ curl -6 https://i.aktsbot.in # for ipv6
```