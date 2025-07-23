import os
import sys
# DON\'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.crypto import crypto_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), \'static\'))

# Use environment variable for SECRET_KEY, with a fallback for local development
app.config[\'SECRET_KEY\'] = os.environ.get(\'SECRET_KEY\', \'your_super_secret_fallback_key\')

# Enable CORS for all routes
CORS(app)

app.register_blueprint(user_bp, url_prefix=\'/api\')
app.register_blueprint(crypto_bp, url_prefix=\'/api/crypto\')

# Database configuration
# Try to get DATABASE_URL from environment variables (for Render deployment)
# Fallback to SQLite for local development if DATABASE_URL is not set
app.config[\'SQLALCHEMY_DATABASE_URI\'] = os.environ.get(\'DATABASE_URL\', 
    f\'sqlite:///{os.path.join(os.path.dirname(__file__), \'database\', \'app.db\')}\')
app.config[\'SQLALCHEMY_TRACK_MODIFICATIONS\'] = False

db.init_app(app)

# Create database tables if they don\'t exist
with app.app_context():
    db.create_all()

@app.route(\'/\', defaults={\'path\': \'\'}) # Use environment variable for SECRET_KEY
@app.route(\'/<path:path>\')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return \"Static folder not configured\", 404

    if path != \"\" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, \'index.html\')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, \'index.html\')
        else:
            return \"index.html not found\", 404


