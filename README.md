#使用方法
- 1、安装 arcblock: https://www.arcblock.io/docs/blocklet-developer/zh/setup-nodejs
- 注意nginx 安装方法：
- 文档没有写明需要依赖nginx 的 具体模块，导致apt 安装 的nginx 即使是文档要求的1.18.0 版本但是没有这个模块，只好删除重新编译。
- wget https://nginx.org/download/nginx-1.26.2.tar.gz
- tar -xvf nginx-1.26.2.tar.gz
- cd nginx-1.26.2
- ./configure --with-stream --with-stream_ssl_module --with-stream_ssl_preread_module --with-http_ssl_module --with-http_realip_module
- make -j 1  #几核cpu就写几
- make install
- cd /usr/sbin
- ln -s /usr/local/nginx/sbin/nginx nginx
- 2、安装好 arcblock 后
- git clone https://github.com/mushilianmeng/react_UserProfile
- cd react_UserProfile/
- npm i
- blocklet dev
- 访问类似的url即可：
- ℹ You can access with the following URL

- https://bbqawdygta4nq4rd2a6lfayf6jecazfbfzeum5kmq2e.did.abtnet.io

#作品说明
- 由于时间有限，命名和工程化没有太过在意，个人对于设计模式，抽象等是预估产品复杂性后取舍开发效率和可读性做设计，毕竟过于抽象和封装会导致代码可读性变差。
- 另本人面试的为服务器运维工程师，做前端代码的coding test 本人有疑惑，是工作内容需要么？
- 本代码已经过本人实际测试更换服务器后git clone 下来运行正常，如遇到问题请联系我，邮件：tingyuxinsheng@gmail.com
- 代码中的边界检测和数据校验只做了前端部分，xss，sql注入等同样由于时间成本关系未细化。
- arcblock 项目在国内服务器部署无法使用，浪费不少时间，但是没有明显报错只能通过系统信息凭借经验排除，建议增加报错屏显。
- 若无必要误增实体，软件有生命周期，没必要一开始就按大项目开发，会导致项目成功率降低，故此简单需求没有用太多的大项目设计方案。
  
# Getting Started with Create Blocklet

This project was bootstrapped with [Create Blocklet](https://github.com/blocklet/create-blocklet).

This blocklet is a dapp project, which means this is a full-stack application. It's contained both `server` and `client` code.

## File Structure

- public/ - static files
  - favicon.ico - favicon
  - favicon.svg - favicon
  - index.html - main html file, template for react
- screenshots/ - Screenshots
- api/ - Api side code
  - hooks/ - blocklet lifecycle hooks
  - libs/ - Api side libraries
  - middlewares/ - Api side middlewares
  - routes/ - Api side routes
  - index.js - Api side entry point
- src/ - Client side code (A standard react app structure)
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- Makefile - Makefile
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file

## Development

1. Make sure you have [@blocklet/cli](https://www.npmjs.com/package/@blocklet/cli) installed

   Blocklet needs blocklet server as a dependency. So you need to install it first.
   `npm install -g @blocklet/cli`
   See details in [https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli](https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli)

2. Init blocklet server & start blocklet server

   Before starting an blocklet server, you need to init blocklet server.
   `blocklet server init --mode=debug`
   `blocklet server start`
   See details in [https://www.arcblock.io/docs/blocklet-developer/getting-started](https://www.arcblock.io/docs/blocklet-developer/getting-started)

3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Start development server: `blocklet dev`

## Bundle

After developing a blocklet, you may need to bundle it. Use `npm run bundle` command.

## Deploy

- If you want to deploy this blocklet to local blocklet server, you can use `blocklet deploy .blocklet/bundle` command(Make sure the blocklet is bundled before deployment).
  > Or you can simply use `npm run deploy` command.
- If you want to deploy this blocklet to remote blocklet server, you can use the command below.

  ```shell
  blocklet deploy .blocklet/bundle --endpoint {your blocklet server url} --access-key {blocklet server access key} --access-secret {blocklet server access secret}
  ```

  > Make sure the blocklet is bundled before deployment.

## Upload to blocklet store

- If you want to upload the blocklet to any store for other users to download and use, you can following the following instructions.

  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Then config blocklet store url.
  You can use those store url in below.

  1. [https://store.blocklet.dev/](https://store.blocklet.dev/)
  2. [https://dev.store.blocklet.dev/](https://dev.store.blocklet.dev/)
  3. A blocklet store started by yourself.
     > Make sure you have installed a `blocklet store` on your own blocklet server. Check it on here: [https://store.blocklet.dev/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ](https://store.blocklet.dev/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ)

  ```shell
  blocklet config set store {store url}
  ```

  Get a `accessToken` by using this command.

  > Why we need a `accessToken`?
  > A `accessToken` is genrate by blocklet store, which help us upload our blocklet to any store.

  Set `accessToken` to blocklet config

  ```shell
  blocklet config set accessToken {accessToken}
  ```

  Upload a new version to a store.

  > Make sure the blocklet is bundled before upload.

  ```shell
  blocklet upload
  ```

  Or you can simply use `npm run upload` command.

- You also can upload a new version to a store by Github CI.
  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Push your code to Github main/master branch, or make a pull request to the main/master branch.
  The CI workflow will automatically upload a new version to a store.

## Q & A

1. Q: How to change a blocklet's name?

   A: Change the `name` field in the `package.json` file, change the `name` field in the `blocklet.yml` file.

   You can also change the `title` field and `description` field in the `blocklet.yml` file.

   Run `blocklet meta` command, you will get a `did` config, copy the `did` value.

   Replace this command `"bundle:client": "PUBLIC_URL='/.blocklet/proxy/{did}' npm run build",` in `package.json`

   Replace `did` field in the `blocklet.yml`

2. Q: How to change a blocklet's logo?

   Change the `logo.png` file root folder.

   Or you can change the `logo` field in the `blocklet.yml` file.

   > Make sure you have added the logo path to the `blocklet.yml` file `files` field.

## Learn More

- Full specification of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of Blocklet Server & blocklet development: [https://www.arcblock.io/docs/blocklet-developer](https://www.arcblock.io/docs/blocklet-developer)

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
