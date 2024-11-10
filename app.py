from flask import Flask, render_template, jsonify
import random
import json
import os

app = Flask(__name__,template_folder='.')

# Ensure the app can find the data files
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/message')
def get_message():
    messages_path = os.path.join(DATA_DIR, 'messages.json')
    try:
        with open(messages_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
        return jsonify({'message': random.choice(messages)})
    except Exception as e:
        app.logger.error(f"Error loading messages: {str(e)}")
        return jsonify({'message': '💝 Error loading message 💝'}), 500

@app.route('/api/date-idea')
def get_date_idea():
    ideas_path = os.path.join(DATA_DIR, 'ideas.json')
    try:
        with open(ideas_path, 'r', encoding='utf-8') as f:
            date_ideas = json.load(f)
        return jsonify({'idea': random.choice(date_ideas)})
    except Exception as e:
        app.logger.error(f"Error loading date ideas: {str(e)}")
        return jsonify({'idea': '⭐ Error loading date idea ⭐'}), 500

if __name__ == '__main__':
    app.run(debug=True)