from flask import render_template
from flask import session, jsonify, make_response
import utils.user as user_utils
from flask import Blueprint
main_bp = Blueprint('main', __name__)

# @main_bp.route('/')
# def index():
#     return "直接使用login作为主界面"
#         #render_template('index.html')
