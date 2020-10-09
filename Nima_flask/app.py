import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template,request
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/WA_Crash_data.db")

# reflect an existing database into a new model
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




@app.route('/MAP', methods=['GET', 'POST'])
def index_func():
    if request.method == 'POST':
        # do stuff when the form is submitted
        # redirect to end the POST handling
        # the redirect can be to the same route or somewhere else
        return redirect(url_for('index'))
    # show the form, it wasn't submitted
    return render_template('MAP.html')


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

    ]

    # results = db.session.query(*crash)
    session = Session(engine)
    print("%%%%%%%%%%%%%%")

    print(session)
    results = session.query(*crash).filter(Data.YEAR == year).all()
    # results = session.query(*crash).all()

    session.close()


    # print(year)

    Data_json=[]
    smpl_data = {}
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

        # print(smpl_data)
        # print("*********")
        Sampl_data_copy = smpl_data.copy()
        Data_json.append(Sampl_data_copy)
        if (i==100): break
    # print(smpl_data)
    return jsonify(Data_json)



# @app.route("/api/v1.0/stations")
# def stations():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#     results = session.query(Station.station).all()
#     session.close()

#     # Convert list of tuples into normal list
#     ST = list(np.ravel(results))
    
#     return jsonify(ST)

# @app.route("/api/v1.0/tobs")
# def tobs():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#     Data_date=session.query(Measurement.date,Measurement.station,Measurement.tobs)
#     #Finding the start day the for mian query
#     Max_date=dt.datetime.strptime(max(Data_date)[0],'%Y-%m-%d')
#     Last_year=Max_date-dt.timedelta(days=365)
#     Last_year_date=Last_year.strftime('%Y-%m-%d')
#     #Finding the most active station id for main query       
#     Measurement_data2 = session.query(Measurement.station,func.count(Measurement.tobs))\
#                                     .group_by(Measurement.station).all()
#     MAX_row=0
#     MAX_id=""
#     for i in range (0,len(Measurement_data2)-1):
#         if Measurement_data2[i][1] > MAX_row :
#             MAX_row=Measurement_data2[i][1]
#             MAX_id=Measurement_data2[i][0]
#     #Generating the final query : Query the dates and temperature observations of the most active station for the last year of data.
#     results=session.query(Measurement.date,Measurement.tobs)\
#                         .filter(Measurement.date >= Last_year_date)\
#                         .filter(Measurement.station == MAX_id).all()
                            
#     session.close()

#     # Convert list of tuples into normal list
#     TOBS = list(np.ravel(results))
    
#     return jsonify(TOBS)

    
    
    
# @app.route("/api/v1.0/<start>")
# def Start_day(start):
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     #Generating the final query: TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.
#     results=session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#         filter(Measurement.date >= start).all()
#     session.close()

#     TOBS_ST = list(np.ravel(results))
    
#     return jsonify(TOBS_ST)
    
    
# @app.route("/api/v1.0/<start>/<end>")
# def Start_End_day(start,end):
#         # Create our session (link) from Python to the DB
#     session = Session(engine)
    
#     #Generating the final query: TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.

    # results=session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
    #     filter(Measurement.date >= start).filter(Measurement.date <= end).all()
    # session.close()

 
#     TOBS_ST = list(np.ravel(results))
#     return jsonify(TOBS_ST)
    
     
    
if __name__ == '__main__':
    app.run(debug=True)
