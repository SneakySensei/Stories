![Logo](./assets/logo.png)

# **Stories** - HackCBS3.0

### Stories from the true you!

---

## A Preview of What Stories Is:

## Landing page:

![Landing Page](./assets/landing-page.png)

## Tag Selection

![Tag Selection](./assets/tag-selection.png)

## Chat Window

![Chat Window](./assets/chat-window.png)

## Toxicity Censoring

![Toxicity Censoring](./assets/toxicity-censoring.png)

## Banning Reported Users

![Banning Reported Users](./assets/banning-reported-users.png)

## The problem Stories solves

> The importance of mental health has been in its rightful spotlight for a while now but many people don't have access to the costly form of therapy. It is well known that people are likely to share their experiences with a stranger rather than an acquaintance due to the fear of being judged. It is a common practice to seek help via online chatrooms. The issue is that these chatrooms are not monitored properly. The rare ones that do, can be easily used against their purpose and push the `seeker` in a worse place.

> This is where our product stories come in. We provide a simplistic chat room that does much more for people who want to provide help and get helped.

## Challenges we ran into

> Implementing a chat room management system along with a banning middleware in Redis was rather difficult. Moreover, implementing authentication with JWT in Socket.io events was a second challenge as far as the web application goes. For the Tensorflow model, we had to fine-tune the model as per our applications, which meant fiddling with the confidence threshold of the output categories to get an optimum solution. It was also pretty tricky to pair the `seeker` & `supporter` based on their tags selection. After pairing them, getting a score based 'compatibility' for the same. And pushing them into the same chatroom based on the score.

## Features offered by Stories

- ### **Google Authentication**
  - Using `G-Auth` as the first layer of authenticity, allowing only verified users on our portal.
- ### **Anonymous Identities**
  - The identities of the `seeker` & the `supporter` are kept hidden from each other to eliminate biases.
- ### **Tags-Selection based pairing**
  - We are maintaining a score between the `supporters` and `seekers`, representing the total number of tags matched. The pair with the highest score is connected to the chatroom.
- ### **Censoring toxic messages**
  - We run the `Tensorflow.js` toxicity classifier on every message sent by the `supporter` to give us the probability of it being toxic. If it is deemed hurtful, the message is censored with a warning on the `seeker`'s end.
- ### **Real-time anaysis of data**
- To ensure real-time analysis of chat data, we use the popular memcache database `Redis` to store the chat room data and client management along with the list of banned users.
- ### **Reporting and banning of users**
  - The `seeker` can report the `supporter` under the circumstances the `supporter` is a troll. Having enough reports file against them, the `supporter`'s email and IP will be banned from our portal.

## Technology Stack and Dependencies

- **APIs**
  - Tensorflow.js
  - Node.js
  - Express in TypeScript
  - Socket.IO
  - Redis
  - Google OAuth
- **Front-end**
  - React.js in TypeScript-XML
  - Tailwind CSS
  - Styled Components
  - Socket.IO - Client

# Thank You!

<h1 align="center"> Contributors </h1>
<table align="center">
<tr align="center">
<td>
<strong>Gita Alekhya Paul</strong>
<p align="center">
<img src = "https://avatars3.githubusercontent.com/u/54375111?s=460&u=0585ce48d7a98d878ee16041d73695e37b17ade0&v=4"  height="120" alt="Gita Alekhya Paul">
</p>
<p align="center">
<a href = "https://github.com/gitaalekhyapaul"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/gitaalekhyapaul">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
</td>
<td>
<strong>Snehil</strong>
<p align="center">
<img src = "https://avatars3.githubusercontent.com/u/51155558?s=400&u=7873ade2191ac7687f628664fff8f687213f00e5&v=4"  height="120" alt="Snehil">
</p>
<p align="center">
<a href = "https://github.com/SneakySensei"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/snehilcodes/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
</td>
</tr>
</table>
<table align="center">
<tr align="center">
<td>
<strong>Paras Rawat</strong>
<p align="center">
<img src = "https://media-exp1.licdn.com/dms/image/C5103AQEaXwOr9KSzpw/profile-displayphoto-shrink_200_200/0?e=1610582400&v=beta&t=tybc9-XGkcYtKjGjdlua6ViJW4WetfFtmmd_qHpE1QE"  height="120" alt="Paras Rawat">
</p>
<p align="center">
<a href = "https://github.com/TrizteX"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/paras-rawat-427a52174/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
</td>
<td>
<strong>Yashvardhan Jagnani</strong>
<p align="center">
<img src = "https://avatars0.githubusercontent.com/u/60016972?s=460&u=44becacb17c82494c8a16c1d17f9f7183f8d67c3&v=4"  height="120" alt="Yashvardhan Jagnani">
</p>
<p align="center">
<a href = "https://github.com/jagnani73"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/yashvardhan-jagnani">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
</td>
</tr>
</table>
