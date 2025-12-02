from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import datetime
import os

app = Flask(__name__, static_folder='.', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json() or {}
    name = data.get('name', 'Anonymous')
    email = data.get('email', '')
    message = data.get('message', '')
    t = datetime.datetime.now().isoformat()

    log_line = f"{t}\t{name}\t{email}\t{message}\n"
    try:
        with open('messages.log', 'a', encoding='utf-8') as f:
            f.write(log_line)
    except Exception as e:
        print("Failed to write messages.log:", e)

    print("Contact:", name, email)
    return jsonify({"message": "Thanks — your message was received."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
