document.addEventListener("DOMContentLoaded", function () {
  // 1️⃣ 获取容器
  const container = document.getElementById("videoContainer");

  // 2️⃣ 创建 video 元素
  const video = document.createElement("video");
  video.setAttribute("controls", "");     // 显示控制条
  video.setAttribute("autoplay", "");     // 自动播放(移动端通常需muted)
  video.setAttribute("muted", "");        // 静音才能自动播放
  video.setAttribute("loop", "");         // 循环播放
  video.style.width = "80%";              // 设置宽度
  video.style.maxWidth = "800px";
  video.style.border = "4px solid #555";
  video.style.borderRadius = "10px";
  video.style.backgroundColor = "#000";

  // 3️⃣ 添加 source
  const source = document.createElement("source");
  // 这里可以用你的真实视频路径(必须是可直接访问的 mp4/webm 直链)
  source.src = "https://www.w3schools.com/html/mov_bbb.mp4";
  source.type = "video/mp4";

  video.appendChild(source);

  // 4️⃣ 插入到容器中
  container.appendChild(video);
});
