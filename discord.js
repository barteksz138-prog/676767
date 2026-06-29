{
  "version": 2,
  "builds": [
    { "src": "api/*.js", "use": "@vercel/node" },
    { "src": "public/index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/scrape", "dest": "/api/scrape.js" },
    { "src": "/api/discord", "dest": "/api/discord.js" },
    { "src": "/api/gemini", "dest": "/api/gemini.js" },
    { "src": "/(.*)", "dest": "/public/index.html" }
  ]
}
