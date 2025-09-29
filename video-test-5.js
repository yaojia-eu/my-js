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
            console.log('loadDynamicVideo called');
            
            const container = document.getElementById('videoContainer');
            const placeholder = document.getElementById('videoPlaceholder');
            
            if (!container) {
                console.error('Video container not found');
                return;
            }
            
            // 标记为已初始化，防止重复初始化
            if (placeholder) {
                placeholder.setAttribute('data-initialized', 'true');
            }
            
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
                    <button class="eu-clubmed-retry-button" id="retryButton">Try Again</button>
                </div>
            `;
            
            // 为重试按钮绑定事件
            const retryBtn = document.getElementById('retryButton');
            if (retryBtn) {
                retryBtn.addEventListener('click', function() {
                    loadDynamicVideo();
                });
            }
        }

        // 初始化函数 - 绑定事件
        function initVideoPlayer() {
            console.log('Initializing video player...');
            console.log('Video configuration:', videoConfig);
            
            // 绑定点击事件到占位符
            const placeholder = document.getElementById('videoPlaceholder');
            if (placeholder) {
                placeholder.addEventListener('click', function() {
                    console.log('Placeholder clicked!');
                    loadDynamicVideo();
                });
                
                // 添加键盘支持（按Enter或Space键播放）
                placeholder.setAttribute('tabindex', '0');
                placeholder.setAttribute('role', 'button');
                placeholder.setAttribute('aria-label', 'Play Club Med video');
                
                placeholder.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        loadDynamicVideo();
                    }
                });
                
                console.log('Video player initialized successfully');
            } else {
                console.error('Video placeholder not found, retrying...');
                // 如果元素还没加载，延迟重试
                setTimeout(initVideoPlayer, 100);
            }
        }

        // 多种初始化方式，确保至少有一种能工作
        
        // 方式1: DOMContentLoaded（标准方式）
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initVideoPlayer);
        } else {
            // 如果文档已经加载完成，直接执行
            initVideoPlayer();
        }
        
        // 方式2: 立即执行（备用方案）
        setTimeout(function() {
            if (!document.getElementById('videoPlaceholder').getAttribute('data-initialized')) {
                console.log('Backup initialization triggered');
                initVideoPlayer();
            }
        }, 500);
        
        // 方式3: window.onload（最保险的备用方案）
        window.addEventListener('load', function() {
            if (!document.getElementById('videoPlaceholder').getAttribute('data-initialized')) {
                console.log('Window load initialization triggered');
                initVideoPlayer();
            }
        });
