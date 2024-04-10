# Local Newsletter

Is a dynamic web platform designed to empower local communities by facilitating the sharing of news articles, event listings, and neighborhood updates. It fosters a sense of belonging and connectivity among residents, enabling them to stay informed about what's happening in their area.

## Author

Hulak Mykhailo

[Send me an email](miha.gulak@gmail.com)

[Find me on telegram](https://t.me/@midjiro)

## Getting Started

1.  Clone repo

    `git clone https://github.com/midjiro/hulak.university.local-news.git`

2.  Install dependencies

    `cd client && npm install`
    `cd server && npm install`

3.  Setup env variables and provide GCS key file

    For client:

        `REACT_APP_SERVER_ENDPOINT = "..."`

    For server:

    `CLIENT_ID = "..."
    CLIENT_SECRET = "..."
    SESSION_SECRET = "..."
    GCS_PROJECT_ID = "..."
    GCS_KEY_PATH = "..."
    GCS_BUCKET_NAME = "..."

        MONGO_PASSWORD = "..."


        CLIENT_APP_ENDPOINT = "..."
        PORT = ...`

4.  Run npm start both on server and client

## Project Documentation

Will be added soon

## Project Task Decomposition

Week 1:

-   Implement user authentication with Google account (OAuth 2.0). ✅
-   Set up project structure and initial dependencies. ✅
-   Define database schema for user profiles and content storage. ✅
-   Configure Vercel hosting environment. ✅
-   Write unit tests for authentication functionality.

Week 2:

-   Implement profile management features. ✅
-   Design and develop UI components for user profiles. ✅
-   Integrate profile update functionality with backend services. ✅
-   Write unit tests for profile management.
-   Document profile management endpoints for Postman collection.

Week 3:

-   Implement article submission functionality. ✅
-   Create form for users to submit articles. ✅
-   Develop backend logic for storing and retrieving articles. ✅
-   Write unit tests for article submission and retrieval.
-   Document article endpoints for Postman collection.

Week 4:

-   Implement event listings feature. ✅
-   Design UI for browsing and creating events. ✅
-   Integrate event data with calendar component.
-   Write unit tests for event creation and listing.
-   Document event endpoints for Postman collection.

Week 5:

-   Implement neighborhood updates feature.
-   Design UI for posting and viewing updates.
-   Develop backend logic for managing updates.
-   Write unit tests for neighborhood updates functionality.
-   Document update endpoints for Postman collection.

Week 6:

-   Implement search functionality. ✅
-   Integrate search bar with backend search algorithms.
-   Design UI for displaying search results. ✅
-   Write unit tests for search functionality.
-   Document search endpoints for Postman collection.
