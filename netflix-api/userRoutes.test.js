const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("./server");
const http = require("http");

const startTestServer = () =>
  new Promise((resolve) => {
    const server = http.createServer(app);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });

const request = (port, { method, path, body }) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: payload
          ? {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(payload),
            }
          : {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            json: data ? JSON.parse(data) : null,
          });
        });
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });

test("liked-movie API stores and removes titles in memory", async (t) => {
  const { server, port } = await startTestServer();
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const email = "demo@example.com";
  const movie = { id: 42, name: "Demo Film", image: "/x.jpg", genres: ["Action"] };

  const added = await request(port, {
    method: "POST",
    path: "/api/user/add",
    body: { email, data: movie },
  });
  assert.equal(added.status, 200);
  assert.match(added.json.msg, /successfully added/);

  const listed = await request(port, {
    method: "GET",
    path: `/api/user/liked/${email}`,
  });
  assert.equal(listed.status, 200);
  assert.equal(listed.json.movies.length, 1);
  assert.equal(listed.json.movies[0].id, 42);

  const removed = await request(port, {
    method: "PUT",
    path: "/api/user/remove",
    body: { email, movieId: 42 },
  });
  assert.equal(removed.status, 200);
  assert.equal(removed.json.movies.length, 0);
});
