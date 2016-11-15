# API

[![CircleCI](https://circleci.com/gh/redhat-ipaas/ipaas-api.svg?style=svg)](https://circleci.com/gh/redhat-ipaas/ipaas-api)

The API for Red Hat iPaaS - a flexible, customizable, cloud-hosted platform that provides core integration capabilities as a service. It leverages Red Hat's existing product architecture using OpenShift Online/Dedicated and Fuse Integration Services.

For the client, [see here](https://github.com/redhat-ipaas/ipaas-client).

## Installing
Just run `npm install` or `npm i`.

## Running
Run `npm start` and the API will be available on [http://127.0.0.1:9090](http://127.0.0.1:9090) or [http://localhost:9090](http://localhost:9090).

## Overview
Endpoints are located in `/router.js`. This API supports basic authentication with Everyauth and Bcrypt. It provides a service layer, repository layer, and model layer so that you can use multiple repositories and data stores like MySQL, and external services like Twitter. Models are wired up with whatever repository is configured via the `/src/api` directory.

For a more detailed overview of the Red Hat iPaaS API, please see our [Technical Overview]('./docs/overview.md').
