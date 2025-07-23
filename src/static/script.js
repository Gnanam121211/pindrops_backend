// Pindrops Website JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupAnimatedCounters();
    setupBackgroundAnimations();
    setupTradingChart();
    loadCryptoData();
    setupSignalCards();
    setupChartTimeframes();
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animated counters
function setupAnimatedCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on value
            let displayValue;
            if (target >= 1000) {
                displayValue = Math.floor(current).toLocaleString();
            } else {
                displayValue = Math.floor(current);
            }
            
            // Add suffix for specific counters
            if (counter.textContent.includes('%')) {
                displayValue += '%';
            } else if (counter.textContent.includes('K')) {
                displayValue = Math.floor(current / 1000) + 'K+';
            }
            
            counter.textContent = displayValue;
        }, 16);
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Enhanced background animations
function setupBackgroundAnimations() {
    createAdvancedCandlestickBackground();
    createFloatingElements();
    createChartGrid();
    createPriceTickers();
    createMarketDepth();
    createVolumeIndicators();
    createPriceWaves();
    createParticleSystem();
    createSentimentIndicators();
}

function createAdvancedCandlestickBackground() {
    const container = document.getElementById('candlestick-background');
    if (!container) return;
    
    // Clear existing candlesticks
    container.innerHTML = '';
    
    // Create more realistic candlestick patterns
    for (let i = 0; i < 35; i++) {
        const candlestick = document.createElement('div');
        const isBullish = Math.random() > 0.5;
        
        candlestick.className = `candlestick-pattern ${isBullish ? 'bullish' : 'bearish'}`;
        candlestick.style.left = Math.random() * 100 + '%';
        candlestick.style.top = Math.random() * 100 + '%';
        candlestick.style.height = (Math.random() * 80 + 40) + 'px';
        candlestick.style.animationDelay = Math.random() * 15 + 's';
        candlestick.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Add glow effect
        if (isBullish) {
            candlestick.classList.add('glow-green');
        } else {
            candlestick.classList.add('glow-red');
        }
        
        container.appendChild(candlestick);
    }
}

function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    // Clear existing elements
    container.innerHTML = '';
    
    const cryptoSymbols = ['BTC', 'ETH', 'SOL', 'ADA', 'DOT', 'LINK', 'UNI', 'AVAX'];
    
    // Create floating orbs
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.width = (Math.random() * 120 + 60) + 'px';
        element.style.height = element.style.width;
        element.style.animationDelay = Math.random() * 15 + 's';
        element.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(element);
    }
    
    // Create floating crypto symbols
    for (let i = 0; i < 8; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-element crypto-symbol';
        symbol.textContent = cryptoSymbols[i];
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.top = Math.random() * 100 + '%';
        symbol.style.width = '40px';
        symbol.style.height = '40px';
        symbol.style.animationDelay = Math.random() * 20 + 's';
        symbol.style.animationDuration = (Math.random() * 15 + 20) + 's';
        container.appendChild(symbol);
    }
}

function createChartGrid() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const grid = document.createElement('div');
    grid.className = 'chart-grid';
    container.appendChild(grid);
}

function createPriceTickers() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const tickers = [
        { symbol: 'BTC', price: '$43,250', change: '+2.4%', isPositive: true },
        { symbol: 'ETH', price: '$2,650', change: '-1.2%', isPositive: false },
        { symbol: 'SOL', price: '$98', change: '+5.2%', isPositive: true },
        { symbol: 'ADA', price: '$0.48', change: '+1.9%', isPositive: true },
        { symbol: 'DOT', price: '$7.23', change: '-0.8%', isPositive: false }
    ];
    
    tickers.forEach((ticker, index) => {
        setTimeout(() => {
            const tickerElement = document.createElement('div');
            tickerElement.className = `price-ticker ${ticker.isPositive ? '' : 'red'}`;
            tickerElement.innerHTML = `${ticker.symbol} ${ticker.price} ${ticker.change}`;
            tickerElement.style.top = (20 + index * 15) + '%';
            tickerElement.style.animationDelay = (index * 5) + 's';
            container.appendChild(tickerElement);
            
            // Remove after animation
            setTimeout(() => {
                if (tickerElement.parentNode) {
                    tickerElement.parentNode.removeChild(tickerElement);
                }
            }, 25000);
        }, index * 5000);
    });
}

