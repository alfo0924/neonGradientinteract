document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const rippleContainer = document.querySelector('.ripple-container');
    const background = document.querySelector('.background');
    let clickCount = 0;

    // 增強背景效果
    function enhanceBackground() {
        const opacity = Math.min(0.4 + (clickCount * 0.02), 0.8);
        background.style.opacity = opacity;
    }

    // 創建水波紋效果
    function createRippleEffect(x, y) {
        // 主水波紋
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');

                // 隨機選擇顏色類別
                const colorClass = 'ripple-' + (Math.floor(Math.random() * 4) + 1);
                ripple.classList.add('ripple', colorClass);

                // 根據點擊次數調整大小
                const baseSize = 300 + (clickCount * 5);
                const size = baseSize + (i * 100);
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                rippleContainer.appendChild(ripple);

                // 動畫結束後移除元素
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }, i * 200);
        }

        // 創建發光效果
        createGlowEffect(x, y);

        // 如果點擊次數很多，創建額外的水波紋
        if (clickCount > 5) {
            const extraRipples = Math.min(Math.floor(clickCount / 5), 3);

            for (let i = 0; i < extraRipples; i++) {
                // 在點擊位置周圍隨機創建額外的水波紋
                const offsetX = (Math.random() - 0.5) * 200;
                const offsetY = (Math.random() - 0.5) * 200;

                setTimeout(() => {
                    createGlowEffect(x + offsetX, y + offsetY);
                }, i * 150);
            }
        }
    }

    // 創建發光效果
    function createGlowEffect(x, y) {
        const glow = document.createElement('div');
        const colorNum = Math.floor(Math.random() * 4) + 1;
        let glowColor;

        switch(colorNum) {
            case 1: glowColor = 'rgba(255, 0, 204, 0.7)'; break;
            case 2: glowColor = 'rgba(51, 51, 255, 0.7)'; break;
            case 3: glowColor = 'rgba(0, 255, 204, 0.7)'; break;
            case 4: glowColor = 'rgba(255, 51, 119, 0.7)'; break;
        }

        glow.classList.add('glow');

        const size = 100 + (clickCount * 3);
        glow.style.width = size + 'px';
        glow.style.height = size + 'px';
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.backgroundColor = glowColor;

        rippleContainer.appendChild(glow);

        // 動畫結束後移除元素
        setTimeout(() => {
            glow.remove();
        }, 3000);
    }

    // 點擊事件處理
    container.addEventListener('click', function(e) {
        clickCount++;

        // 獲取相對於容器的點擊位置
        const x = e.clientX;
        const y = e.clientY;

        createRippleEffect(x, y);
        enhanceBackground();
    });

    // 觸摸事件處理（移動設備支援）
    container.addEventListener('touchstart', function(e) {
        e.preventDefault();
        clickCount++;

        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        createRippleEffect(x, y);
        enhanceBackground();
    });

    // 初始化一些隨機的水波紋，增加視覺效果
    function initRandomRipples() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createRippleEffect(x, y);
            }, i * 1000);
        }
    }

    // 頁面載入時初始化一些水波紋
    initRandomRipples();
});
