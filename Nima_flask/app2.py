import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/WA_Crash_data.db"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Data = Base.classes.CrashData
print("********************")
print(Data)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# @app.route("/crash")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


@app.route("/crash")
def crashdata():
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
    ]

    results = db.session.query(Data.ACC_ID).all()

    # Create a dictionary entry for each row of metadata information
    smpl_data = {}
    for result in results:
        smpl_data["ACC_ID"] = result[0]
        smpl_data["ROAD_NO"] = result[1]
        smpl_data["CWAY"] = result[2]
        smpl_data["COMMON_ROAD_NAME"] = result[3]
        smpl_data["LONGITUDE"] = result[4]
        smpl_data["LATITUDE"] = result[5]
        smpl_data["ACCIDENT_TYPE"] = result[6]
        smpl_data["EVENT_NATURE"] = result[7]
    print(smpl_data)
    return jsonify(smpl_data)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
