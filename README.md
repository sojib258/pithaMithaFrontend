# PithaMitha E-commerce Store

## Description
PithaMitha is a multivendor e-commerce platform for buying and selling traditional PithaMitha delicacies. The platform is built with Next.js for the frontend and Strapi CMS for the backend, ensuring a scalable and performant application.

## Table of Contents
- [liveDemo](#liveDemo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contact](#contact)

## liveDemo
- [Live Demo](https://pitha-mitha-frontend.vercel.app/)

> **Note:** The first time you load the demo, it may take some time because I am using the Render free version for backend hosting. In the free version, the server is disabled after a period of inactivity, so it may take up to a minute to load the first time. Please be patient!

## Features
- User registration and authentication
- Vendor dashboard for managing products and orders
- Customer dashboard for tracking purchases
- Product search and filtering
- Infinite scrolling and lazy loading
- Provide sales-dashboard for seller

## Screenshots
![Home Page](https://github.com/sojib258/pithaMithaFrontend/assets/77184269/55fcf0d1-8344-45aa-a3ee-434f9d6e5f5d)



##


![Shop Page](https://github.com/sojib258/pithaMithaFrontend/assets/77184269/c13f4c6e-1dd6-46e2-ab02-27f929966faf)



##



![Setting Page](https://github.com/sojib258/pithaMithaFrontend/assets/77184269/8d804cbc-9497-4792-9c99-89514e495495)



##



![Dashboard](https://github.com/sojib258/pithaMithaFrontend/assets/77184269/080e8b65-6456-4572-bebc-4a7cb75c81d5)



##



![Shopping Cart](https://github.com/sojib258/pithaMithaFrontend/assets/77184269/4912a0f1-987e-4edc-989b-d61781b65a8b)


## Technologies Used
- **Frontend:** React, NextJs, TypeScript, Redux Toolkit, Material-UI
- **Backend:** Strapi CMS, Node.js
- **Database:** PostgreSQL(Render)
- **Authentication:** JWT
- **Hosting:** Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites
- Backend(you will find it my repositories named pithaMithaBackend)
- Node.js
- npm or yarn


### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sojib258/pithaMithaFrontend.git
   cd pithaMithaFrontend

   
2. **Install dependencies:**
   ```bash
   npm install or yarn install (preferred yarn)


## Environment Variables
To run this project, you will need to add the following environment variables to your .env files:

1. **Set up environment variables:**
   - Create a .env file in your root directory.
   - Add the necessary environment variables as specified in the .env.example files provided.

2. **Add this necessary info in your .env file:**
   ```bash
   NEXT_PUBLIC_API_KEY=http://localhost:1337/api (replace it with your backend api)
   NEXT_PUBLIC_SSL_COMMERZ_STORE_ID=(your demo store id from ssl commerz)
   NEXT_PUBLIC_SSL_COMMERZ_SECRET_KEY=(your demo secret key from ssl commerz)
   NEXT_PUBLIC_FRONTEND_URL=(your ssl domain name, make sure to keep it your frontend server url like-http://localhost:3000 )


## Usage

1. **Run the following command:**
   ```bash
   cd pithaMithaFrontend
   npm run dev or
   yarn dev

## Contact
If you have any questions or want to get in touch, feel free to reach out:
 - Email: sojibsrd85@gmail.com

