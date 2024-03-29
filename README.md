**<h1>Varila</h1>**<br/>
Varila is a full-stack(MERN) application that allows users all over the world to collaborate on a document and make modifications at the same time. You can either login or sign-up before accessing the docs page. You can create multiple documents and collaborate with your friends by just sharing the link.

![Verila_intro_gif](https://user-images.githubusercontent.com/27888823/131608928-b3b79d20-308a-41c4-868d-ab8cc98b8830.gif)

<p>Frameworks/Libraries: React, Redux, Node.js, Express, Material-UI, Mongoose, Quill, Socket.io, JWT <br />
Tools/Technologies: Git/Github, MongoDB, AWS, </p>

<h2>Design</h2>
<li>MVC design pattern for the backend.</li>
<li>Redux for front-end JWT storage.</li>
<li>Unless users signs up or log in, other pages such as /doc are not reachable.</li>
<li>Observer design pattern for socket.io integration, which allows users to make modification to a document simultaneously.</li>


<h2>Implementation</h2>
Front-end:
<li>Material-ui library is used for login & sign-up components.</li>
<li>The user data is stored in MongoDB database.</li>
<li>Redux and Redux-persist is utilized to store JWT token sent by backend API calls.</li>
<li>Quill library is used for text-editor functionality.</li>
<br />
Backend:
<li>Socket.io is used to allow all users to modify a document simultaneously.</li>
<li>Mongoose library is used to interact with MongoDB database.</li>
<li>There are 3 different pages: /login, /signup, /doc.</li>
<li>The /login, and /signup POST APIs send JWT token as a response.</li>
<li>/doc/{{document_id}} endpoints save the current changes made to the document within 2 seconds.</li>
<li> The web app is hosted on AWS EC2 instance.</li>


<h2>Time & Effort</h2>
The project took ~18 hours in total, within 3 days.
