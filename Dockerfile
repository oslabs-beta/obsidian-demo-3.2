FROM hayd/alpine-deno:1.9.0

EXPOSE 3000

WORKDIR /usr/app

COPY deps.tsxRun deno cache --unstabel deps.tsx

ADD . .
RUN deno cache --no-check --unstable new-server.tsx

USER deno

CMD [ "run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "new-server.tsx" ]