import pickle
import xgboost as xgb

# Load the model from the .pkl file
with open('XGboost_model_depth_12_lr_0.1_estimators_200_2.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Check if the model is an XGBoost model
if isinstance(model, xgb.Booster):
    booster = model
else:
    # If the model is not a Booster instance, try to get the Booster from the model
    booster = model.get_booster()

# Save the model in the binary format
booster.save_model('XGboost_model_depth_12_lr_0.1_estimators_200_2.bin')