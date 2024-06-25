from flask import Flask, session, request
from flask_babel import Babel
from flask_session import Session
import os


def get_locale():
    session['language'] = request.accept_languages.best_match(['ru', 'en'])
    # session['lang'] = 'ru'
    return session.get('language', 'ru')


website = Flask(__name__)
# configure secret key for sessions
website.secret_key = 'H*&g*G*G8yGy8g87g87g8yG8^&TG7tyf7G0JUG5e6%F%^er8yuh0j'
# configure default localization
# website.config['BABEL_DEFAULT_LOCALE'] = 'ru'
# website.config["SESSION_PERMANENT"] = False
# website.config["SESSION_TYPE"] = "filesystem"
# Session(website)
# Babel(website, locale_selector=get_locale)  # create babel extension
# db = SQLAlchemy(website)  # create sql alchemy extension


# @website.context_processor
# def inject_get_locale():
#     return dict(get_locale=get_locale)