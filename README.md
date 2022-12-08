# Nutri-KG

## Objective

Build a Nutritional Knowledge Graph (Nutri-KG) to marginally change dietary options by providing smart recommendations in terms of nutrition and flavor. Nutri-KG will allow us to find combinations of food that share similar flavors and identify relationships with their nutritional information, thereby enabling the user to make incremental health choices.

## Organization

- `analysis` - This folder contains the Python code used to glean the data for our analysis on baby food and chips. It also contains the visualizations. 
- `app` - This folder contains the app or application. This is built using the MERN (MongoDB, Express.js, React.js and Node.js) stack. Follow instructions in the README to setup. 
- `clustering` - This folder contains Python code to assign cohorts to the different foods entities in our KG. Uses K-Means clustering.
- `data` - Contains the raw data from scraping, Python scripts to block and entity link. Additionally, this folder contains Python scripts used to create the KG.
- `scraping` - This folder contains Pytho scripts used to scrape our 2 data sources. Selenium was used to achieve the same.
- `service` - This folder contains the Flask application that serves the KG. It exposes endpoints that allow the app to query the KG for reccomendations.
- `resources` - This folder contains the final report, final presentation and the project proposal for Nutri-KG.


A demo of the application can be found on [YouTube](https://www.youtube.com/watch?v=ZyLWSz4kf_c).

## Credits

Niranjan Navaneethan and Parth Shah at The University of Southern California, Los Angeles in 2022. This repository contains all the code for the course project of DSCI 558 - Building Knowledge Graphs. Fall 2022.
