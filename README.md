# API
The API for Red Hat iPaaS - a flexible, customizable, cloud-hosted platform that provides core integration capabilities as a service. It leverages Red Hat's existing product architecture using OpenShift Online/Dedicated and Fuse Integration Services.

For the client, [see here](https://github.com/redhat-ipaas/ipaas-client).

## Installing
Just run `npm install` or `npm i`.

## Running
Run `npm start` and the API will be available on 127.0.0.1:9090.

## Overview
Endpoints are located in `/router.js`. This API supports basic authentication with Everyauth and Bcrypt. It provides a service layer, repository layer, and model layer so that you can use multiple repositories and data stores like MySQL, and external services like Twitter. Models are wired up with whatever repository is configured via the `/src/api` directory.