function createMarketDepth() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const depth = document.createElement('div');
        depth.className = 'market-depth';
        depth.style.right = (i * 120 + 50) + 'px';
        depth.style.top = Math.random() * 60 + 20 + '%';
        depth.style.animationDelay = Math.random() * 8 + 's';
        depth.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(depth);
    }
}

function createVolumeIndicators() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const volumeBar = document.createElement('div');
        volumeBar.className = 'volume-bar';
        volumeBar.style.left = Math.random() * 100 + '%';
        volumeBar.style.bottom = '0px';
        volumeBar.style.height = (Math.random() * 40 + 20) + 'px';
        volumeBar.style.animationDelay = Math.random() * 6 + 's';
        volumeBar.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(volumeBar);
    }
}

function createPriceWaves() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'price-wave';
        wave.style.left = '-2px';
        wave.style.animationDelay = (i * 10) + 's';
        wave.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(wave);
    }
}

function createParticleSystem() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '0px';
            
            // Random colors for particles
            const colors = [
                'rgba(59, 130, 246, 0.6)',
                'rgba(16, 185, 129, 0.6)',
                'rgba(239, 68, 68, 0.6)',
                'rgba(245, 158, 11, 0.6)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 20000);
        }
    }, 2000);
}

function createSentimentIndicators() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 3; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'sentiment-indicator';
        indicator.style.right = (i * 80 + 20) + 'px';
        indicator.style.top = (i * 30 + 10) + '%';
        indicator.style.animationDelay = (i * 5) + 's';
        indicator.style.opacity = 0.3;
        container.appendChild(indicator);
    }
}

// Trading chart setup
function setupTradingChart() {
    const ctx = document.getElementById('trading-chart');
    if (!ctx) return;
    
    // Generate sample data
    const generateChartData = (timeframe) => {
        const dataPoints = timeframe === '1h' ? 24 : timeframe === '4h' ? 48 : timeframe === '1d' ? 30 : 52;
        const data = [];
        let basePrice = 43000;
        
        for (let i = 0; i < dataPoints; i++) {
            basePrice += (Math.random() - 0.5) * 1000;
            data.push({
                x: new Date(Date.now() - (dataPoints - i) * (timeframe === '1h' ? 3600000 : timeframe === '4h' ? 14400000 : timeframe === '1d' ? 86400000 : 604800000)),
                y: basePrice
            });
        }
        return data;
    };
    
    const chartConfig = {
        type: 'line',
        data: {
            datasets: [{
                label: 'BTC/USDT',
                data: generateChartData('1h'),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };
    
    window.tradingChart = new Chart(ctx, chartConfig);
}

// Chart timeframe switching
function setupChartTimeframes() {
    const timeframeButtons = document.querySelectorAll('.chart-timeframe');
    
    timeframeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            timeframeButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-slate-700', 'text-gray-300');
            });
            
            this.classList.remove('bg-slate-700', 'text-gray-300');
            this.classList.add('bg-blue-600', 'text-white');
            
            // Update chart data
            const timeframe = this.getAttribute('data-timeframe');
            updateChartData(timeframe);
        });
    });
}

function updateChartData(timeframe) {
    if (!window.tradingChart) return;
    
    // Generate new data based on timeframe
    const generateChartData = (tf) => {
        const dataPoints = tf === '1h' ? 24 : tf === '4h' ? 48 : tf === '1d' ? 30 : 52;
        const data = [];
        let basePrice = 43000;
        
        for (let i = 0; i < dataPoints; i++) {
            basePrice += (Math.random() - 0.5) * 1000;
            data.push({
                x: new Date(Date.now() - (dataPoints - i) * (tf === '1h' ? 3600000 : tf === '4h' ? 14400000 : tf === '1d' ? 86400000 : 604800000)),
                y: basePrice
            });
        }
        return data;
    };
    
    window.tradingChart.data.datasets[0].data = generateChartData(timeframe);
    window.tradingChart.update();
}

