// ===================================
// パーティクルシステム
// ===================================

// キャンバスの取得と設定
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// キャンバスサイズをウィンドウサイズに合わせる
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// マウス座標を追跡
const mouse = {
    x: null,
    y: null,
    radius: 150  // マウスの影響範囲
};

// マウス移動イベント
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// マウスがウィンドウ外に出たらリセット
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// パーティクルクラス
class Particle {
    constructor() {
        // 初期位置をランダムに設定
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // パーティクルのサイズ（1〜3px）
        this.size = Math.random() * 2 + 1;

        // 基本速度（ゆっくり浮遊）
        this.baseSpeedX = (Math.random() - 0.5) * 0.5;
        this.baseSpeedY = (Math.random() - 0.5) * 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;

        // 色の設定（青〜紫系のグラデーション）
        const colors = [
            'rgba(102, 126, 234, 0.8)',  // 青
            'rgba(118, 75, 162, 0.8)',   // 紫
            'rgba(255, 255, 255, 0.6)',  // 白
            'rgba(147, 112, 219, 0.7)'   // 淡い紫
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    // パーティクルの位置を更新
    update() {
        // マウスとの距離を計算
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // マウスの影響範囲内の場合
            if (distance < mouse.radius) {
                // マウスから離れる方向に力を加える
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.speedX = this.baseSpeedX - Math.cos(angle) * force * 2;
                this.speedY = this.baseSpeedY - Math.sin(angle) * force * 2;
            } else {
                // 影響範囲外では基本速度に戻る
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
            }
        } else {
            // マウスがない場合は基本速度
            this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
            this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
        }

        // 位置を更新
        this.x += this.speedX;
        this.y += this.speedY;

        // 画面端での処理（反対側から出現）
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    // パーティクルを描画
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// パーティクルの配列を作成
const particles = [];

// パーティクルを初期化
function initParticles() {
    particles.length = 0;
    // レスポンシブなパーティクル数（画面幅に応じて最大100個）
    const count = Math.min(100, window.innerWidth / 10);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// ウィンドウリサイズ時にパーティクルを再初期化
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// パーティクル間の線を描画
function connectParticles() {
    const maxDistance = 120;  // 線を描画する最大距離

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // 距離に応じて透明度を調整
                const opacity = 1 - distance / maxDistance;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(102, 126, 234, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// アニメーションループ
function animate() {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 各パーティクルを更新・描画
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // パーティクル間の線を描画
    connectParticles();

    // 次のフレームをリクエスト
    requestAnimationFrame(animate);
}

// アニメーション開始
animate();

// ===================================
// スクロールアニメーション
// ===================================

// Intersection Observerを使用したスクロールアニメーション
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// fade-inクラスを持つ要素を監視
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});
