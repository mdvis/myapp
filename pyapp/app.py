#! /usr/bin/env python3
# -*- coding: utf-8 -*-
'''date: 2021-07-06
'''

import os

from flask import (Flask, abort, flash, make_response, redirect,
                   render_template, request, session, url_for)
from markupsafe import escape
from werkzeug.utils import secure_filename

from flaskr import create_app

# app = Flask(__name__)
app = create_app()
app.secret_key = os.urandom(16)


@app.route('/')
@app.route('/index')
def main():
    '''main'''
    return 'main'


@app.route('/join', methods=['GET', 'POST'])
def join():
    '''join'''
    if request.method == 'POST':
        session['name'] = request.form['name']
        flash('laotie 666')
        return redirect(url_for('user', name=request.form['name']))
    return '''
        <form method="post">
            <p><input type=text name=name>
            <p><input type=submit value=Login>
        </form>
    '''


@app.route('/user/<name>')
def user(name):
    '''user'''
    if 'name' in session:
        return render_template('user.xml', name=session['name'])
    return name + 'no login!'


@app.route("/es/<path:name>")
def esc(name):
    '''escape'''
    return f"Hello, {escape(name)}! \r\n\t" + \
        f"{url_for('main')} \r\n\t" + \
        f"{url_for('main', oth='oth')} \r\n\t" + \
        f"{url_for('user', name='mage')} \r\n\t" + \
        f"{url_for('user', name='mage', daye='mage')}"


@app.route('/tpl/')
@app.route('/tpl/<name>')
def tpl(name=None):
    '''
    tpl
    '''
    return render_template('tpl.xml', name=name)


@app.route('/login', methods=['GET', 'POST'])
def login():
    '''
    login
    '''
    print(request.method)

    if request.method == 'POST':
        print(request.form)
        return request.form
    print(request.args)
    return 'ok'


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    '''
    upload
    '''
    if request.method == 'POST':
        file = request.files['the_file']
        file.save(f'./uploads/{secure_filename(file.filename)}')
        return 'ok'
    return 'no ok'


@app.route('/ck', methods=['GET', 'POST'])
def c_k():
    '''ck'''
    username = request.cookies.get('laotie')
    resp = make_response(username or 'no ok')
    resp.set_cookie('laotie', '666')
    return resp


@app.route('/444')
def r_e():
    '''re'''
    abort(401)
    # return redirect(url_for('c_k'))