// Load cryptocurrency data
async function loadCryptoData() {
    try {
        // Fetch market data from API
        const marketResponse = await fetch('/api/crypto/market-data');
        const marketData = await marketResponse.json();
        
        if (marketData.success) {
            updateCryptoTable(marketData.data);
        }
        
        // Fetch market stats from API
        const statsResponse = await fetch('/api/crypto/market-stats');
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
            updateMarketStats(statsData.data);
        }
    } catch (error) {
        console.error('Error loading crypto data:', error);
        // Fallback to sample data if API fails
        const cryptoData = [
            { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 43250, change: 2.4, marketCap: 847000000000, volume: 28500000000 },
            { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2650, change: -1.2, marketCap: 318000000000, volume: 15200000000 },
            { rank: 3, name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.1, marketCap: 96500000000, volume: 45800000000 },
            { rank: 4, name: 'BNB', symbol: 'BNB', price: 315, change: 3.7, marketCap: 47200000000, volume: 1800000000 },
            { rank: 5, name: 'Solana', symbol: 'SOL', price: 98, change: 5.2, marketCap: 42800000000, volume: 2100000000 },
            { rank: 6, name: 'XRP', symbol: 'XRP', price: 0.52, change: -0.8, marketCap: 28900000000, volume: 1200000000 },
            { rank: 7, name: 'USDC', symbol: 'USDC', price: 1.00, change: 0.0, marketCap: 25400000000, volume: 5600000000 },
            { rank: 8, name: 'Cardano', symbol: 'ADA', price: 0.48, change: 1.9, marketCap: 16800000000, volume: 890000000 }
        ];
        updateCryptoTable(cryptoData);
        updateMarketStats();
    }
}

