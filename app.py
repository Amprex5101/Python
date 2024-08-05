# app.py

from flask import Flask, request, jsonify, render_template
import os
import funciones

app = Flask(__name__)
UPLOAD_DIRECTORY = "uploads/"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

@app.route('/')
def index():
    return render_template('principal.html')

@app.route('/upload', methods=['POST'])
def upload():
    result, status_code = funciones.upload_file(request)
    return jsonify(result), status_code

@app.route('/delete_file', methods=['POST'])
def delete():
    filename = request.form.get('delete_file')
    result, status_code = funciones.delete_file(filename)
    return jsonify(result), status_code

@app.route('/load_files', methods=['GET'])
def load():
    files = funciones.load_files()
    return render_template('load_files.html', files=files)

@app.route('/planes')
def planes():
    return render_template('compra.html')

@app.route('/pagar')
def pagos():
    return render_template('paga.html')

@app.route('/pagar/listo')
def listo():
    return render_template('listo.html')
@app.route('/prueba')
def prueba():
    return render_template('prueba.html')

if __name__ == '__main__':
    app.run(debug=True)
