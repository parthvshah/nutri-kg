import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from '../common/Loading';
import FoodCard from './Assignments/FoodCard';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usn: "",
      name: {},
      contender: {},
      basicInfo: {},
      globalRankList: [],
      foods: [],
      isSelected: false,
      selectedFood: {},
      isReco: false,
      recoFood: {},
      recFoods: []
    };
  }


  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('user_id');

    var apiPath = '/api/contests/' + userID + '/contenderInfo';
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
        var data = response.data.contenderDetails;
        self.setState({
          name: data.name,
          contender: data.contender,
          basicInfo: data.basicInfo
        });

      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status) {
            alert("Session timed out.");
            window.location.href = '/';
          }
        }
      });

    var apiPath = '/api/contests/foods';
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
        var data = response.data.foods;
        self.setState({
          foods: data
        });
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status) {
            alert("Session timed out.");
            window.location.href = '/';
          }
        }
      });

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
        self.setState({ isLoading: false });
        self.setState({
          globalRankList: data
        });

      })
      .catch(function (error) {
        console.log('Error: ', error);
      });
  }

  render() {

    const data = this.state.globalRankList;
  
    const handleOnSelect = (item) => {
      let self = this;
      console.log(item);

      var apiPath = '/api/contests/selectedFood';
      axios.post(apiPath, {name: item.name}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
          if (!response.data.success) {
            console.log("Error: " + response.data);
            return;
          }
          var data = response.data.food;
          self.setState({
            isSelected: true,
            selectedFood: data
          });
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            if (error.response.status) {
              alert("Session timed out.");
              window.location.href = '/';
            }
          }
        });

        var apiPath = '/api/contests/recoFood';
        axios.post(apiPath, { name: item.name, 
                              goal: this.state.basicInfo.fitnessGoals
                            }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
            if (!response.data.success) {
              console.log("Error: " + response.data);
              return;
            }
            var data = response.data.food;
            self.setState({
              isReco: true,
              recoFood: data
            });
          })
          .catch(function (error) {
            console.log(error);
            if (error.response) {
              if (error.response.status) {
                alert("Session timed out.");
                window.location.href = '/';
              }
            }
          });

    };

    const items = this.state.foods;

    const foodCardRender = () => {
        if(this.state.isSelected) {
          return <FoodCard  name={this.state.selectedFood.Name} 
                            cohort={this.state.selectedFood.Cohort} 
                            calories={this.state.selectedFood.Calories} 
                            carbohydrate={this.state.selectedFood.Carbohydrate} 
                            fat={this.state.selectedFood.Fat} 
                            protein={this.state.selectedFood.Protein} 
                            sfa={this.state.selectedFood.Saturated_fatty_acids} 
                            sodium={this.state.selectedFood.Sodium} 
                            category={this.state.selectedFood.Category}  />
        } else {
          return <div>Select a food from the search bar to display more information.</div>
        }
      
    }

    const recCardRender = () => {
      if(this.state.isReco) {
        return <FoodCard  name={this.state.recoFood.Name} 
                          cohort={this.state.recoFood.Cohort} 
                          calories={this.state.recoFood.Calories} 
                          carbohydrate={this.state.recoFood.Carbohydrate} 
                          fat={this.state.recoFood.Fat} 
                          protein={this.state.recoFood.Protein} 
                          sfa={this.state.recoFood.Saturated_fatty_acids} 
                          sodium={this.state.recoFood.Sodium} 
                          category={this.state.recoFood.Category}  />
      } else {
        return <div>No recommended foods. Select a food from the search bar to find recommendations.</div>
      }
    
  }

    if (this.state.isLoading)
      return <ReactLoading/>;
    else
      return (
          <div className="jumbotron pt-3 pb-4 bg-light">
            <div className='display-4 mb-3'>Explore</div>
            <p className="lead">Select a food and learn more about it. Also see other foods that are similar in flavor but more aligned with your goals!</p>
            <p><b>Name: </b>{this.state.name.firstName} {this.state.name.lastName} <br /><b>Fitness Goal: </b>{this.state.basicInfo.fitnessGoals}</p>
            <hr />
            <ReactSearchAutocomplete
              items={items}
              onSelect={handleOnSelect}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
            <br />
            <div className="row">
              <div className="col-sm">
                <p className="lead">Selected food</p>

                {foodCardRender()}     
              </div>
              <div className="col-sm">
                <p className="lead">Recommended food</p>

                {recCardRender()}     
              </div>
            </div>
            <hr />
          </div>
      );
  }
}
export default Explore;