function updateCryptoTable(data) {
    const tableBody = document.getElementById('crypto-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = data.map(crypto => `
        <tr class="hover:bg-slate-700/50 transition-colors">
            <td class="p-4 text-gray-400">${crypto.rank}</td>
            <td class="p-4">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ${crypto.symbol.charAt(0)}
                    </div>
                    <div>
                        <div class="font-semibold text-white">${crypto.name}</div>
                        <div class="text-gray-400 text-sm">${crypto.symbol}</div>
                    </div>
                </div>
            </td>
            <td class="p-4 font-semibold text-white">$${crypto.price.toLocaleString()}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-sm font-semibold ${crypto.change >= 0 ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'}">
                    ${crypto.change >= 0 ? '+' : ''}${crypto.change}%
                </span>
            </td>
            <td class="p-4 text-gray-300">$${(crypto.marketCap / 1000000000).toFixed(1)}B</td>
            <td class="p-4 text-gray-300">$${(crypto.volume / 1000000000).toFixed(1)}B</td>
        </tr>
    `).join('');
}

function updateMarketStats(stats) {
    // Update market stats with data from API or default values
    const defaultStats = {
        'market-cap': '$2.1T',
        'volume-24h': '$89.2B',
        'btc-dominance': '54.2%'
    };
    
    const statsToUpdate = stats || defaultStats;
    
    if (stats) {
        // Use API data
        const marketCapElement = document.getElementById('market-cap');
        const volumeElement = document.getElementById('volume-24h');
        const dominanceElement = document.getElementById('btc-dominance');
        
        if (marketCapElement) marketCapElement.textContent = stats.marketCap;
        if (volumeElement) volumeElement.textContent = stats.volume24h;
        if (dominanceElement) dominanceElement.textContent = stats.btcDominance;
    } else {
        // Use default values
        Object.entries(defaultStats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }
}

// Setup signal cards with dynamic data
function setupSignalCards() {
    const signalsData = [
        {
            type: 'BUY',
            pair: 'BTC/USDT',
            entry: 43250,
            target: 45800,
            stopLoss: 42100,
            accuracy: 87,
            time: '2 hours ago'
        },
        {
            type: 'SELL',
            pair: 'ETH/USDT',
            entry: 2650,
            target: 2450,
            stopLoss: 2750,
            accuracy: 92,
            time: '4 hours ago'
        },
        {
            type: 'BUY',
            pair: 'SOL/USDT',
            entry: 98,
            target: 105,
            stopLoss: 94,
            accuracy: 78,
            time: '6 hours ago'
        }
    ];
    
    // Add more signal cards dynamically
    const signalsContainer = document.querySelector('#signals .grid');
    if (signalsContainer && signalsData.length > 1) {
        signalsData.slice(1).forEach(signal => {
            const signalCard = createSignalCard(signal);
            signalsContainer.appendChild(signalCard);
        });
    }
}

function createSignalCard(signal) {
    const card = document.createElement('div');
    card.className = 'signal-card bg-slate-800 rounded-xl border border-slate-700 p-6';
    
    card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 rounded-full text-sm font-semibold ${
                signal.type === 'BUY' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
            }">${signal.type}</span>
            <span class="text-gray-400 text-sm">${signal.time}</span>
        </div>
        <h3 class="text-xl font-bold mb-2">${signal.pair}</h3>
        <div class="space-y-2 text-sm">
            <div class="flex justify-between">
                <span class="text-gray-400">Entry:</span>
                <span class="text-white">$${signal.entry.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-400">Target:</span>
                <span class="${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}">$${signal.target.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-400">Stop Loss:</span>
                <span class="${signal.type === 'BUY' ? 'text-red-400' : 'text-green-400'}">$${signal.stopLoss.toLocaleString()}</span>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-700">
            <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">Accuracy</span>
                <span class="text-green-400 font-semibold">${signal.accuracy}%</span>
            </div>
        </div>
    `;
    
    return card;
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Real-time price updates simulation
function startPriceUpdates() {
    setInterval(() => {
        updateRandomPrices();
    }, 5000); // Update every 5 seconds
}

function updateRandomPrices() {
    const priceElements = document.querySelectorAll('[data-price]');
    priceElements.forEach(element => {
        const currentPrice = parseFloat(element.textContent.replace(/[$,]/g, ''));
        const change = (Math.random() - 0.5) * 0.02; // ±1% change
        const newPrice = currentPrice * (1 + change);
        
        element.textContent = '$' + newPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        // Add visual feedback for price changes
        element.classList.add(change > 0 ? 'price-up' : 'price-down');
        setTimeout(() => {
            element.classList.remove('price-up', 'price-down');
        }, 1000);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page loaded in', performance.now(), 'ms');
});

// Initialize scroll animations and price updates after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupScrollAnimations();
        startPriceUpdates();
    }, 1000);
});


