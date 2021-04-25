# TTKT client

## Prepare env file before start

### `cp .env.example .env`
<br />

## *Recommended package manager: <b>Yarn</b>
### `npm install -g yarn`
<br />

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Noted: for production build
* Copy whole project ttkt-fe folder and server.js file into web server root
* > cd /your_folder_structure/ttkt-fe<br />
npm run build<br />
npm install<br />
npm install pm2 -g<br />
pm2 start server.js
* Config your Nginx/Apache server to Reverse proxy to PM2
### Nginx
<pre>
server {
    listen 80;
    server_name your_domain.com;
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
</pre>
### Apache
* Install and enable proxy modules
> sudo en2mod proxy<br />
sudo a2enmod proxy_http
* Add a VirtualHost which point to PM2 port 5000
<pre>
&lt;VirtualHost *:80&gt;
    ProxyPreserveHost On

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
&lt;/VirtualHost&gt;
</pre>
