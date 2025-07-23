from flask import Blueprint, jsonify, request
import random
import time
from datetime import datetime, timedelta

crypto_bp = Blueprint('crypto', __name__)

# Sample crypto data
CRYPTO_DATA = [
    {"rank": 1, "name": "Bitcoin", "symbol": "BTC", "price": 43250, "change": 2.4, "marketCap": 847000000000, "volume": 28500000000},
    {"rank": 2, "name": "Ethereum", "symbol": "ETH", "price": 2650, "change": -1.2, "marketCap": 318000000000, "volume": 15200000000},
    {"rank": 3, "name": "Tether", "symbol": "USDT", "price": 1.00, "change": 0.1, "marketCap": 96500000000, "volume": 45800000000},
    {"rank": 4, "name": "BNB", "symbol": "BNB", "price": 315, "change": 3.7, "marketCap": 47200000000, "volume": 1800000000},
    {"rank": 5, "name": "Solana", "symbol": "SOL", "price": 98, "change": 5.2, "marketCap": 42800000000, "volume": 2100000000},
    {"rank": 6, "name": "XRP", "symbol": "XRP", "price": 0.52, "change": -0.8, "marketCap": 28900000000, "volume": 1200000000},
    {"rank": 7, "name": "USDC", "symbol": "USDC", "price": 1.00, "change": 0.0, "marketCap": 25400000000, "volume": 5600000000},
    {"rank": 8, "name": "Cardano", "symbol": "ADA", "price": 0.48, "change": 1.9, "marketCap": 16800000000, "volume": 890000000}
]

# Trading signals data
TRADING_SIGNALS = [
    {
        "id": 1,
        "type": "BUY",
        "pair": "BTC/USDT",
        "entry": 43250,
        "target": 45800,
        "stopLoss": 42100,
        "accuracy": 87,
        "time": "2 hours ago",
        "timestamp": int(time.time()) - 7200
    },
    {
        "id": 2,
        "type": "SELL",
        "pair": "ETH/USDT",
        "entry": 2650,
        "target": 2450,
        "stopLoss": 2750,
        "accuracy": 92,
        "time": "4 hours ago",
        "timestamp": int(time.time()) - 14400
    },
    {
        "id": 3,
        "type": "BUY",
        "pair": "SOL/USDT",
        "entry": 98,
        "target": 105,
        "stopLoss": 94,
        "accuracy": 78,
        "time": "6 hours ago",
        "timestamp": int(time.time()) - 21600
    },
    {
        "id": 4,
        "type": "BUY",
        "pair": "ADA/USDT",
        "entry": 0.48,
        "target": 0.52,
        "stopLoss": 0.45,
        "accuracy": 85,
        "time": "8 hours ago",
        "timestamp": int(time.time()) - 28800
    },
    {
        "id": 5,
        "type": "SELL",
        "pair": "XRP/USDT",
        "entry": 0.52,
        "target": 0.48,
        "stopLoss": 0.55,
        "accuracy": 79,
        "time": "10 hours ago",
        "timestamp": int(time.time()) - 36000
    }
]

@crypto_bp.route('/market-data', methods=['GET'])
def get_market_data():
    """Get current market data for top cryptocurrencies"""
    # Add some random price fluctuation to simulate real-time data
    updated_data = []
    for crypto in CRYPTO_DATA:
        updated_crypto = crypto.copy()
        # Add small random price changes (±2%)
        price_change = random.uniform(-0.02, 0.02)
        updated_crypto['price'] = round(crypto['price'] * (1 + price_change), 2)
        
        # Update 24h change slightly
        change_adjustment = random.uniform(-0.5, 0.5)
        updated_crypto['change'] = round(crypto['change'] + change_adjustment, 1)
        
        updated_data.append(updated_crypto)
    
    return jsonify({
        "success": True,
        "data": updated_data,
        "timestamp": int(time.time())
    })

@crypto_bp.route('/market-stats', methods=['GET'])
def get_market_stats():
    """Get overall market statistics"""
    total_market_cap = sum(crypto['marketCap'] for crypto in CRYPTO_DATA)
    total_volume = sum(crypto['volume'] for crypto in CRYPTO_DATA)
    btc_dominance = (CRYPTO_DATA[0]['marketCap'] / total_market_cap) * 100
    
    return jsonify({
        "success": True,
        "data": {
            "marketCap": f"${total_market_cap / 1e12:.1f}T",
            "volume24h": f"${total_volume / 1e9:.1f}B",
            "btcDominance": f"{btc_dominance:.1f}%",
            "marketCapChange": round(random.uniform(-3, 5), 1),
            "volumeChange": round(random.uniform(-2, 8), 1)
        },
        "timestamp": int(time.time())
    })

@crypto_bp.route('/trading-signals', methods=['GET'])
def get_trading_signals():
    """Get latest trading signals"""
    limit = request.args.get('limit', 10, type=int)
    signals = TRADING_SIGNALS[:limit]
    
    return jsonify({
        "success": True,
        "data": signals,
        "count": len(signals),
        "timestamp": int(time.time())
    })

