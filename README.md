# react-luo

## 构建

-* npm install

-* npm run dll<br/>静态资源预编译，首次使用时务必执行一次这个

-* npm run dev<br/>运行开发环境，默认监听8888端口，访问http://localhost:8888即可查看

-* npm run build<br/> 正式打包，用于生产环境

## 特性

-* 使用了webpack静态资源预编译和HappyPack多线程构建代码

-* 最终打包后，会在/build文件夹下生存 index.html 和 /dist文件夹，这两个东西是最终需要的<br/>/build/dev这个文件夹是静态预编译文件，不用管。
