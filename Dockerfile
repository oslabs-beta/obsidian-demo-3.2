FROM hayd/alpine-deno:1.9.0

EXPOSE 3000

WORKDIR /usr/app

COPY . .

CMD [ "run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "new-server.tsx" ]