from node:22-alpine as build
workdir /app 

copy package.json .
copy package-lock.json .

run npm ci

copy . . 

run npm run build

from nginx:alpine
copy --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

expose 80
