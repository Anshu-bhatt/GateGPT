import json
import sys

def load_mcq_data(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    return data["gate_exam"]["questions"]

def get_mcqs_by_topic(questions, topic):
    mcqs = []
    for q in questions:
        if topic.lower() in q["topic"].lower() and (q["type"] == "MCQ" or q["type"] == "MSQ"):
            mcqs.append({
                "question_id": q.get("question_id"),
                "question": q["question_text"],
                "options": q.get("options"),
                "correct_answer": q.get("correct_answer"),
                "correct_answers": q.get("correct_answers"),
                "explanation": q.get("explanation", ""),
                "type": q["type"]
            })
    return mcqs

def print_mcqs(mcqs, topic):
    if not mcqs:
        print(f"No MCQs found for topic: {topic}")
        return
    
    print(f"\nFound {len(mcqs)} MCQs on '{topic}':")
    for i, mcq in enumerate(mcqs, 1):
        print(f"\nQuestion {i}: {mcq['question']}")
        if mcq["type"] == "MCQ":
            if mcq["options"]:
                for opt, text in mcq['options'].items():
                    print(f"  {opt}: {text}")
            print(f"Correct Answer: {mcq['correct_answer']}")
        elif mcq["type"] == "MSQ":
            if mcq["options"]:
                for opt, text in mcq['options'].items():
                    print(f"  {opt}: {text}")
            print(f"Correct Answers: {mcq['correct_answers']}")

        if mcq['explanation']:
            print(f"Explanation: {mcq['explanation']}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python mcq_retrieval.py <topic>")
        sys.exit(1)
    
    try:
        questions = load_mcq_data("dataset.json")
        mcqs = get_mcqs_by_topic(questions, sys.argv[1])
        print_mcqs(mcqs, sys.argv[1])
    except FileNotFoundError:
        print("Error: dataset_mcq.json file not found")
    except KeyError as e:
        print(f"Error: Invalid JSON structure - {str(e)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")