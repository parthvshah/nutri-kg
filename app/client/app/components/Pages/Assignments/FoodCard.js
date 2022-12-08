import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      showUpload: true
    })
  }

  componentDidMount() {
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  render() {
    var total = this.props.carbohydrate + this.props.protein + this.props.fat;
    const nutriData = [
        {title: "Carbohydrate", value: this.props.carbohydrate/total, color: "#D6E4E5"},
        {title: "Protein", value: this.props.protein/total, color: "#497174"},
        {title: "Fat", value: this.props.fat/total, color: "#EB6440"}
    ];

    const content = (
      <div id="FoodCard">
        <div className="card bg-light mx-auto">
          <div className="card-header"><h3><strong> {this.props.name} </strong><button type="button" className="btn btn-outline-primary">{this.props.cohort}</button></h3></div>
          <div className="row card-body text-left">
            <div className="col-sm">
                Calories: {this.props.calories}<br />
                Carbohydrate: {this.props.carbohydrate}<br />
                Fat: {this.props.fat}<br />
                Protein: {this.props.protein}<br />
                Saturated Fatty Acids: {this.props.sfa}<br />
                Sodium: {this.props.sodium}<br />
                Category: {this.props.category}<br />
            </div>
            <div className="col-sm">
                <PieChart data={nutriData} lineWidth={15} paddingAngle={5} />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>{content}</div>

    )
  }
}

export default FoodCard;
