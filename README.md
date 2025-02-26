# Building a Real-Time Polling App with Next.js, Supabase and Permit.io for Audience Participation :writing_hand:

This repository contains the demo project for building a real-time polling app using Next.js, Supabase, and Permit.io for role-based access control (RBAC). In this project, unauthenticated users are allowed only to view polls on the platform. Authenticated users can create new polls, vote in them (except for polls they created) and view real-time voting results. Only the creator of a poll is allowed to edit or delete their poll. Check out the full tutorial on [the Permit blog](https://www.permit.io/blog).

Visit my blog, [Timonwa's Notes](https://tech.timonwa.com/blog), for more awesome technical content such as articles, code snippets, tech goodies, community projects, and more.

If you find this repository helpful, please give it a ⭐ to show your support!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [License](#license)

---

## Features

- Role-based access control (RBAC) using Permit.io
- User authentication with Supabase Email Authentication
- CRUD actions with different permissions per role
- Real-time polling updates with Supabase

## Technologies Used

- **Next.js** – React framework for building full-stack applications
- **Supabase** – For real-time database and authentication
- **Permit.io** – Handles permissions and role-based access controls

---

## Setup and Installation

To run this project locally:

- **Clone the repository:**

  ```bash
  git clone https://github.com/Studio1HQ/realtime-polling-app-nextjs-supabase-permitio.git
  ```

- **Install dependencies:**

  ```bash
  cd realtime-polling-app-nextjs-supabase-permitio
  npm install
  ```

- **Start the development server:**

  ```bash
  npm dev
  ```

---

## License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/Timonwa/react-chat-permitio-firebase/blob/main/LICENSE.MD) file
for details.

---

### Additional Resources

- [Next.js](https://nextjs.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Permit.io Documentation](https://docs.permit.io)
