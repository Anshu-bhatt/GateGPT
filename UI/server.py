from flask import Flask, request, jsonify
from flask_cors import CORS
import mcq

app = Flask(__name__)
CORS(app)

@app.route('/api/mcqs')
def get_mcqs():
    topic = request.args.get('topic', '')
    if not topic:
        return jsonify({'message': 'Please provide a topic'}), 400
    
    try:
        # Get MCQs from mcq.py
        mcqs = mcq.get_mcqs_for_topic(topic)
        if not mcqs:
            return jsonify({'message': f'No questions found for topic: {topic}'}), 404
        return jsonify(mcqs)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 