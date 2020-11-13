import os


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from tensorflow import keras

from flask import Flask, jsonify, render_template,request
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/WA_Crash_data.db")

# reflect an existing database into a new modelco
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Data = Base.classes.CrashData
# Station=Base.classes.station
print("********************")
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config['JSON_SORT_KEYS']= False



#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")




@app.route('/plan_landing_page.html', methods=['GET', 'POST'])
def index_func():
    if request.method == 'POST':
        # do stuff when the form is submitted
        # redirect to end the POST handling
        # the redirect can be to the same route or somewhere else
        return redirect(url_for('index'))
    # show the form, it wasn't submitted
    return render_template('plan_landing_page.html')


# @app.route("/crash")
# def crash():


@app.route("/crash/<year>")
def crash(year):

   
    print("********************")
    print(Data)

    """Return the MetaData for a given sample."""
    crash = [
        Data.ACC_ID,
        Data.ROAD_NO,
        Data.CWAY,
        Data.COMMON_ROAD_NAME,
        Data.LONGITUDE,
        Data.LATITUDE,
        Data.ACCIDENT_TYPE,
        Data.EVENT_NATURE,
        Data.EVENT_TYPE,
        Data.TOTAL_BIKE_INVOLVED,
        Data.TOTAL_TRUCK_INVOLVED,
        Data.TOTAL_HEAVY_TRUCK_INVOLVED,
        Data.TOTAL_MOTOR_CYCLE_INVOLVED,
        Data.TOTAL_OTHER_VEHICLES_INVOLVED,
        Data.TOTAL_PEDESTRIANS_INVOLVED,
        Data.CRASH_TIME_HRS,
        Data.YEAR,
        Data.MONTH,
        Data.SEVERITY,
        Data.CRASH_DAYWEEK,
        Data.CRASH_TIMEDAY,
        Data.CRASH_DATE
        

    ]

    # results = db.session.query(*crash)
    session = Session(engine)
    print("%%%%%%%%%%%%%%")

    
    results = session.query(*crash).filter(Data.YEAR == year).all()
    # results = session.query(*crash).all()

    session.close()
    print(results[1])   

    # print(year)

    Data_json=[]
    i=0
    for result in results:
        smpl_data = {}

        i=i+1
        smpl_data["ACC_ID"] = result[0]
        smpl_data["ROAD_NO"] = result[1]
        smpl_data["CWAY"] = result[2]
        smpl_data["COMMON_ROAD_NAME"] = result[3]
        smpl_data["LONGITUDE"] = result[4]
        smpl_data["LATITUDE"] = result[5]
        smpl_data["ACCIDENT_TYPE"] = result[6]
        smpl_data["EVENT_NATURE"] = result[7]
        smpl_data["EVENT_TYPE"] = result[8]
        smpl_data["TOTAL_BIKE_INVOLVED"] = result[9]
        smpl_data["TOTAL_TRUCK_INVOLVED"] = result[10]
        smpl_data["TOTAL_HEAVY_TRUCK_INVOLVED"] = result[11]
        smpl_data["TOTAL_MOTOR_CYCLE_INVOLVED"] = result[12]
        smpl_data["TOTAL_OTHER_VEHICLES_INVOLVED"] = result[13]
        smpl_data["TOTAL_PEDESTRIANS_INVOLVED"] = result[14]
        smpl_data["CRASH_TIME_HRS"] = result[15]
        smpl_data["YEAR"] = result[16]
        smpl_data["MONTH"] = result[17]
        smpl_data["SEVERITY"]=result[18]
        smpl_data["CRASH_DAYWEEK"] = result[19]
        smpl_data["CRASH_TIMEDAY"] = result[20]
        smpl_data["CRASH_DATE"]= result[21]
        # print(smpl_data)
        # print("*********")
        Sampl_data_copy = smpl_data.copy()
        Data_json.append(Sampl_data_copy)
        # if (i==1000): break
    # print(smpl_data)
    return jsonify(Data_json)



@app.route("/api/<H>/<D>/<Y>")
def prediction(Y,D,H):
    Accident_model = keras.models.load_model("static/ml_model/N_model_trained.h5")
    # Create our session (link) from Python to the DB
    Data_json=[]
    y=int(Y)
    d=int(D)
    h=int(H)
    for i in range (-2 ,3):
        Data_predictions={}
        Data_predictions["Prediction"]={}
        Time=[[h+i,d,y]]
        Data_predictions["Prediction"]["H"]=h+i
        Data_predictions["D"]=d
        Data_predictions["Y"]=y
        Data_predictions["Prediction"]["Pr"] = int(Accident_model.predict_classes(Time)[0])
        Data_json.append(Data_predictions)
    # Convert list of tuples into normal list
    # ST = list(np.ravel(Data_json))
    return jsonify(Data_json)

    
if __name__ == '__main__':
    app.run(debug=True)
