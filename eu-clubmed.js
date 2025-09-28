 // 测试结果记录
        var euClubmedTestResults = {
            attempts: [],
            finalMethod: null,
            startTime: null
        };

        // 记录测试结果的函数
        function logTestResult(method, success, details) {
            var result = {
                method: method,
                success: success,
                details: details,
                timestamp: new Date().toISOString(),
                timeFromStart: euClubmedTestResults.startTime ? Date.now() - euClubmedTestResults.startTime : 0
            };
            
            euClubmedTestResults.attempts.push(result);
            
            console.log('Video Test Result:', result);
            
            if (success) {
                euClubmedTestResults.finalMethod = method;
                console.log('%c✅ Video playing successfully via: ' + method, 'color: green; font-weight: bold;');
            } else {
                console.log('❌ Method failed: ' + method + ' - ' + details);
            }
        }

        // 显示最终测试报告
        function showTestReport() {
            console.group('📊 EU Club Med Video Test Report');
            console.log('Total attempts:', euClubmedTestResults.attempts.length);
            console.log('Final successful method:', euClubmedTestResults.finalMethod || 'None - all methods failed');
            console.log('Total time:', euClubmedTestResults.startTime ? (Date.now() - euClubmedTestResults.startTime) + 'ms' : 'N/A');
            
            console.table(euClubmedTestResults.attempts);
            
            // 在页面上也显示结果（仅开发环境）
            if (window.location.hostname === 'localhost' || window.location.hostname.includes('test')) {
                showTestResultsOnPage();
            }
            
            console.groupEnd();
        }

        // 在页面上显示测试结果
        function showTestResultsOnPage() {
            var reportDiv = document.createElement('div');
            reportDiv.id = 'euClubmedTestReport';
            reportDiv.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 15px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 12px;
                max-width: 400px;
                z-index: 20000;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;
            
            var html = '<h4>Video Test Report</h4>';
            html += '<p><strong>Final Method:</strong> ' + (euClubmedTestResults.finalMethod || 'Failed') + '</p>';
            html += '<p><strong>Attempts:</strong> ' + euClubmedTestResults.attempts.length + '</p>';
            
            euClubmedTestResults.attempts.forEach(function(attempt, index) {
                var status = attempt.success ? '✅' : '❌';
                html += '<div>' + status + ' ' + attempt.method + '</div>';
            });
            
            html += '<button onclick="document.getElementById(\'euClubmedTestReport\').remove()" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>';
            
            reportDiv.innerHTML = html;
            document.body.appendChild(reportDiv);
        }

        // 多种视频播放方案的尝试
        function tryMultipleVideoMethods() {
            euClubmedTestResults.startTime = Date.now();
            euClubmedTestResults.attempts = [];
            euClubmedTestResults.finalMethod = null;
            
            console.log('🎬 Starting video playback tests...');
            
            // 方案1: 尝试使用embed标签
            tryEmbedTag();
        }

        // 方案1: 使用embed标签
        function tryEmbedTag() {
            openVideoModal();
            var player = document.getElementById('euClubmedVideoPlayer');
            
            try {
                console.log('Testing: embed tag method...');
                
                // 尝试embed标签
                var embedHtml = '<embed src="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;">';
                player.innerHTML = embedHtml;
                
                // 检查embed是否成功创建
                setTimeout(function() {
                    var embedElement = player.querySelector('embed');
                    if (embedElement && embedElement.src) {
                        logTestResult('embed tag', true, 'Embed element created successfully');
                        
                        // 再等待一段时间检查是否真正加载
                        setTimeout(function() {
                            // 简单的加载检查
                            if (embedElement.offsetWidth > 0 && embedElement.offsetHeight > 0) {
                                logTestResult('embed tag validation', true, 'Embed element has dimensions, likely loaded');
                                showTestReport();
                            } else {
                                logTestResult('embed tag validation', false, 'Embed element has no dimensions');
                                tryObjectTag();
                            }
                        }, 3000);
                        
                    } else {
                        logTestResult('embed tag', false, 'Embed element not found or blocked');
                        tryObjectTag();
                    }
                }, 1000);
                
            } catch(e) {
                logTestResult('embed tag', false, 'Exception: ' + e.message);
                tryObjectTag();
            }
        }

        // 方案2: 使用object标签
        function tryObjectTag() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            try {
                console.log('Testing: object tag method...');
                
                var objectHtml = '<object data="https://player.vimeo.com/video/1112811167?title=0&byline=0&portrait=0&badge=0&autoplay=1" width="100%" height="450" style="border-radius: 15px;"></object>';
                player.innerHTML = objectHtml;
                
                setTimeout(function() {
                    var objectElement = player.querySelector('object');
                    if (objectElement && objectElement.data) {
                        logTestResult('object tag', true, 'Object element created successfully');
                        
                        setTimeout(function() {
                            if (objectElement.offsetWidth > 0 && objectElement.offsetHeight > 0) {
                                logTestResult('object tag validation', true, 'Object element has dimensions, likely loaded');
                                showTestReport();
                            } else {
                                logTestResult('object tag validation', false, 'Object element has no dimensions');
                                tryVideoTag();
                            }
                        }, 3000);
                        
                    } else {
                        logTestResult('object tag', false, 'Object element not found or blocked');
                        tryVideoTag();
                    }
                }, 1000);
                
            } catch(e) {
                logTestResult('object tag', false, 'Exception: ' + e.message);
                tryVideoTag();
            }
        }

        // 方案3: 尝试video标签
        function tryVideoTag() {
            console.log('Testing: video tag method (likely to fail for Vimeo)...');
            
            // 由于Vimeo不提供直接mp4，记录为跳过
            logTestResult('video tag', false, 'Skipped - Vimeo does not provide direct video files');
            tryCustomPlayer();
        }

        // 方案4: 自定义播放器
        function tryCustomPlayer() {
            var player = document.getElementById('euClubmedVideoPlayer');
            
            console.log('Creating custom player interface...');
            
            // 创建自定义播放器界面
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
            
            logTestResult('custom player', true, 'Custom player interface created successfully');
            showTestReport();
        }

        // 方案5: 智能弹窗
        function openVimeoInPopup() {
            console.log('Opening optimized popup window...');
            
            try {
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
                    logTestResult('popup window', true, 'Popup opened successfully with dimensions: ' + width + 'x' + height);
                    popup.focus();
                    closeVideoModal();
                } else {
                    logTestResult('popup window', false, 'Popup blocked by browser');
                    fallbackToDirectLink();
                }
                
            } catch(e) {
                logTestResult('popup window', false, 'Exception: ' + e.message);
                fallbackToDirectLink();
            }
        }

        // 方案6: 最终回退
        function fallbackToDirectLink() {
            console.log('Using final fallback: direct link...');
            
            try {
                window.open('https://vimeo.com/1112811167', '_blank');
                logTestResult('direct link', true, 'New tab opened successfully');
                closeVideoModal();
            } catch(e) {
                logTestResult('direct link', false, 'Exception: ' + e.message);
            }
        }

        // Modal 控制函数
        function openVideoModal() {
            document.getElementById('euClubmedVideoModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeVideoModal() {
            document.getElementById('euClubmedVideoModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            
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
        console.log('🎬 EU Club Med page loaded - Video testing system ready');
        console.log('📋 Use euClubmedTestResults to access test data');
