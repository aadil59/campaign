import React, { Component } from "react";
import CampaignAPI from "./campaignData.json";
import Campaign from "../components/Campaign";
import SearchByName from "../components/SearchByName";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.Onclicksearch = this.Onclicksearch.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    // this.handleChangeDate = this.handleChangeDate.bind(this);
    this.state = {
      campaignsList: [],
      search: "",
      startDate: null,
      endDate: null,
      isSearchActive: false
    };
  }
  // TO RANDER ACTIVE OR INACTIVE STATE BASED ON START END DATE
  validateStatus = (startDateParam, endDateParam) => {
    let dateFrom = new Date(startDateParam);
    let dateTo = new Date(endDateParam);
    let todaysdate = new Date();
    if (todaysdate > dateFrom && todaysdate < dateTo) {
      return true;
    }
    return false;
  };

  // DATEPICKER EVENT HANDLER
  handleChangeDateStart = date => {
    this.setState({
      startDate: date
    });
    if (date === null) {
      this.setState({ campaignsList: CampaignAPI });
    } else {
      if (this.state.endDate !== null && date > this.state.endDate) {
        this.setState({ campaignsList: [] });
      } else {
        this.setState({ campaignsList: CampaignAPI });
      }
    }
  };
  handleChangeDateEnd = date => {
    this.setState({
      endDate: date
    });
    setTimeout(() => {
      this.filterFn(this.state.startDate, date);
      if (date === null) {
        this.setState({ campaignsList: CampaignAPI });
      }
    }, 100);
  };

  // TO RANDER CAMPAIGN BASED ON START END DATE
  filterFn = (startDateParam, endDateParam) => {
    const filterDate = CampaignAPI.filter(item => {
      let dateFrom = new Date(item.startDate);
      let dateTo = new Date(item.endDate);
      let selecedDate_s = new Date(startDateParam);
      let selecedDate_e = new Date(endDateParam);
      let filterdCampaign =
        (selecedDate_s <= dateFrom && selecedDate_e >= dateFrom) ||
        (selecedDate_s <= dateTo && selecedDate_e >= dateTo);
      // console.log(filterdCampaign);
      return filterdCampaign;
    });
    this.setState({
      campaignsList: filterDate
    });
  };

  // RESTRICTION IF THE endDate IS BEFORE THE startDate,
  restriFn = (startDateParam, endDateParam) => {
    if (endDateParam < startDateParam) {
      this.setState({
        campaignsList: null
      });
    }
  };

  // TO SEARCH CAMPAIGN BY NAME
  handleChangeText = e => {
    e.preventDefault();
    this.setState({ search: e.target.value.substr(0, 20) });
  };

  // TO OPEN SEARCH BOX FORM TOGGLE
  Onclicksearch = () => {
    this.setState({
      isSearchActive: !this.state.isSearchActive
    });
  };

  // DEFAULT STATE RANDERING
  componentDidMount = () => {
    const campaignsList = CampaignAPI;
    this.setState({ campaignsList });
  };

  render() {
    const { search, isSearchActive, campaignsList } = this.state;

    // SEARCH BY NAME FILTER STORAGE
    const searchedItem = campaignsList.filter(item => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return (
      <React.Fragment>
        <div className="container">
          <div className="filter-ar d-flex justify-content-between align-items-center">
            <div className="datefilterWrapper">
              <DatePicker
                placeholderText="Select Start date"
                selected={this.state.startDate}
                onSelect={this.handleSelectDate}
                onChange={this.handleChangeDateStart}
              />
              <DatePicker
                placeholderText="Select End date"
                selected={this.state.endDate}
                onSelect={this.handleSelectDate}
                onChange={this.handleChangeDateEnd}
                minDate={new Date(this.state.startDate)}
              />
            </div>
            <SearchByName
              search={search}
              isSearchActive={isSearchActive}
              Onclicksearch={this.Onclicksearch}
              handleChangeText={this.handleChangeText}
            />
          </div>
          <div className="table-wrap mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {searchedItem.map(campaignItem => (
                  <Campaign
                    key={campaignItem.id}
                    campaignItem={campaignItem}
                    statusCurrent={this.validateStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
