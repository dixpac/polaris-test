import React from 'react'
import {Avatar, Card, List, ResourceList, FilterType, Select, TextField, TextStyle} from '@shopify/polaris';

// React component that renders customers table with Polaris
export default class CustomersTable extends React.Component {
  state = {
    customers: [],
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
  };

  // When component mounts this event is called, where we call rails api and set
  // customers to json result. React automatically re-renders when state is
  // changed on line 18
  componentDidMount() {
    fetch('http://localhost:3000/customers.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => console.log('error', error));
  }

  handleSearchChange = (searchValue) => {
    this.setState({searchValue});
  };

  handleFiltersChange = (appliedFilters) => {
    this.setState({appliedFilters});
  };

  renderItem = (item) => {
    const {id, url, first_name, last_name, email, quote} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3>
          <TextStyle variation="strong">{first_name}</TextStyle>
        </h3>
        <div>{quote}</div>
      </ResourceList.Item>
    );
  };


  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const filters = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ];

    const filterControl = (
      <ResourceList.FilterControl
        filters={filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        additionalAction={{
          content: 'Save',
            onAction: () => console.log('New filter saved'),
        }}
      />
    );

    const items = this.state.customers;

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          filterControl={filterControl}
        />
      </Card>
    );
  }
}
