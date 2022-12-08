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
      selectedFoods: [],
      recoFoods: [],
      inMeal: 0,
      meal: [],
      inRecoMeal: 0,
      recoMeal: []
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
    const handleClick = () => {
      var self = this;

      // foods
      self.state.meal.forEach(item => {
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
            if(self.state.selectedFoods.length == 0) {
              self.setState({
                selectedFoods: [data]
              });
            }
            else {
              self.setState({
                selectedFoods: [...self.state.selectedFoods, data]
              });
            }
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
        });

        // recos
        self.state.meal.forEach(item => {
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
              if(self.state.recoFoods.length == 0) {
                self.setState({
                  recoFoods: [data]
                });
              }
              else {
                self.setState({
                  recoFoods: [...self.state.recoFoods, data]
                });
              }
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
          });
    };

    const handleOnSelect = (item) => {
      let self = this;
      console.log(item);
      if(self.state.meal.length == 0) {
        self.setState({
          meal: [{name: item.name}]
        });
      }
      else {
        self.setState({
          meal: [...self.state.meal, {name: item.name}]
        });
      }
    };

    const items = this.state.foods;

    const buttonRender = () => {
      return this.state.meal.map(item => <button key={item.name} type="button" className="btn btn-outline-secondary">{item.name}</button>)
    }

    const foodCardRender = () => {
        if(this.state.selectedFoods.length > 0) {
          return this.state.selectedFoods.map(item => <FoodCard key={item.Name}
                                                                name={item.Name} 
                                                                cohort={item.Cohort} 
                                                                calories={item.Calories} 
                                                                carbohydrate={item.Carbohydrate} 
                                                                fat={item.Fat} 
                                                                protein={item.Protein} 
                                                                sfa={item.Saturated_fatty_acids} 
                                                                sodium={item.Sodium} 
                                                                category={item.Category}  />)
        } else {
          return <div>Select a food from the search bar to add to a meal and then hit analyze.</div>
        }
      
    }

    const recCardRender = () => {
      if(this.state.recoFoods.length > 0) {
        return this.state.recoFoods.map(item => <FoodCard key={item.Name}
                                                          name={item.Name} 
                                                          cohort={item.Cohort} 
                                                          calories={item.Calories} 
                                                          carbohydrate={item.Carbohydrate} 
                                                          fat={item.Fat} 
                                                          protein={item.Protein} 
                                                          sfa={item.Saturated_fatty_acids} 
                                                          sodium={item.Sodium} 
                                                          category={item.Category}  />)
      } else {
        return <div>No recommended foods. Select a food from the search bar to add to a meal.</div>
      }
    
  }

    if (this.state.isLoading)
      return <ReactLoading/>;
    else
      return (
          <div className="jumbotron pt-3 pb-4 bg-light">
            <div className='display-4 mb-3'>Meals</div>
            <p className="lead">Create a meal by adding food items. Let our recommender system provide you with variations of your meal that better align with your fitness goals!</p>
            <p><b>Name: </b>{this.state.name.firstName} {this.state.name.lastName} <br /><b>Fitness Goal: </b>{this.state.basicInfo.fitnessGoals}</p>
            <hr />
            <ReactSearchAutocomplete
              items={items}
              onSelect={handleOnSelect}
              styling={{ zIndex: 4 }} // To display it on top of the search box below
              autoFocus
            />
            <br />
            <p className="lead">Current foods in meal</p>
            <p>
              {buttonRender()} 
            </p>
            <br />
            <button onClick={handleClick} type="button" className="btn btn-primary">Analyze</button>
            <br />
            <hr />
            <div className="row">
              <div className="col-sm">
                <p className="lead">Foods in meal</p>

                {foodCardRender()}     
              </div>
              <div className="col-sm">
                <p className="lead">Recommended replacements</p>

                {recCardRender()}     
              </div>
            </div>
            <hr />
          </div>
      );
  }
}
export default Explore;
