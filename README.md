# Photo Gallery Web Application

## Overview

This document provides a comprehensive overview of a Photo Gallery Web Application designed for users to search, browse, and upload images. The application integrates with the **Unsplash API** for accessing a vast library of images and uses **Cloudflare R2** for storing user-uploaded pictures. The frontend and backend are built with **Next.js**, the ORM used is **Drizzle**, and **PostgreSQL** serves as the database.

---

## Features

### Core Features

1. **Image Search and Browse**

   - Users can search for images using keywords.
   - Images are fetched in real-time from the Unsplash API.
   - Browse images with pagination for a smooth user experience.

2. **User Accounts**

   - Users can create and manage their accounts.
   - Login/logout functionality is provided.
   - Each user has a personalized dashboard.

3. **Image Uploads**

   - Users can upload images to their dashboard.
   - Images are stored in **Cloudflare R2**, ensuring secure and scalable storage.

4. **Responsive Design**
   - The application is optimized for both desktop and mobile devices.

---

## Technologies Used

### Frontend

- **Next.js**
  - Framework for server-side rendering and static site generation.
  - Built-in routing for seamless navigation.
  - API routes for backend logic.

### Backend

- **Next.js API Routes**
  - Handles the server-side logic, such as Unsplash API integration and user authentication.

### Database

- **PostgreSQL**
  - Stores user information, metadata for uploaded images, and application settings.
  - Managed using **Drizzle ORM**.

### ORM

- **Drizzle**
  - Used for defining schema, running migrations, and querying the database.

### Cloud Storage

- **Cloudflare R2**
  - Reliable and cost-effective object storage for user-uploaded images.

### Third-party API

- **Unsplash API**
  - Integrated for searching and browsing millions of high-quality images.

---

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- Cloudflare R2 account
- Unsplash API key

### Steps to Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd photo-gallery-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   UNSPLASH_API_KEY=<your-unsplash-api-key>
   CLOUDFLARE_ACCOUNT_ID=<cloudflare-account-id>
   CLOUDFLARE_API_TOKEN=<cloudflare-api-token>
   CLOUDFLARE_BUCKET_NAME=<bucket-name>
   ```

4. **Run Migrations**
   Use Drizzle to migrate your database schema.

   ```bash
   npm run drizzle:sync
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## API Endpoints

### 1. **Unsplash API Integration**

- **Endpoint:** `/api/images`
- **Method:** `GET`
- **Description:** Fetch images from the Unsplash API.
- **Parameters:**
  - `query`: Search keyword.
  - `page`: Page number for pagination.

### 2. **User Management**

- **Signup:** `/api/register`
  - **Method:** `POST`
  - **Payload:** `{ username, email, password }`
- **Login:** `/api/login`
  - **Method:** `POST`
  - **Payload:** `{ email, password }`
- **Dashboard:** `/api/user/dashboard`
  - **Method:** `GET`
  - **Authentication:** Required.

### 3. **Image Upload**

- **Endpoint:** `/api/fileupload`
- **Method:** `POST`
- **Payload:** `{ image }`
- **Storage:** Images are uploaded to Cloudflare R2.

---

## Database Schema

### Users Table

| Column     | Type         | Description           |
| ---------- | ------------ | --------------------- |
| `id`       | UUID         | Primary key.          |
| `username` | VARCHAR(50)  | Unique username.      |
| `email`    | VARCHAR(100) | Unique email address. |
| `password` | TEXT         | Hashed password.      |

### Images Table

| Column      | Type | Description                          |
| ----------- | ---- | ------------------------------------ |
| `id`        | UUID | Primary key.                         |
| `user_id`   | UUID | Foreign key referencing Users table. |
| `image_url` | TEXT | URL of the stored image.             |

---

## Cloudflare R2 Configuration

1. **Create a Bucket**

   - Login to your Cloudflare dashboard and create a bucket.

2. **Generate API Token**

   - Assign permissions for reading and writing to the bucket.

3. **Integrate with the Application**
   - Use the API token and bucket name in the `.env.local` file.

---

## Deployment

### Suggested Platforms

- **Frontend/Backend:** Vercel (for Next.js).
- **Database:** Heroku, AWS RDS, or Supabase.
- **Cloud Storage:** Cloudflare R2.

### Steps

1. Build the Next.js app for production.
2. Deploy the app to Vercel or any Node.js hosting platform.
3. Set up environment variables on the hosting platform.

---

## Future Enhancements

1. **Advanced Search Filters**
   - Add support for searching by categories or tags.
2. **Social Sharing**
   - Allow users to share images on social media.
3. **AI-based Suggestions**
   - Suggest images based on user preferences.
4. **Image Moderation**
   - Implement AI tools to moderate uploaded content.

---

## Conclusion

This Photo Gallery Web Application provides a seamless and user-friendly experience for exploring and uploading images. Built with modern technologies, it offers a scalable architecture and sets the foundation for future enhancements.
