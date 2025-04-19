
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import mysql.connector
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend domain for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model input schema
class PersonalityRequest(BaseModel):
    answers: list

# Load and prepare data once when server starts
conn = mysql.connector.connect(
    host="localhost", user="root", password="IceCream39", database="pathfinder"
)
cs = conn.cursor()
cs.execute("SELECT * FROM data_")
data = cs.fetchall()

columns = ["code", "Strand"] + [f"Q{i}" for i in range(1, 49)]
df = pd.DataFrame(data, columns=columns)

label_encoder = LabelEncoder()
df["code"] = label_encoder.fit_transform(df["code"])

x = df.drop(columns=["code", "Strand"])
y = df["code"]

scaler = StandardScaler()
X = scaler.fit_transform(x)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

svm_model = SVC(kernel="rbf", C=1.0, gamma="scale", probability=True)
svm_model.fit(X_train, y_train)

knn_model = KNeighborsClassifier(n_neighbors=4, metric='euclidean')
knn_model.fit(X_train, y_train)

svm_accuracy = accuracy_score(y_test, svm_model.predict(X_test))

@app.post("/predict")
def predict_personality(request: PersonalityRequest):
    try:
        input_data = pd.DataFrame([request.answers], columns=x.columns)
        input_scaled = scaler.transform(input_data)

        svm_prediction = svm_model.predict(input_scaled)
        svm_label = label_encoder.inverse_transform(svm_prediction)[0]

        distances, indices = knn_model.kneighbors(input_scaled)

        recommended_programs = []
        confidence_scores = []

        for i in range(4):
            index = indices[0][i]
            label = label_encoder.inverse_transform([y_train.iloc[index]])[0]
            confidence = (1 / (1 + distances[0][i])) * 100
            recommended_programs.append(label)
            confidence_scores.append(confidence)

        if svm_label in recommended_programs:
            final_confidence = np.mean(confidence_scores) * (1 + svm_accuracy)
            final_program = svm_label
        else:
            final_confidence = np.mean(confidence_scores) * (1 - svm_accuracy)
            final_program = recommended_programs[0]

        final_confidence = min(final_confidence, 100)

        return {
            "recommendation": final_program,
            "confidence": round(final_confidence, 2)
        }

    except Exception as e:
        return {"error": str(e)}
