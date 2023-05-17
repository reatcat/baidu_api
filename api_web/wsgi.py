
from routes import main_bp
from cvparser.blueprints.user import user_bp
from flask import Flask
app = Flask(__name__)
app.register_blueprint(main_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run()
