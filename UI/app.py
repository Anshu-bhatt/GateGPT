from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load dataset
df = pd.read_csv("dataset.csv")

@app.route('/api/mcqs', methods=['GET'])
def get_mcqs():
    topic = request.args.get('topic', '')

    # Filter dataset
    filtered_df = df[df['questions__topic'].str.contains(topic, case=False, na=False) & 
                     (df['questions__type'] == 'MCQ')]

    if filtered_df.empty:
        return jsonify({"message": "No MCQs found for this topic."}), 404

    # Convert to list of dictionaries
    mcqs_list = filtered_df.to_dict(orient='records')
    
    return jsonify(mcqs_list)

if __name__ == '__main__':
    app.run(debug=True)
