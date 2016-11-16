### What's this about?
This directory contains code from redhat-ipaas/ipaas-client that directly invoked on the Forge and Kubernetes backends, and is stored here for informational purposes.

A rundown of the files/directories:
- `backend-env-webpack.txt` - A snippet of code from the webpack configuration used to configure the frontend and tell it what URLs to use for Forge and Kubernetes.
- `service/*` - The angular 2 services that views used to fetch data from Forge, Kubernetes and Git.
- `helpers/*` - Helper functions for working with the above services
- `modules/+testing` - The frontend code developed for showing forms driven by Forge and for ensuring that the Forge and Kubernetes services could fetch data.
- `oauth.service.ts` - Simple oauth service/flow to handle obtaining the openshift authorization token, this shouldn't be required for the frontend code.
