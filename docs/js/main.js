/*
 * 奇绩前沿信号 - 主交互脚本
 * 提供基础交互功能：占位链接提示、平滑滚动、移动端优化
 */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 奇绩前沿信号网站加载完成');

    // 初始化所有功能
    initComingSoonNotification();
    initSmoothScrolling();
    initMobileOptimizations();
    initAnalytics();
    initLanguageSwitcher();
    initAudioPlayer();
    initImagePreview();
});

/**
 * 占位链接提示功能
 * 为标记为"即将开放"的产品显示提示
 */
function initComingSoonNotification() {
    const comingSoonCards = document.querySelectorAll('.product-card[data-status="coming-soon"]');

    comingSoonCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonNotification(this);
        });
    });
}

/**
 * 显示"即将开放"通知
 * @param {Element} card - 被点击的产品卡片
 */
function showComingSoonNotification(card) {
    const title = card.querySelector('.product-title').textContent;

    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'coming-soon-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">🚀</div>
            <h4 class="notification-title">${title}</h4>
            <p class="notification-message">即将开放，敬请期待</p>
            <button class="notification-close">确定</button>
        </div>
    `;

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        background-color: #FFFFFF;
        border-radius: 12px;
        padding: 32px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 48px;
        margin-bottom: 16px;
    `;

    const notificationTitle = notification.querySelector('.notification-title');
    notificationTitle.style.cssText = `
        font-size: 20px;
        font-weight: 600;
        color: #1A1A1A;
        margin: 0 0 8px 0;
    `;

    const message = notification.querySelector('.notification-message');
    message.style.cssText = `
        font-size: 16px;
        color: #555555;
        margin: 0 0 24px 0;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background-color: #0052FF;
        color: #FFFFFF;
        border: none;
        border-radius: 6px;
        padding: 10px 24px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease;
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 动画显示
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        content.style.transform = 'scale(1)';
    });

    // 关闭功能
    const closeNotification = () => {
        notification.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            closeNotification();
        }
    });

    // 按 ESC 关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeNotification();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // 鼠标悬停效果
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = '#0041CC';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = '#0052FF';
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScrolling() {
    // 为所有内部锚点链接添加平滑滚动
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 移动端优化
 */
function initMobileOptimizations() {
    // 防止移动端双击缩放（保持页面缩放功能）
    let lastTouchTime = 0;

    document.addEventListener('touchstart', function(e) {
        const now = Date.now();
        const timeSince = now - lastTouchTime;

        if (timeSince < 500 && timeSince > 0) {
            // 双击行为，但不阻止，让浏览器处理
            const target = e.target.closest('.product-card');
            if (target && target.hasAttribute('data-status')) {
                e.preventDefault();
                target.click();
            }
        }

        lastTouchTime = now;
    });

    // 移动端横屏检测
    window.addEventListener('orientationchange', function() {
        // 延迟执行以确保视口更新
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    });
}

/**
 * 简单的访问统计（可选）
 */
function initAnalytics() {
    // 记录页面访问
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`📊 访问页面: ${currentPage}`);

    // 记录页面停留时间
    let startTime = Date.now();

    window.addEventListener('beforeunload', function() {
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`⏱️ 页面停留时间: ${duration}秒`);
    });

    // 记录用户交互
    document.addEventListener('click', function(e) {
        const target = e.target;
        let elementInfo = target.tagName.toLowerCase();

        if (target.className) {
            elementInfo += `.${target.className.split(' ')[0]}`;
        }

        if (target.id) {
            elementInfo += `#${target.id}`;
        }

        console.log(`🔗 用户点击: ${elementInfo}`);
    });
}

/**
 * 工具函数：判断是否为移动设备
 */
function isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 工具函数：节流
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：防抖
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 语言切换功能
 * 支持中英文切换并记住用户偏好
 */
function initLanguageSwitcher() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();

    // 检测当前语言（根据文件名）
    const isEnglish = currentPage.includes('-en.html');

    // 保存语言偏好到 localStorage
    if (isEnglish) {
        localStorage.setItem('preferredLanguage', 'en');
    } else {
        localStorage.setItem('preferredLanguage', 'zh');
    }

    // 为语言切换按钮添加点击事件（可选，因为已经是链接）
    const langButtons = document.querySelectorAll('.language-switcher .lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const targetLang = this.textContent.trim();
            const newLang = targetLang === 'EN' ? 'en' : 'zh';

            // 保存新的语言偏好
            localStorage.setItem('preferredLanguage', newLang);

            console.log(`🌐 切换语言: ${newLang === 'zh' ? '中文' : 'English'}`);
        });
    });

    // 检查是否需要根据用户偏好自动跳转
    // 注意：这个功能是可选的，如果用户明确访问某个语言版本，我们不自动跳转
    // 只在访问 index.html（不带语言后缀）时才考虑自动跳转
}

