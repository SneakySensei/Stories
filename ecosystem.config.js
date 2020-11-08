module.exports = {
  apps: [
    {
      name: "HackCBS-2020",
      script: "./build/app.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
