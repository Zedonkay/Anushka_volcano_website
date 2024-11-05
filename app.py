from flask import Flask, render_template, jsonify
import random
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/message')
def get_message():
    with open('data/messages.json', 'r') as f:
        messages = json.load(f)
    return jsonify({'message': random.choice(messages)})

@app.route('/api/date-idea')
def get_date_idea():
    with open('data/ideas.json', 'r') as f:
        date_ideas = json.load(f)
    return jsonify({'idea': random.choice(date_ideas)})

if __name__ == '__main__':
    app.run(debug=True)