/**
 * 修复后的图片预览功能
 * 使用 JS 动态创建悬浮窗，解决 CSS 路径和 z-index 问题
 */
function initImagePreview() {
    // 1. 创建预览容器（如果不存在）
    let tooltip = document.getElementById('preview-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'preview-tooltip';
        // 创建内部图片元素
        const img = document.createElement('img');
        tooltip.appendChild(img);
        document.body.appendChild(tooltip);
    }

    const tooltipImg = tooltip.querySelector('img');
    const buttons = document.querySelectorAll('.btn-with-preview');

    buttons.forEach(btn => {
        // 鼠标移入
        btn.addEventListener('mouseenter', function(e) {
            const imagePath = this.getAttribute('data-preview');
            if (imagePath) {
                // 图片路径处理：确保正确的相对路径
                tooltipImg.src = imagePath;
                tooltip.style.display = 'block';

                // 添加淡入动画类
                requestAnimationFrame(() => {
                    tooltip.classList.add('show');
                });
            }
        });

        // 鼠标移动（跟随）
        btn.addEventListener('mousemove', function(e) {
            // 获取鼠标位置
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // 获取tooltip实际尺寸
            const tooltipRect = tooltip.getBoundingClientRect();
            const tooltipWidth = tooltipRect.width || 400;
            const tooltipHeight = tooltipRect.height || 300;

            // 设置偏移量
            const offsetX = 20;
            const offsetY = 20;

            // 计算初始位置（鼠标右下方）
            let left = mouseX + offsetX;
            let top = mouseY + offsetY;

            // 边界检测：防止溢出右侧
            if (left + tooltipWidth > window.innerWidth) {
                left = mouseX - tooltipWidth - offsetX;
            }

            // 边界检测：防止溢出底部
            if (top + tooltipHeight > window.innerHeight) {
                top = mouseY - tooltipHeight - offsetY;
            }

            // 边界检测：防止溢出左侧
            if (left < 0) {
                left = offsetX;
            }

            // 边界检测：防止溢出顶部
            if (top < 0) {
                top = offsetY;
            }

            // 应用位置
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        });

        // 鼠标移出
        btn.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
            // 延迟隐藏，等待淡出动画完成
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 200);
        });
    });
}

/**
 * 获取当前页面对应的另一种语言版本的URL
 * @param {string} currentPage - 当前页面文件名
 * @param {boolean} toEnglish - 是否转为英文版本
 * @returns {string} - 对应的另一种语言的页面URL
 */
function getOtherLanguageUrl(currentPage, toEnglish) {
    if (toEnglish) {
        // 中文转英文
        return currentPage.replace('.html', '-en.html');
    } else {
        // 英文转中文
        return currentPage.replace('-en.html', '.html');
    }
}

/**
 * 音频播放器控制
 * 自定义播放/暂停按钮控制
 */
function initAudioPlayer() {
    const customPlayButton = document.getElementById('customPlayButton');
    const audioPlayer = document.getElementById('audioPlayer');

    // 如果页面不存在音频播放器元素，直接返回
    if (!customPlayButton || !audioPlayer) {
        return;
    }

    // 播放/暂停按钮点击事件
    customPlayButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            customPlayButton.classList.add('playing');
        } else {
            audioPlayer.pause();
            customPlayButton.classList.remove('playing');
        }
    });

    // 监听音频播放事件
    audioPlayer.addEventListener('play', function() {
        customPlayButton.classList.add('playing');
    });

    // 监听音频暂停事件
    audioPlayer.addEventListener('pause', function() {
        customPlayButton.classList.remove('playing');
    });

    // 监听音频结束事件
    audioPlayer.addEventListener('ended', function() {
        customPlayButton.classList.remove('playing');
    });

    console.log('🎵 音频播放器初始化完成');
}

// 导出函数（如果需要在其他脚本中使用）
window.MiraclePlusSignal = {
    isMobile,
    throttle,
    debounce,
    showComingSoonNotification,
    getOtherLanguageUrl
};