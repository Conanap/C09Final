# Project-Abstron

### Winter 2019 CSCC09 Final Project - Prepared by ABSGroup
* Albion Fung `fungalbi` @conanap
* Brian Chen `cheny187` @byxchen
* Saba Kiaei `kiaeisab` @sabulikia

# Final Information

### Web Application URL
(Note: this is sometimes down due to hourly fees)

https://abstron.net/

### Demo Video URL
https://youtu.be/qkJwYQh1OGE

### API Documentation Link
API documentation can be found [here](https://github.com/UTSCC09/project-abstron/blob/master/abstron-game/docs/README.md)

## Description
Project-Abstron is a real-time web based, 2D online multiplayer game, similar to Tron or paper.io. Players control a trail-leaving character in a 2D arena and must strategically block off and destroy other players using their trail to claim victory. Users will be able to keep track of their scores through a highscore system, and will be able to connect to their social media accounts. The social media integration will allow users to post their achievements on to those medias, share challenge links, or chat with other users. 

## Final Release
The final release contained in this GitHub repository contains the following features:
- Authentication of users and security
- Highscore system - a persistent ranking of top-scoring players of Project-Abstron
- Social media integration including logins using OAuth from Facebook and Google
- Cloud hosting - moving from locally hosted to a cloud host using EC2 instances
- Secured and routed through Cloudflare and having a SSL certificate and everything served through HTTPS
- Push notifications - giving players the ability to turn on real-time desktop or mobile notifications when a friend starts playing Project-Abstron, when your highscore is beaten, etc.
- Real-time gameplay system that matches two users using WebRTC and commences a game of Project-Abstron. Synchroniziation and lag are dealt with and the game ends when either player loses all their lives

## Challenge Factors/Learning
- Learning new development frameworks (React, GraphQL, WebRTC) -  WebGL, GraphQL, and WebRTC are all new standards/frameworks that are exploding in popularity, while React is one of the most widely used development frameworks. Our team had little to no experience working with any of the frameworks specified, so it was a challenge learning to work with and integrating these new tools together.

- Ensuring low-latency real-time communication (WebRTC) - WebRTC provides a basis to ensure real-time synchronization between different users but for real-time games, factors such as latency, frames per second, and server-sided validation are all essential to creating a smooth and fair experience to all players. This created challenges that we needed to get creative to solve.

- Creating 2D/3D integrated gameplay graphics (WebGL) - Creating 2D/3D graphics on the web is a difficult task due to our inexperience working with graphical frameworks. Ensuring similar performance and visibility on lower-end operating systems and different browsers/resolutions will pose a significant challenge.

- Integrating several APIs (Facebook/Twitter APIs, OAuth) - OAuth was described as not a challenge, but the comprehensive social media integration described above in the Final Release section will require lots of work with social media APIs. Find-a-friend, post-to-media, assimilating game and social media accounts all require extensive use and integration of APIs.

- Cloud hosted, secured, and scalable (Amazon EC2 instances) - Exploring how to make a website secured, cloud-hosted and scalable is an interesting challenge. Our team hadn't worked with AWS before, nor were we familiar with HTTPs, Cloudflare, or domain hosting. Exploring how to deploy a secured, accessible and scalable website was an interesting technical challenge in itself.

---
# Previous Information

## Release Timeline
Although development is always an ongoing process, we have outlined a potential release schedule for features of Project-Abstron. Below we will describe the features that we expect to see at every release (Beta releases March 17th, Final releases March 31st). This may be subject to change as priorities shift and roadblocks occur. Features may be released slightly earlier or later than stated.

### Beta Version
By the beta release, our group plans to have the website's core features completed, including authentication and gameplay fundamentals. This includes:
- Basic authentication - Players will be able to register, sign in, and sign out of Project-Abstron
- Basic user interface - The layout and design of all pages will be completed (Registration, Lobby, Gameplay, Highscores)
- Basic backend - Queries to backend will be appropriately processed and user and game information will be stored in a persistent datastore
- Basic gameplay - Players will be able to enter the game and control their characters using their keyboard. Real-time interaction and winning conditions are implemented.
- Secured website - Website will be secured using HTTPs, backed by Cloudflare and possess its own SSL certificate

### Final Release
The final release will see the release of comprehensive social media integration, cloud hosting, highscores, push notifications, and other supplementary perks that make the game easier to play and share.
- Highscore system - a persistent ranking of top-scoring players of Project-Abstron
- Comprehensive social media integration - Mainly twitter and facebook, this would include creating lobby invite links, linking social media account with Project-Abstron accounts, suggesting adding in-game friends based on social media friends who play Project-Abstron, and sharing highscores via social media.
- Cloud hosting - moving from locally hosted to a cloud host such as Amazon Web Services
- Push notifications - giving players the ability to turn on real-time desktop or mobile notifications when a friend starts playing Project-Abstron, when your highscore is beaten, etc.

## Tech Stack
### Frontend
`React.js` - React will be the main frontend framework for building user interfaces. Most if not all of the aspects of the user interface will be react components. 

`WebGL` - WebGL, or Web Graphics Library will be our tool of choice for rendering 2D and 3D graphics for the game - it will be responsible for rendering the gameplay elements that define Project-Abstron.

### Middleware
`Express.js` - Express will be our web application middleware of choice when handling incoming requests and queries. We will be using popular express libraries such as session, graphql, etc.

### Backend
`GraphQL` - We will be using GraphQL (Graph Query Language) to process data requests instead of the normal RESTful techniques.

`Node.js` - Node.js will be used as the backend server environment to process and host the application - we will be using the npm library to install useful modules.

`WebRTC` - The WebRTC API will be used to establish real-time synchronization and real-time interaction aspects of Project-Abstron gameplay.

### Other
`Amazon Web Services` - The project will be hosted on the cloud, using an AWS EC2 instance.

`Cloudflare` - To protect against DDOS and secure Project-Abstron, we will route it through Cloudflare and secure it with a SSL certificate and ensure HTTPS standards are met.

`MongoDB` - The persistent datastore to store user information, highscores, social media connections, etc. will be MongoDB.

## Technical Challenges
There are several technical challenges associated with developing a game such as Project-Abstron. We've outlined five of the major technical challenges that our team will face:

- Learning new development frameworks (WebGL, React, GraphQL, WebRTC) -  WebGL, GraphQL, and WebRTC are all new standards/frameworks that are exploding in popularity, while React is one of the most widely used development frameworks. Our team has little to no experience working with any of the frameworks specified, so it will be a challenge learning to work with and integrating these new tools together.
- Ensuring low-latency real-time communication (WebRTC) - WebRTC provides a basis to ensure real-time synchronization between different users but for real-time games, factors such as latency, frames per second, and server-sided validation are all essential to creating a smooth and fair experience to all players. This creates challenges that we need to get creative to solve.
- Creating 2D/3D integrated gameplay graphics (WebGL) - Creating 2D/3D graphics on the web is a difficult task due to our inexperience working with graphical frameworks. Ensuring similar performance and visibility on lower-end operating systems and different browsers/resolutions will pose a significant challenge.
- Integrating several APIs (Facebook/Twitter APIs, OAuth) - OAuth was described as not a challenge, but the comprehensive social media integration described above in the Final Release section will require lots of work with social media APIs. Find-a-friend, post-to-media, assimilating game and social media accounts all require extensive use and integration of APIs.
- Cloud hosted, secured, and scalable (Amazon EC2 instances) - Exploring how to make a website secure, cloud-hosted and scalable is an interesting challenge. Our team hasn't worked with AWS before, nor are we familiar with HTTPs, Cloudflare, or domain hosting. Exploring how to deploy a secured, accessible and scalable website will be an interesting technical challenge in itself.
