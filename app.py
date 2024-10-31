from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

MESSAGES = [
    "You make my heart erupt with joy! 💝",
    "I lava you more each day! 🌋",
    "Our love is volcanic! ❤️",
    "You light up my world like magma! ✨"
]

DATE_IDEAS = [
    "Dinner Under the Stars ⭐",
    "Virtual Stargazing Date 🔭",
    "Cooking Together Online 👩‍🍳",
    "Watch a Sunset Livestream 🌅"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/message')
def get_message():
    return jsonify({'message': random.choice(MESSAGES)})

@app.route('/api/date-idea')
def get_date_idea():
    return jsonify({'idea': random.choice(DATE_IDEAS)})

if __name__ == '__main__':
    app.run(debug=True)