// Enhanced signal cards with anima// Setup signal cards with dynamic data
async function setupSignalCards() {
    try {
        // Fetch trading signals from API
        const response = await fetch('/api/crypto/trading-signals?limit=5');
        const signalsData = await response.json();
        
        if (signalsData.success && signalsData.data.length > 1) {
            // Add more signal cards dynamically
            const signalsContainer = document.querySelector('#signals .grid');
            if (signalsContainer) {
                // Skip the first signal as it's already in HTML
                signalsData.data.slice(1).forEach((signal, index) => {
                    setTimeout(() => {
                        const signalCard = createSignalCard(signal);
                        signalCard.style.opacity = '0';
                        signalCard.style.transform = 'translateY(30px)';
                        signalsContainer.appendChild(signalCard);
                        
                        // Animate in
                        setTimeout(() => {
                            signalCard.style.transition = 'all 0.6s ease';
                            signalCard.style.opacity = '1';
                            signalCard.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 500);
                });
            }
        }
    } catch (error) {
        console.error('Error loading trading signals:', error);
        // Fallback to default behavior
        const signalsData = [
            {
                type: 'BUY',
                pair: 'BTC/USDT',
                entry: 43250,
                target: 45800,
                stopLoss: 42100,
                accuracy: 87,
                time: '2 hours ago'
            },
            {
                type: 'SELL',
                pair: 'ETH/USDT',
                entry: 2650,
                target: 2450,
                stopLoss: 2750,
                accuracy: 92,
                time: '4 hours ago'
            },
            {
                type: 'BUY',
                pair: 'SOL/USDT',
                entry: 98,
                target: 105,
                stopLoss: 94,
                accuracy: 78,
                time: '6 hours ago'
            }
        ];
        
        // Add more signal cards dynamically with enhanced animations
        const signalsContainer = document.querySelector('#signals .grid');
        if (signalsContainer && signalsData.length > 1) {
            signalsData.slice(1).forEach((signal, index) => {
                setTimeout(() => {
                    const signalCard = createSignalCard(signal);
                    signalCard.style.opacity = '0';
                    signalCard.style.transform = 'translateY(30px)';
                    signalsContainer.appendChild(signalCard);
                    
                    // Animate in
                    setTimeout(() => {
                        signalCard.style.transition = 'all 0.6s ease';
                        signalCard.style.opacity = '1';
                        signalCard.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 500);
            });
        }
    }
    
    // Add pulse animation to existing signal cards
    const existingCards = document.querySelectorAll('.signal-card');
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('signal-pulse');
        }, index * 200);
    });
}
function createEnhancedSignalCard(signal) {
    const card = document.createElement('div');
    card.className = 'signal-card bg-slate-800 rounded-xl border border-slate-700 p-6 signal-pulse';
    
    card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 rounded-full text-sm font-semibold ${
                signal.type === 'BUY' 
                    ? 'bg-green-500/20 text-green-400 glow-green' 
                    : 'bg-red-500/20 text-red-400 glow-red'
            }">${signal.type}</span>
            <span class="text-gray-400 text-sm">${signal.time}</span>
        </div>
        <h3 class="text-xl font-bold mb-2">${signal.pair}</h3>
        <div class="space-y-2 text-sm">
            <div class="flex justify-between">
                <span class="text-gray-400">Entry:</span>
                <span class="text-white">$${signal.entry.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-400">Target:</span>
                <span class="${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}">$${signal.target.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-400">Stop Loss:</span>
                <span class="${signal.type === 'BUY' ? 'text-red-400' : 'text-green-400'}">$${signal.stopLoss.toLocaleString()}</span>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-700">
            <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">Accuracy</span>
                <span class="text-green-400 font-semibold">${signal.accuracy}%</span>
            </div>
            <div class="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div class="bg-green-400 h-2 rounded-full transition-all duration-1000" style="width: ${signal.accuracy}%"></div>
            </div>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.2)';
    });
    
    return card;
}

// Enhanced price updates with visual feedback
function updateRandomPrices() {
    const priceElements = document.querySelectorAll('[data-price]');
    priceElements.forEach(element => {
        const currentPrice = parseFloat(element.textContent.replace(/[$,]/g, ''));
        const change = (Math.random() - 0.5) * 0.02; // ±1% change
        const newPrice = currentPrice * (1 + change);
        
        element.textContent = '$' + newPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        // Enhanced visual feedback for price changes
        element.style.transition = 'all 0.3s ease';
        if (change > 0) {
            element.classList.add('price-up');
            element.style.transform = 'scale(1.1)';
            element.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.6)';
        } else {
            element.classList.add('price-down');
            element.style.transform = 'scale(1.1)';
            element.style.textShadow = '0 0 10px rgba(239, 68, 68, 0.6)';
        }
        
        setTimeout(() => {
            element.classList.remove('price-up', 'price-down');
            element.style.transform = 'scale(1)';
            element.style.textShadow = 'none';
        }, 1000);
    });
}

