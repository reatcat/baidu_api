import os
import string
import random
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from cvparser.extensions import db
from cvparser.extensions import APP_FILE


class User(db.Model, UserMixin):
    """用户

    Attributes:
        id (db.Interger): 自增主键
        username (db.String): 用户名（非空，不可重复）
        psw_hash (db.String): 密码散列值（非空）
        email (db.String, optional): 邮箱地址
        userspace (db.String): 用户空间路径（非空，不可重复）

    Methods:
        set_password(str): 设置密码
        validate_password(str) -> bool: 验证密码
        set_email(str): 设置邮箱地址
        set_userspace(): 设置用户空间路径
    """
    id = db.Column(db.Integer, primary_key=True)  # 主键
    username = db.Column(db.String(30), nullable=False, unique=True)  # 用户名
    psw_hash = db.Column(db.String(128), nullable=False)  # 密码散列值
    email = db.Column(db.String(30))  # 邮箱 (optional)
    userspace = db.Column(db.String(50), nullable=False, unique=True)  # 用户空间路径

    def set_password(self, password: str):
        """设置密码

        根据用户输入的密码生成密码散列值

        Args:
            password (str): 明文密码
        """
        self.psw_hash = generate_password_hash(password)

    def validate_password(self, password: str) -> bool:
        """验证密码

        判断用户输入的密码是否正确

        Args:
            password (str): 输入的密码

        Returns:
            bool: True - 密码正确; False - 密码错误
        """
        return check_password_hash(self.psw_hash, password)

    def set_email(self, email: str):
        """设置邮箱地址

        Args:
            email (str): 邮箱地址
        """
        self.email = email

    def set_userspace(self, username: str):
        """设置用户空间路径

        采用一定的规则生成不可重复的路径

        """
        def generate_userspace(username: str):
            userspace = username + ''.join(random.sample(
                string.ascii_letters + string.digits,
                30 - len(username)
            ))
            return os.path.join(APP_FILE, userspace)

        self.userspace = generate_userspace(username)
        if not os.path.exists(self.userspace):
            os.mkdir(self.userspace)
