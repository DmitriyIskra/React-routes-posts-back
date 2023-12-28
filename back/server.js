import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let posts = [
  {
    content: 'First post for React',
    id: 1,
    created: Date.now(),
  },
  {
    content: 'Пост относящийся к курсу React',
    id: 2,
    created: Date.now(),
  },
];
let nextId = 3;

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  console.log(index)
  res.send(JSON.stringify({ post: posts[index] }));
  console.log(posts[index])
});

app.post("/posts", (req, res) => {
  posts.push({ ...req.body, id: nextId++, created: Date.now() });
  res.status(204);
  res.end();
});

app.put("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.map( post => {
    if(post.id === postId) {
      return {...post, id: +req.body.id, content: req.body.content}
    }
    return post;
  })
 
  res.status(204).end();
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }

  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
