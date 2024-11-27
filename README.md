## AWS Amplify GenAI Sticker Printing Template

This repository provides a starter template for creating a web application that can be deployed and customised to provide a fun, interactive experience in generating art using Amazon Bedrock and then printing directly onto a sticker. The template is designed to work with a Canon Selphy printer and KC-18IL labels but can be modified to support additional printers that support direct printing over Wi-Fi.

This repository was built off the AWS Amplifty Gen 2 React+Vite template and quick start available [here](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws). You should check this out if you're intersted in jump starting your development with [AWS Amplify](https://docs.amplify.aws/).

The backend is an AWS Lambda that calls the [Amazon Bedrock](https://aws.amazon.com/bedrock/) service and was modified from the AWS Amplify sample for connecting to Amazon Bedrock available [here](https://docs.amplify.aws/react/build-a-backend/data/custom-business-logic/connect-bedrock/). Consider this quick start if you are looking to connect AWS Amplify to Amazon Bedrock.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, and is possible to use directly with a Canon Selpgy printer and the KC-18IL labels. The web application is secured with Amazon Cognito. You can access the web application from your phone or tablet, generate an image using a prompt, and then print directly to a sticker using the Canon Selphy app on [Andoird](https://play.google.com/store/apps/details?id=jp.co.canon.bsd.ad.pixmaprint&hl=en_AU&pli=1) or [iOS](https://apps.apple.com/us/app/canon-print/id664425773). When connected to the same Wi-Fi network this allows direct printing of a sticker. You should check your Canon manual for configuring and connecting the printer to your Wi-Fi network.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.

## Getting started

This template was built from the AWS Amplify React+Vite template and quickstart available [here](https://docs.amplify.aws/react/start/quickstart/). You can follow that example for your own applications, or for getting started with customising this app by deploying a development sandbox, customing authentication and changing the frontend and backend of your application. We will only cover a basic deployment of the application and setting up authentication for this specific sample.

### Amazon Bedrock

If you haven't used Amazon Bedrock previously you will first need to enable model access for the Stable Diffusion Stable Image Core 1.0 model. Note that this model is only available in the us-west-2 region, but the AWS Amplify application can run in any supported region globally.

The Stable Image Core 1.0 model is a deep learning, text-to-image model used to generate detailed images conditioned on text descriptions, inpainting, outpainting, and generating image-to-image translations. To get started, ensure you have the required IAM permissions to enable models within Amazon Bedrock and then request model access in the us-west-2 region [here](https://us-west-2.console.aws.amazon.com/bedrock/home?region=us-west-2#/modelaccess). Click the Stable Image Core 1.0 model, review the End User License Agreement (EULA) from the link and then click Next and Submit after reviewing and terms of model access.

### AWS Amplify

1. Create a new repository from this template by clicking "Use this template" and then "Create a new repository"
2. Now that you have a new repository in Github, click [here](https://console.aws.amazon.com/amplify/create/repo-branch) to deploy it with Amplify. Make sure to change to your preferred deployment region as this is where the application will be deployed and hosted.
3. Select GitHub. After you give Amplify access to your GitHub account via the popup window, pick the repository and main branch to deploy. Make no other changes and click through the flow to Save and deploy.
4. This will kick off the build, deployment and hosting of your application. This will take about 5 minutes. While waiting we suggest you check out the AWS Amplify quickstart guide [here](https://docs.amplify.aws/react/start/quickstart/)) for a better overview.
5. After the deployment has finished, you will need to manually create a new user in Amazon Cognito, as the authenitcation module has been used and enabled by default in this template. Go to Cognito [User pools](https://console.aws.amazon.com/cognito/v2/idp/user-pools) in the console and then find the user pool created by the deployment, which should start with amplifyAuthUserPool....
6. Scroll down to *Users* and then click *Create user* and enter your email address and choose to generate a temporary password. You will receive an email with that temporary password which will be used to login to the application.
7. Go back to the AWS Amplify console, and then open the newly deployed application. Click *Visit deployed URL* which should open a new authenitcation window, and enter you email address and temporary password. You should then be able to set a permanent password, as well as configure MFA to secure your application.
8. After configuring authentication, you should be presented with a prompt to get started with generating stickers.

## Generating stickers

To get started, open the deployed app URL (which should end in *amplifyapp.com*) on your phone or tablet. Maker sure you have the Canon Print app installed for your device and you are connected on the same network. 

To generate a sticker image, simply enter a prompt in the application and hit enter or click the *Generate* button. After about 5 seconds, the image should be returned. If you're not sure where to start, here are some guiding prompts
1. Astronaut standing on top of a mountain at night
2. Cartoon cat balancing on a ball
3. Monkey riding a unicorn in a forest cartoon style

Once the image is returned, you should be able to long press the image, choose *Print* and then select the Canon Selphy printer if you're on the same Wi-Fi network. The image is scaled with a black border to support direct printer at the correct size.

## Cost

The app build and hosting should fit within the free tier for Amplify. If you are outside of the free tier then we can included estimated for Amplify for 100 image generations a month and 10 build minutes at aprpoximately $0.23 per month.

Each image geneated using Stable Diffusion Image Core cost $0.04, so should be $4 for 100 images generated in a month.

The Lambda costs should be under a $1 for the month.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.