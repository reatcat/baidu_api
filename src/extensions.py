import os

from flask_sqlalchemy import SQLAlchemy

""" 数据库初始化 """
# 初始化扩展，传入程序实例 app
db = SQLAlchemy()

""" 缓存初始化 """

""" 文件路径设置 """
APP_FILE = os.path.join(os.path.dirname(__file__), 'storage')  # 文件存储路径 ./storage/
APP_LOG = os.path.join(os.path.dirname(__file__), 'logs')  # 日志存储路径 ./logs

""" Session 配置 """
# sess = Session()