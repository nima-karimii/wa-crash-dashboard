import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db/WA_Crash_Data.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Data = Base.classes.Data_crash
# Station=Base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")





@app.route("/crash")
def crash():
   
#    # Create our session (link) from Python to the DB
#     session = Session(engine)
#     results = session.query(Data.crash_id,Data.lat_long,Data.year).all()
#     session.close()

    # Convert list of tuples into normal list
    # PRCP = list(np.ravel(results))
    
    # return jsonify(PRCP)

    """Return the MetaData for a given sample."""
    crash = [
        Data.crash_id,
        Data.lat_long,
        Data.year ,
        Data.month ,
        Data.day_of_week ,
        # Data.day_of_month,
        Data.hour,
    ]

    # results = db.session.query(*crash)
    session = Session(engine)
    results = session.query(*crash)
    session.close()

    PRCP = list(np.ravel(results))
    
    # return jsonify(PRCP)
    # Create a dictionary entry for each row of metadata information
    Data_json=[]
    smpl_data = {}
    for result in results:
        smpl_data["crash_id"] = result[0]
        smpl_data["lat_long"] = result[1]
        smpl_data["year"] = result[2]
        smpl_data["month"] = result[3]
        smpl_data["day_of_week"] = result[4]
        # smpl_data["day_of_month"] = result[5]
        smpl_data["hour"] = result[5]
        Data_json.append(smpl_data)
    print(smpl_data)
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

#     results=session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#         filter(Measurement.date >= start).filter(Measurement.date <= end).all()
#     session.close()

 
#     TOBS_ST = list(np.ravel(results))
#     return jsonify(TOBS_ST)
    
     
    
if __name__ == '__main__':
    app.run(debug=True)
