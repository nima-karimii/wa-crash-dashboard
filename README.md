
# Project proposal

### Project name: WA Crash Dashboard

### Topic and rationale

Road crashes are a leading cause of death and serious injury in Western Australia, impacting thousands of people every year both. The State Government's road safety strategy *Towards Zero: Getting there together 2008-2020*, aims to improve road safety through activities relating to road use, road conditions, speed and vehicle safety. The strategy targets a 40% reduction in the average number of people killed or seriously injured in WA per year (compared to 2005 and 2007), representing 11,000 individuals. While the overall fatality rate per year in WA has reduced over this time period, it remains relatively high compared to the rest of the country. 

This project will produce an interactive dashboard exploring road crash data in Western Australia from the last five years. The aim of the dashboard is to highlight road safety issues and trends, including where and when road crashes occur in WA, the impact of speed limits, and other factors that affect road safety/crash severity, such as vehicle type and weather. By visually exploring the data, we hope to highlight problem areas  and opportunities to further reduce road trauma.

The dashboard will contain the following elements:

 -   A map visualisation with multiple layers, including markers and a heatmap representing crash location and datetime data
    
 -   Dynamic scatter plot using D3.js showing the relationship between speed limit and casualties
    
 -   Bar chart representation of crash data broken down by vehicle type
    
### Source data
1 . [Australia & New Zealand Road Crash Dataset](https://www.kaggle.com/mgray39/australia-new-zealand-road-crash-dataset): Combined Open Datasets for Australian and New Zealand Road Crash Jurisdictions: 
 - GitHub repository: https://github.com/mgray39/anz-crash
 - ER diagram:  
 
![](https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F1123609%2F94a3d94058f8d7f3612065d96600c459%2Fschema_v6.png?generation=1581712969025960&alt=media)


2 . [WA Suburb/Locality Boundaries - PSMA Administrative Boundaries GeoJSON](https://data.gov.au/dataset/ds-dga-6a0ec945-c880-4882-8a81-4dbcb85e74e5/distribution/dist-dga-41ecb706-30cf-406d-8314-6ed6baec696b/details?q=suburbs%20western%20australia)


### Inspiration


| [Feature map of Perth primary schools and ratings](https://bettereducation.com.au/forum/yaf_postsm9339findunread_Feature-map-and-heat-map---Top-WA---Perth-primary-school-ratings.aspx)![feature-map](https://bettereducation.com.au/Images/school_performance_maps/feature_map/wa/Feature%20Map%20-%20WA-Perth%20Top%20Primary%20Schools%20Ratings.JPG) |[Heatmap of best Perth primary schools](https://bettereducation.com.au/forum/yaf_postsm9339findunread_Feature-map-and-heat-map---Top-WA---Perth-primary-school-ratings.aspx)![heatmap](https://bettereducation.com.au/Images/school_performance_maps/heatmap/wa/Heatmap%20WA-Perth%20Top%20Primary%20Schools.JPG)  |
|--|--|
**[Western Australia School Local Intake Area (Catchment) Map](https://www.schoolcatchment.com.au/?page_id=1148)**![catchments](https://www.schoolcatchment.com.au/wp-content/uploads/2016/05/Perth-Primary-School-School-Zone-Catchment-Map-1.jpg)   | **d3.js challenge**![](https://lh3.googleusercontent.com/xeTuCuWRgmhAhSIronF7D8dSiRpvDKzhOFVe7h9PQUbfV10aE66MRD22D9hdHTFgmns9lQ3LNg7VBCCpLX0eStAVRTs76L5DF7BV9_cQNO18jle8dVQqhmEbglK7x0hJekenyiB8) 

**[NSW Centre for Road Safety - Interactive crash statistics](https://roadsafety.transport.nsw.gov.au/statistics/interactivecrashstats/index.html)** 
This website contains a multi-tab visualisation dashboard.


### Sketch of final design

![enter image description here](https://github.com/abbyabridged/wa-crash-dashboard/blob/master/images/viz%20sketch2.jpg?raw=true)

 #### Sources
  
 - RAC (Oct 2019). *WA road fatalities: How WA compares against the nation*. https://rac.com.au/car-motoring/info/state_wa-fatalities
 - Road Safety Commission (2009). *Road Safety Strategy To Reduce Road Trauma in Western Australia 2008-2020.* https://www.rsc.wa.gov.au/About/Role-of-the-Commission/Towards-Zero-Strategy

> Written with [StackEdit](https://stackedit.io/).
