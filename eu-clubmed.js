// 多种视频播放方案的尝试
        function tryMultipleVideoMethods() {
            // 方案1: 尝试使用embed标签 (有些CMS支持)
            console.log("test-console----");
            alert("------test-console----");
            tryEmbedTag();
        }

        // 方案1: 使用embed标签
        function tryEmbedTag() {
            openVideoModal();
            var player = document.getElementById('euClubmedVideoPlayer');
            
            try {
                // 尝试embed标签
                //player.innerHTML = '<embed src="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;">';
                
                // 等待2秒，如果失败则尝试下一个方案
                setTimeout(function() {
                    if (!player.querySelector('embed')) {
                        alert("embed tag failed, trying object tag");
                        tryObjectTag();
                    }
                }, 2000);
                
            } catch(e) {
                alert("embed tag failed, trying object tag");
                tryObjectTag();
            }
        }

        // 方案2: 使用object标签
        function tryObjectTag() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            try {
                //player.innerHTML = '<object data="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;"></object>';
                
                setTimeout(function() {
                    if (!player.querySelector('object')) {
                        alert("object tag failed, trying video tag");
                        tryVideoTag();
                    }
                }, 2000);
                
            } catch(e) {
                alert("object tag failed, trying video tag");
                tryVideoTag();
            }
        }

        // 方案3: 尝试video标签 (如果有直接视频文件)
        // 方案3: 尝试video标签
        function tryVideoTag() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            // 设置直接视频URL - 请替换为您的实际视频链接
            var directVideoUrl = 'https://player.vimeo.com/progressive_redirect/playback/1112811167/rendition/1080p/file.mp4?loc=external&log_user=0&signature=a4d204cc37b54fe7f3c721934c5ee005f6ba904c514ef654a9440b2296b6d0b4'; 
            
            // 如果没有提供直接视频URL，跳过此方法
            if (directVideoUrl === 'YOUR_DIRECT_VIDEO_URL_HERE') {
                alert("No direct video URL provided, trying custom player");
                tryCustomPlayer();
                return;
            }
            
            try {
                var videoHtml = `
                    <video controls autoplay style="width: 100%; height: 450px; border-radius: 15px; background: #000;">
                        <source src="${directVideoUrl}" type="video/mp4">
                        <source src="${directVideoUrl.replace('.mp4', '.webm')}" type="video/webm">
                        <source src="${directVideoUrl.replace('.mp4', '.ogv')}" type="video/ogg">
                        <p style="color: white; text-align: center; padding: 20px;">
                            Your browser does not support the video tag. 
                            <a href="${directVideoUrl}" style="color: #667eea;">Download the video</a>
                        </p>
                    </video>
                `;
                
                player.innerHTML = videoHtml;
                
                // 如果video标签创建失败，回退到自定义播放器
                setTimeout(function() {
                    var videoElement = player.querySelector('video');
                    if (!videoElement) {
                        alert("video tag failed, trying custom player");
                        tryCustomPlayer();
                    }
                }, 1000);
                
            } catch(e) {
                alert("video tag failed, trying custom player");
                tryCustomPlayer();
            }
        }


        // Modal 控制函数
        function openVideoModal() {
            document.getElementById('euClubmedVideoModal').style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }

        function closeVideoModal() {
            document.getElementById('euClubmedVideoModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // 清空播放器内容
            var player = document.getElementById('euClubmedVideoPlayer');
            if (player) {
                player.innerHTML = '';
            }
        }

        // 点击模态背景关闭
        document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('euClubmedVideoModal');
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeVideoModal();
                    }
                });
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        });

        // 页面加载完成
        console.log('EU Club Med page loaded - Multiple video fallback methods ready');
