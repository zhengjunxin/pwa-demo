# Navigation Preload
- 问题：请求 navigation request 时需要启动 SW，但 SW 启动也需要耗时，所有响应时间=SW启动时间+缓存读取时间（或无缓存时，从网络读取的时间）
- 使用Preload来并行请求navigation request和启动SW

## 使用说明
### without-preload
- 在该目录启动 http-server，访问 http://127.0.0.1:8080/ 注册 SW
- 打开 Application 点击 stop 停止 SW
- 刷新页面，此时：navigation request time = SW 启动时间 + 页面从网络请求时间

### preload
- 在该目录启动 http-server，访问 http://127.0.0.1:8080/ 注册 SW
- 打开 Application 点击 stop 停止 SW
- 刷新页面，此时：navigation request time = 页面从网络请求时间。因为 SW 使用了并行的 preload 作为返回

### preload-from-cache
- 在该目录启动 http-server，访问 http://127.0.0.1:8080/ 注册 SW
- 打开 Application 点击 stop 停止 SW
- 刷新页面，此时：navigation request time = SW 启动时间 + 页面从缓存读取的时间