// Enhanced scroll animations with stagger effect
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.filter = 'blur(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.filter = 'blur(5px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease';
        observer.observe(el);
    });
}

// Dynamic background intensity based on market activity
function adjustBackgroundIntensity() {
    const container = document.getElementById('candlestick-background');
    if (!container) return;
    
    // Simulate market volatility
    const volatility = Math.random();
    const intensity = volatility > 0.7 ? 'high' : volatility > 0.4 ? 'medium' : 'low';
    
    container.setAttribute('data-intensity', intensity);
    
    const candlesticks = container.querySelectorAll('.candlestick-pattern');
    candlesticks.forEach(candlestick => {
        switch(intensity) {
            case 'high':
                candlestick.style.animationDuration = '8s';
                candlestick.style.opacity = '0.25';
                break;
            case 'medium':
                candlestick.style.animationDuration = '12s';
                candlestick.style.opacity = '0.18';
                break;
            case 'low':
                candlestick.style.animationDuration = '16s';
                candlestick.style.opacity = '0.12';
                break;
        }
    });
}

// Refresh background animations periodically
function startBackgroundRefresh() {
    setInterval(() => {
        adjustBackgroundIntensity();
    }, 30000); // Every 30 seconds
    
    setInterval(() => {
        createPriceTickers();
    }, 60000); // Refresh tickers every minute
}

// Initialize enhanced animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupScrollAnimations();
        startPriceUpdates();
        startBackgroundRefresh();
    }, 1000);
});


// Additional advanced background animations
function createTradingLines() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    // Horizontal trading lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'trading-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = '-100px';
        line.style.width = '200px';
        line.style.animationDelay = (i * 2) + 's';
        container.appendChild(line);
    }
    
    // Diagonal trading lines
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.className = 'trading-line diagonal';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.width = '150px';
        line.style.animationDelay = (i * 4) + 's';
        container.appendChild(line);
    }
    
    // Vertical trading lines
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = 'trading-line vertical';
        line.style.left = (i * 25 + 10) + '%';
        line.style.top = '0';
        line.style.animationDelay = (i * 3) + 's';
        container.appendChild(line);
    }
}

function createGeometricShapes() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const shapes = ['triangle', 'diamond', 'hexagon'];
    
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.className = `geometric-shape ${shapeType}`;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 15 + 's';
        shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(shape);
    }
}

function createDigitalRain() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const characters = '01010110100101001010110010101001';
    
    setInterval(() => {
        for (let i = 0; i < 8; i++) {
            const rain = document.createElement('div');
            rain.className = 'digital-rain';
            rain.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
            rain.style.left = Math.random() * 100 + '%';
            rain.style.top = '-20px';
            rain.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(rain);
            
            setTimeout(() => {
                if (rain.parentNode) {
                    rain.parentNode.removeChild(rain);
                }
            }, 15000);
        }
    }, 1000);
}

function createNetworkNodes() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = x + '%';
        node.style.top = y + '%';
        node.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(node);
        nodes.push({ element: node, x: x, y: y });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 30) { // Only connect nearby nodes
                const connection = document.createElement('div');
                connection.className = 'network-connection';
                
                const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x);
                const length = distance * (window.innerWidth / 100);
                
                connection.style.left = nodes[i].x + '%';
                connection.style.top = nodes[i].y + '%';
                connection.style.width = length + 'px';
                connection.style.transform = `rotate(${angle}rad)`;
                connection.style.animationDelay = Math.random() * 6 + 's';
                
                container.appendChild(connection);
            }
        }
    }
}

function createHologramGrids() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 4; i++) {
        const grid = document.createElement('div');
        grid.className = 'hologram-grid';
        grid.style.left = Math.random() * 80 + '%';
        grid.style.top = Math.random() * 80 + '%';
        grid.style.animationDelay = (i * 3) + 's';
        container.appendChild(grid);
    }
}