@crypto_bp.route('/chart-data/<symbol>', methods=['GET'])
def get_chart_data(symbol):
    """Get chart data for a specific cryptocurrency"""
    timeframe = request.args.get('timeframe', '1h')
    
    # Generate sample chart data based on timeframe
    if timeframe == '1h':
        data_points = 24
        interval_ms = 3600000  # 1 hour
    elif timeframe == '4h':
        data_points = 48
        interval_ms = 14400000  # 4 hours
    elif timeframe == '1d':
        data_points = 30
        interval_ms = 86400000  # 1 day
    else:  # 1w
        data_points = 52
        interval_ms = 604800000  # 1 week
    
    # Get base price for the symbol
    base_price = 43000  # Default to BTC price
    for crypto in CRYPTO_DATA:
        if crypto['symbol'].lower() == symbol.lower():
            base_price = crypto['price']
            break
    
    # Generate chart data
    chart_data = []
    current_time = int(time.time() * 1000)  # Convert to milliseconds
    current_price = base_price
    
    for i in range(data_points):
        timestamp = current_time - (data_points - i) * interval_ms
        # Add random price movement
        price_change = random.uniform(-0.03, 0.03)  # ±3% change
        current_price *= (1 + price_change)
        
        chart_data.append({
            "timestamp": timestamp,
            "price": round(current_price, 2),
            "volume": random.randint(1000000, 50000000)
        })
    
    return jsonify({
        "success": True,
        "data": {
            "symbol": symbol.upper(),
            "timeframe": timeframe,
            "prices": chart_data
        },
        "timestamp": int(time.time())
    })

@crypto_bp.route('/price/<symbol>', methods=['GET'])
def get_single_price(symbol):
    """Get current price for a specific cryptocurrency"""
    for crypto in CRYPTO_DATA:
        if crypto['symbol'].lower() == symbol.lower():
            # Add small random fluctuation
            price_change = random.uniform(-0.01, 0.01)
            current_price = round(crypto['price'] * (1 + price_change), 2)
            
            return jsonify({
                "success": True,
                "data": {
                    "symbol": crypto['symbol'],
                    "name": crypto['name'],
                    "price": current_price,
                    "change": crypto['change']
                },
                "timestamp": int(time.time())
            })
    
    return jsonify({
        "success": False,
        "error": "Cryptocurrency not found"
    }), 404

@crypto_bp.route('/trending', methods=['GET'])
def get_trending():
    """Get trending cryptocurrencies"""
    # Sort by highest positive change
    trending = sorted(CRYPTO_DATA, key=lambda x: x['change'], reverse=True)[:5]
    
    return jsonify({
        "success": True,
        "data": trending,
        "timestamp": int(time.time())
    })

@crypto_bp.route('/search', methods=['GET'])
def search_crypto():
    """Search for cryptocurrencies"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({
            "success": False,
            "error": "Search query is required"
        }), 400
    
    results = []
    for crypto in CRYPTO_DATA:
        if (query in crypto['name'].lower() or 
            query in crypto['symbol'].lower()):
            results.append(crypto)
    
    return jsonify({
        "success": True,
        "data": results,
        "count": len(results),
        "timestamp": int(time.time())
    })

@crypto_bp.route('/portfolio', methods=['GET', 'POST'])
def portfolio():
    """Handle portfolio operations"""
    if request.method == 'GET':
        # Return sample portfolio data
        portfolio_data = [
            {
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 0.5,
                "avgPrice": 42000,
                "currentPrice": 43250,
                "value": 21625,
                "pnl": 625,
                "pnlPercent": 2.97
            },
            {
                "symbol": "ETH",
                "name": "Ethereum",
                "amount": 5.0,
                "avgPrice": 2500,
                "currentPrice": 2650,
                "value": 13250,
                "pnl": 750,
                "pnlPercent": 6.0
            }
        ]
        
        total_value = sum(item['value'] for item in portfolio_data)
        total_pnl = sum(item['pnl'] for item in portfolio_data)
        
        return jsonify({
            "success": True,
            "data": {
                "holdings": portfolio_data,
                "totalValue": total_value,
                "totalPnl": total_pnl,
                "totalPnlPercent": round((total_pnl / (total_value - total_pnl)) * 100, 2)
            },
            "timestamp": int(time.time())
        })
    
    elif request.method == 'POST':
        # Add new position to portfolio
        data = request.get_json()
        
        required_fields = ['symbol', 'amount', 'price']
        if not all(field in data for field in required_fields):
            return jsonify({
                "success": False,
                "error": "Missing required fields: symbol, amount, price"
            }), 400
        
        return jsonify({
            "success": True,
            "message": "Position added to portfolio",
            "data": data,
            "timestamp": int(time.time())
        })

@crypto_bp.route('/news', methods=['GET'])
def get_crypto_news():
    """Get latest crypto news"""
    sample_news = [
        {
            "id": 1,
            "title": "Bitcoin Reaches New Monthly High as Institutional Adoption Grows",
            "summary": "Bitcoin price surged to $43,250 as major institutions continue to add BTC to their portfolios.",
            "source": "CryptoNews",
            "publishedAt": int(time.time()) - 3600,
            "url": "#",
            "image": "/api/placeholder/400/200"
        },
        {
            "id": 2,
            "title": "Ethereum Network Upgrade Shows Promising Results",
            "summary": "The latest Ethereum upgrade has reduced gas fees by 15% and improved transaction throughput.",
            "source": "BlockchainDaily",
            "publishedAt": int(time.time()) - 7200,
            "url": "#",
            "image": "/api/placeholder/400/200"
        },
        {
            "id": 3,
            "title": "Solana DeFi Ecosystem Continues Rapid Growth",
            "summary": "Total value locked in Solana DeFi protocols reaches new all-time high of $2.1 billion.",
            "source": "DeFiPulse",
            "publishedAt": int(time.time()) - 10800,
            "url": "#",
            "image": "/api/placeholder/400/200"
        }
    ]
    
    return jsonify({
        "success": True,
        "data": sample_news,
        "timestamp": int(time.time())
    })

