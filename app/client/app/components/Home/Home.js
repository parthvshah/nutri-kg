import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      globalRankList: [],
      loading: true
    };
  }

  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('user_id');

    var apiPath = '/api/contests/globalRankList';
    axios.get(apiPath, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.data.success) {
          console.log("Error: " + response.data);
          return;
        }
        var data = response.data.globalRankList.userContenderDetails;
        data.sort(function (a, b) {
          return b.rating - a.rating;
        });
        self.setState({
          globalRankList: data,
          loading: false
        });

      })
      .catch(function (error) {
        self.setState({
          loading: false
        })
        console.log('Error: ', error);
      });
  }

  render() {

    const data = this.state.globalRankList;

    const columns =
      [
        {
          Header: "Rank",
          id: "row",
          maxWidth: 65,
          filterable: false,
          Cell: (row) => {
            return <div>{row.index + 1}</div>;
          }
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "USN",
          accessor: "usn",
          maxWidth: 200,
        },
        {
          Header: "Contests",
          accessor: "timesPlayed",
          maxWidth: 100,
        },
        {
          Header: "Rating",
          accessor: "rating",
          maxWidth: 150,
        },
        {
          Header: "Best",
          accessor: "best",
          maxWidth: 150,
        }
      ]

    const staticText = {
      purpose: "This application uses a knowledge graph that recommends a healthy diet or modifications based on a user’s current eating habits. The knowledge graph contains nutritional information about dishes and ingredients. Additionally, it contains information about flavor profiles, regional dishes, cost of ingredients etc. This will help us recommend minor modifications to a user’s current diet within their preferred foods to maximize the chances of follow through. Using a knowledge graph for nutrition and dietetics will enable us to uncover the relationship between different dishes, ingredients and diets.",
      features: "Create a profile by entering some basics such as your dietry goals, height, weight and age. Explore foods in our database with our query feature. Learn food items that are of a similar flavor profile but healthier by just querying! Or, create a meal and let us analyze your meal. Simply add a food items to a meal and hit analyze. We will tell you what food items you can replace with what food items based on your dietry goals. Are you trying to be more energetic? Are you trying to decrease your overall calorie intake? Are you trying to eat a more balanced meal? We got you covered!",
      data: "Our rich database has over 50,000 food items. This covers food items from different brands, of different portions and most importantly, of different categories. This will allow you to explore any type of food you prepare or eat outside. We have made an effort to include data from different regions, cuisines and cultures. Additionally, the flavor profiles we have baked into the reccommender system accommodates over 1,000 different palletes. This ensure we can reccommend healthier alternatives to the food that you are already familiar with and love. We hope you enjoy using our application!"
    }

    return (
      <div>
          <div className="jumbotron pt-3 pb-2 bg-light">
            <div className='text-center display-4 mb-3'>NutriKG</div>
          </div>
          <div style={{display: "flex", justifyContent: "center"}} className="jumbotron pt-3 pb-2 bg-light">
            <img src="../../assets/img/logo2.png"></img>
          </div>
          <div className="masthead-followup row m-0 bg-light mb-4" style={{ "borderRadius": 5 }}>
            <div className="col-12 col-md-4 p-3 p-md-8 border-right">
              <h3 className="text-center">Purpose</h3>
              <p></p><p className="text-justify">{staticText.purpose}</p>
            </div>
            <div className="col-12 col-md-4 p-3 p-md-8 border-right">
            <h3 className="text-center">Features</h3>
              <p></p><p className="text-justify">{staticText.features}</p>
              <p></p>
            </div>
            <div className="col-12 col-md-4 p-3 p-md-">
            <h3 className="text-center">Data</h3>
              <p></p><p className="text-justify">{staticText.data}</p>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;