function createDataStreams() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    setInterval(() => {
        // Regular data streams
        for (let i = 0; i < 5; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.left = Math.random() * 100 + '%';
            stream.style.top = '100vh';
            stream.style.animationDelay = (i * 0.5) + 's';
            container.appendChild(stream);
            
            setTimeout(() => {
                if (stream.parentNode) {
                    stream.parentNode.removeChild(stream);
                }
            }, 8000);
        }
        
        // Binary data streams
        for (let i = 0; i < 3; i++) {
            const binary = document.createElement('div');
            binary.className = 'data-stream binary';
            binary.textContent = Math.random().toString(2).substr(2, 8);
            binary.style.left = Math.random() * 100 + '%';
            binary.style.top = '100vh';
            binary.style.animationDelay = (i * 1) + 's';
            container.appendChild(binary);
            
            setTimeout(() => {
                if (binary.parentNode) {
                    binary.parentNode.removeChild(binary);
                }
            }, 12000);
        }
    }, 2000);
}

function createEnergyOrbs() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    // Regular orbs
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.className = 'energy-orb';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(orb);
    }
    
    // Large orbs
    for (let i = 0; i < 3; i++) {
        const largeOrb = document.createElement('div');
        largeOrb.className = 'energy-orb large';
        largeOrb.style.left = Math.random() * 80 + '%';
        largeOrb.style.top = Math.random() * 80 + '%';
        largeOrb.style.animationDelay = (i * 3) + 's';
        container.appendChild(largeOrb);
    }
}

function createCircuitPatterns() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 6; i++) {
        const circuit = document.createElement('div');
        circuit.className = 'circuit-pattern';
        circuit.style.left = Math.random() * 90 + '%';
        circuit.style.top = Math.random() * 90 + '%';
        circuit.style.animationDelay = (i * 2) + 's';
        circuit.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(circuit);
    }
}

function createWaveLayers() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 1; i <= 3; i++) {
        const wave = document.createElement('div');
        wave.className = `wave-layer wave${i}`;
        wave.style.top = (20 + i * 25) + '%';
        wave.style.left = '-50%';
        container.appendChild(wave);
    }
}

function createGlitchElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const glitchTexts = ['ERROR', 'LOADING...', '404', 'SYSTEM', 'DATA', 'CRYPTO'];
    
    setInterval(() => {
        const glitch = document.createElement('div');
        glitch.className = 'glitch-element';
        glitch.textContent = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
        glitch.style.left = Math.random() * 100 + '%';
        glitch.style.top = Math.random() * 100 + '%';
        glitch.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(glitch);
        
        setTimeout(() => {
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }, 3000);
    }, 5000);
}

// Enhanced background setup with all new animations
function setupAdvancedBackgroundAnimations() {
    createAdvancedCandlestickBackground();
    createFloatingElements();
    createChartGrid();
    createPriceTickers();
    createMarketDepth();
    createVolumeIndicators();
    createPriceWaves();
    createParticleSystem();
    createSentimentIndicators();
    
    // New advanced animations
    createTradingLines();
    createGeometricShapes();
    createDigitalRain();
    createNetworkNodes();
    createHologramGrids();
    createDataStreams();
    createEnergyOrbs();
    createCircuitPatterns();
    createWaveLayers();
    createGlitchElements();
}

// Update the main setup function
function setupBackgroundAnimations() {
    setupAdvancedBackgroundAnimations();
}

// Add performance monitoring
function monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Reduce animations if FPS is too low
            if (fps < 30) {
                const container = document.getElementById('floating-elements');
                if (container) {
                    const elements = container.children;
                    for (let i = elements.length - 1; i >= 0; i -= 2) {
                        if (elements[i] && elements[i].classList.contains('particle')) {
                            elements[i].remove();
                        }
                    }
                }
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

// Start performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        monitorPerformance();
    }, 2000);
});

