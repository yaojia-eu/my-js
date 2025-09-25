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
                player.innerHTML = '<embed src="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;">';
                
                // 等待2秒，如果失败则尝试下一个方案
                setTimeout(function() {
                    if (!player.querySelector('embed')) {
                        tryObjectTag();
                    }
                }, 2000);
                
            } catch(e) {
                tryObjectTag();
            }
        }

        // 方案2: 使用object标签
        function tryObjectTag() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            try {
                player.innerHTML = '<object data="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;"></object>';
                
                setTimeout(function() {
                    if (!player.querySelector('object')) {
                        tryVideoTag();
                    }
                }, 2000);
                
            } catch(e) {
                tryVideoTag();
            }
        }

        // 方案3: 尝试video标签 (如果有直接视频文件)
        function tryVideoTag() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            // 注意: Vimeo通常不提供直接的mp4链接，这个方案可能不可用
            // 但如果您有视频文件的直接链接，可以这样使用:
            /*
            player.innerHTML = `
                <video controls autoplay style="width: 100%; height: 450px; border-radius: 15px;">
                    <source src="your-video-file.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            */
            
            // 由于没有直接视频文件，回退到创建自定义播放器
            tryCustomPlayer();
        }

        // 方案4: 自定义播放器 (使用Vimeo API)
        function tryCustomPlayer() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            // 创建一个自定义的"播放器"界面
            player.innerHTML = `
                <div style="position: relative; width: 100%; height: 450px; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white;">
                    <div style="text-align: center;">
                        <div style="font-size: 60px; margin-bottom: 20px;">▶</div>
                        <h3 style="margin-bottom: 10px;">Club Med Experience Video</h3>
                        <p style="margin-bottom: 20px; opacity: 0.8;">Due to security restrictions, the video cannot be embedded directly.</p>
                        <button onclick="openVimeoInPopup()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px;">Watch on Vimeo</button>
                    </div>
                </div>
            `;
        }

        // 方案5: 智能弹窗 (优化的新窗口体验)
        function openVimeoInPopup() {
            var width = Math.min(1000, window.innerWidth * 0.9);
            var height = Math.min(600, window.innerHeight * 0.8);
            var left = (window.innerWidth - width) / 2;
            var top = (window.innerHeight - height) / 2;
            
            var popup = window.open(
                'https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1',
                'clubMedVideo',
                'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no'
            );
            
            if (popup) {
                popup.focus();
                closeVideoModal();
            } else {
                // 如果弹窗被阻止，直接在新标签页打开
                window.open('https://vimeo.com/1112811167', '_blank');
                closeVideoModal();
            }
        }

        // 方案6: 最终回退 - 直接链接
        function fallbackToDirectLink() {
            closeVideoModal();
            window.open('https://vimeo.com/1112811167', '_blank');
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
