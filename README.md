<div align="center">
  <img src=".github/imgs/duck.svg" style="width:100px;"/>
</div>

## About the DevStream Hub

This project aims to create a clone of Twitch, a popular live streaming platform, using the Next.js framework in its version 14.

##### Objective

The main goal is to understand and apply the basics of Next.js, starting with initial configuration, routing, and gradually advancing to more complex features such as authentication, database integration, configuring local tunnels, Webhooks and establishing RTMP and WHIP connections for streaming in software such as OBS.

This project aims to create a comprehensive live streaming experience, combining advanced features with an intuitive interface and exceptional performance.

#### Key Features:

1. **Streaming using RTMP / WHIP Protocols**
   Implementation of live video streaming using RTMP and WHIP protocols to ensure a high-quality streaming experience.

2. **Generating Ingress**
   Setting up mechanisms to generate ingress and allow users to start their own live streams quickly and easily.

3. **Connecting Next.js app to OBS / Your favorite streaming software**
   Facilitating the connection between the Next.js developed application and popular streaming software like OBS, enabling users to stream content directly from their screens.

4. **Authentication**
   Implementation of authentication systems to ensure the security of user accounts and protect access to sensitive platform resources.

5. **Thumbnail Upload**
   Functionality to allow streamers to upload custom thumbnails for their live streams, aiding in identification and attracting viewers.

6. **Live Viewer Count**
   Real-time display of the number of viewers watching a live stream, providing immediate feedback on stream performance.

7. **Live Statuses**
   Visual indication of the statuses of live streams, such as "Live", "Offline", or "Paused", to help viewers find relevant content.

8. **Real-time Chat using Sockets**
   Implementation of a real-time chat system using sockets to enable instant interactions between streamers and viewers during live streams.
9. **Unique Color for Each Viewer in Chat**

   Assignment of a unique color for each viewer in the chat, facilitating message identification and promoting a more engaging chat experience.

10. **Following System**

    Development of a following system that allows users to follow their favorite streamers and receive notifications when they go live.

11. **Blocking System**

    Implementation of a system that allows users to block unwanted other users, promoting a safer and more welcoming streaming environment.

12. **Kicking Participants from a Stream in Real-time**
    Ability for streamers to kick unwanted participants from their live streams in real-time, ensuring greater control over interaction on the platform.
13. **Streamer / Creator Dashboard**

    Development of a custom dashboard for streamers and creators to manage their live streams, including statistics, settings, and community interactions.

14. **Slow Chat Mode**

    Implementation of a slow chat mode that limits how often users can send messages, promoting a more organized and meaningful conversation.

15. **Followers Only Chat Mode**
    Functionality that allows streamers to restrict chat to followers only, encouraging viewers to engage more with the community.

16. **Enable / Disable Chat**
    Option for streamers to enable or disable chat during their live streams, offering flexibility in managing viewer interaction.

17. **Collapsible Layout**
    Feature that allows users to hide interface elements such as sidebars and chat for a wider view of the stream content.

18. **Sidebar Following & Recommendations Tab**
    Addition of a tab in the sidebar that displays suggestions for streamers to follow, promoting community growth and content discovery.

19. **Home Page Recommending Streams**
    Home page displaying a selection of recommended live streams, sorted by ongoing streams, providing easy entry for new viewers.

20. **Search Results Page with Different Layout**
    Creation of a search results page with a customized layout to facilitate viewing and navigation between relevant results.

21. **Syncing User Information to Our DB using Webhooks**
    Configuration of webhooks to synchronize user information with the database, ensuring real-time consistency and updates of platform data.

22. **Syncing Live Status Information to Our DB using Webhooks**
    Use of webhooks to synchronize live status information with the database, keeping live stream data updated and accessible to users.

23. **Community Tab**
    Addition of a dedicated community tab highlighting events, highlights, and interactions among members, promoting a sense of belonging and engagement.

24. **Beautiful Design**
    Development of a visually appealing and intuitive interface to ensure an engaging and memorable user experience.

25. **Blazing Fast Application**
    Optimization of code and resources to ensure the application is fast and responsive, providing a seamless streaming experience.

26. **SSR (Server-Side Rendering)**
    Utilization of server-side rendering to improve performance and search engine indexing of the application.

27. **Grouped Routes & Layouts**
    Organization of application routes and layouts in a grouped manner to facilitate maintenance and scalability of the project.

28. **Postgress**
    Use of Postgress as the primary database to store and manage platform data.

29. **Deployment**
    Configuration of deployment processes to ensure availability and scalability of the application in different production environments.

#### Clone this project

Some config

```bash
  git clone https://github.com/mauriciogirardi/devstream-hub.git
```

1 - Create a file **.env** and copy envs from **.env.example**

2 - Cleck, create a count [site](https:www.clerk.com) ,once registered manages the environment and add .env

- CLERK_WEBHOOK_SECRET=
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=

3 - LiveKit, create a count [site](https:www.https://cloud.livekit.io/) ,once registered manages the environment and add .env

- NEXT_PUBLIC_LIVEKIT_API_URL=
- LIVEKIT_API_URL=
- LIVEKIT_API_KEY=
- LIVEKIT_API_SECRET=

3 - Uploadthing, create a count [site](https://uploadthing.com/) ,once registered manages the environment and add .env

- UPLOADTHING_SECRET=
- UPLOADTHING_APP_ID=

4 - Supabase, create a count [site](https://supabase.com/) ,once registered manages the environment and add .env

- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- DATABASE_URL=

```bash

  # install dependence
  pnpm i

  # Run the migrations
  pnpm prisma migrate dev

  # Run project
  pnpm run dev

  # Run ngrok
  # I’m using ngrok in dev environment to upload the url to cleck.
  ngrok http --domain=your-domain-here 3000
```
