# Parmazon Prime 

[Parmazon](https://parmazon-prime.onrender.com) is a website clone, inspired by Amazon, developed with React, Redux, JavaScript, Python, PostgreSQL, and Flask.

## About Parmazon
Parmazon Prime, your ultimate online marketplace, redefines the e-commerce experience with a delightful fusion of premium products, user-friendly design, and a touch of humor. Specializing in a diverse selection of quality cheeses, Parmazon Prime caters to enthusiasts seeking a superlative culinary adventure. From exploring an extensive cheese collection to providing a platform for cheese sellers, Parmazon Prime brings together a community that shares a passion for all things cheesy. Our founders, Sophie, Peang, Peter, and Yoseph, envisioned a platform where every purchase is a celebration of flavor and fun. Join us at Parmazon Prime and savor the cheesy goodness crafted by our creators!

## Index

[Feature List](https://github.com/sophie97yang/Parmazon-Prime/wiki/Features-List) | [Database Schema](https://github.com/sophie97yang/Parmazon-Prime/wiki/Database-Schema) | [API Documentation](https://github.com/sophie97yang/Parmazon-Prime/wiki/API-Documentation) | [User's-Stories](https://github.com/sophie97yang/Parmazon-Prime/wiki/User's-Stories) | [Wireframes] (https://docs.google.com/presentation/d/1JTCx5V3KThPFnepnDJD642OPPX2vSBidG9al-1wTF8s/edit#slide=id.g29ca361abb9_0_21)

## Installation Instructions

1. Clone this repository: https://github.com/sophie97yang/Parmazon-Prime
2. Install dependencies:
   * backend:
       * ` pipenv install `
   * frontend  (navigate to react-app folder `cd react-app `):
       * ` npm install `
3. Create a .env file using the .envexample provided
4. Set up virtual environment:
    * ` Pipenv shell `
5. Database Setup, run the following commands:
   * ` flask db init `
   * ` flask db migrate `
   * ` flask db upgrade `
   * ` flask seed all `
6. Start the app for the backend and frontend using:
   * backend :
       * `flask run `
   * frontend (navigate to react-app folder `cd react-app `):
       * ` npm start `
7. Visit http://localhost:3000 in your browser to see the React application running.

## Amazon Web Services S3
   * For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)


## Tech Stack
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Features 
- Products
- Reviews
- Shopping Cart
- Wishlist
- Returns

## Site Walkthrough 
https://github.com/sophie97yang/Parmazon-Prime/assets/129304831/c0cd3108-a42a-4f9d-a54a-990015a577c2


## How to use Parmazon
If you are interested in checking out our site, please create a membership by signing up! You are also able to log in as a demo member or seller.

## Future Implementation 
We look forward to implementing these in the near future:
- Paginate Products List
- Offer different ways users want to filter a product, their reviews, their past orders
  - by category
  - by best seller
  - by date
- Keep track of Best Sellers
- Advancing Package Tracker feature (integrating Google Cloud feature)
- Integrating OAuth 
## Connect with us on ![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)
  - [Sophie Yang](https://www.linkedin.com/in/sophie-yang-bb9758156/)
  - [Peang Ngo](https://www.linkedin.com/in/peang-ngo-840860112/)
  - [Peter Dinh](https://www.linkedin.com/in/peter-dinh-66f/)
  - [Yoseph Latif](https://www.linkedin.com/in/yoseph-latif/)
