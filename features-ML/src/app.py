from flask import Flask, request, jsonify
from flask_cors import CORS
from logger import logging  
from components.obes_prediction import predict

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/obesity', methods=['POST'])
def obesity():
    if request.method == 'POST':
        try:
            req_data = request.get_json()
            data = req_data.get('data')
            prd_data = predict()
            logging.info("Received data: %s", data)  
            return jsonify(data), 200
        except KeyError:
            return jsonify({'error': 'Data key not found in request'}), 400
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == "__main__":
    app.run(debug=True)
