import requests

def check_status(response):
    if response.status_code == 200:
        return response
    else:
        response.raise_for_status()

def get_all_students():
    url = "http://localhost:8080/api/v1/students"
    try:
        response = requests.get(url)
        response = check_status(response)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    students = get_all_students()
    if students:
        print("Successfully retrieved students:")
        for student in students:
            print(student)
    else:
        print("Failed to retrieve students.")
