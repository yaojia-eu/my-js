// 视频配置 - 请替换为您的实际视频URL
        const videoConfig = {
            // 方案1: 直接MP4链接（推荐）
            mp4: 'https://player.vimeo.com/progressive_redirect/playback/1112811167/rendition/1080p/file.mp4?loc=external&log_user=0&signature=a4d204cc37b54fe7f3c721934c5ee005f6ba904c514ef654a9440b2296b6d0b4',
            // 方案2: 备用格式
            webm: 'YOUR_VIDEO_URL.webm',
            ogv: 'YOUR_VIDEO_URL.ogv',
            // 方案3: HLS流媒体
            hls: 'YOUR_VIDEO_URL.m3u8',
            // 海报图片
            poster: 'https://i.vimeocdn.com/video/1827834087_1280x720.jpg'
        };

        // 动态创建video元素
        function loadDynamicVideo() {
            const container = document.getElementById('videoContainer');
            const placeholder = document.getElementById('videoPlaceholder');
            
            // 显示加载提示
            container.innerHTML = '<div class="eu-clubmed-loading">Loading video</div>';
            
            try {
                // 创建video元素
                const videoElement = document.createElement('video');
                videoElement.className = 'eu-clubmed-dynamic-video';
                videoElement.controls = true;
                videoElement.autoplay = true;
                videoElement.poster = videoConfig.poster;
                
                // 添加多个视频源以提高兼容性
                const sources = [
                    { src: videoConfig.mp4, type: 'video/mp4' },
                    { src: videoConfig.webm, type: 'video/webm' },
                    { src: videoConfig.ogv, type: 'video/ogg' }
                ];
                
                sources.forEach(function(sourceConfig) {
                    if (sourceConfig.src && sourceConfig.src !== 'YOUR_VIDEO_URL.mp4' && !sourceConfig.src.includes('YOUR_VIDEO_URL')) {
                        const sourceElement = document.createElement('source');
                        sourceElement.src = sourceConfig.src;
                        sourceElement.type = sourceConfig.type;
                        videoElement.appendChild(sourceElement);
                    }
                });
                
                // 添加错误处理
                videoElement.addEventListener('error', function(e) {
                    console.error('Video loading error:', e);
                    showErrorMessage();
                });
                
                // 检查是否有有效的视频源
                if (videoElement.children.length === 0) {
                    // 如果没有配置视频URL，显示提示信息
                    showVideoConfigMessage();
                } else {
                    // 替换容器内容
                    container.innerHTML = '';
                    container.appendChild(videoElement);
                    
                    // 尝试播放
                    videoElement.play().catch(function(error) {
                        console.warn('Autoplay prevented:', error);
                        // 自动播放被阻止是正常的，用户需要手动点击播放
                    });
                }
                
            } catch (error) {
                console.error('Error creating video element:', error);
                showErrorMessage();
            }
        }

        // 显示视频配置提示
        function showVideoConfigMessage() {
            const container = document.getElementById('videoContainer');
            container.innerHTML = `
                <div class="eu-clubmed-error-message">
                    <h3>📹 Video Configuration Needed</h3>
                    <p>Please configure your video URL in the script section:</p>
                    <p style="font-family: monospace; font-size: 14px; margin-top: 15px;">
                        videoConfig.mp4 = 'your-video-url.mp4'
                    </p>
                    <p style="margin-top: 15px; font-size: 14px;">
                        <strong>Supported formats:</strong> MP4, WebM, OGV, HLS
                    </p>
                    <button class="eu-clubmed-retry-button" onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }

        // 显示错误信息
        function showErrorMessage() {
            const container = document.getElementById('videoContainer');
            container.innerHTML = `
                <div class="eu-clubmed-error-message">
                    <h3>⚠️ Unable to Load Video</h3>
                    <p>The video could not be loaded. This might be due to:</p>
                    <p>• Invalid video URL or format</p>
                    <p>• Network connection issues</p>
                    <p>• Browser compatibility</p>
                    <button class="eu-clubmed-retry-button" onclick="loadDynamicVideo()">Try Again</button>
                </div>
            `;
        }

        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('EU Club Med page loaded - Dynamic video player ready');
            console.log('Video configuration:', videoConfig);
            
            // 可选：自动加载视频（取消注释以启用）
            // setTimeout(function() {
            //     loadDynamicVideo();
            // }, 1000);
        });
