import React from 'react'
import {Avatar, Card, Label, List, ResourceList, TextStyle} from '@shopify/polaris';

// React component that renders customers table with Polaris
export default class CustomersTable extends React.Component {
  constructor() {
    super();
    this.state = { customers: [] }; // Initial state is empty array
  }

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

  render() {
    return (
      <Card>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          items={this.state.customers}

          renderItem={(item) => {
            // Take what we wan't need from json row
            const {id, url, first_name, last_name, email, quote} = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <ResourceList.Item
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
              >
              <h3>
                <TextStyle variation="strong">{first_name}</TextStyle>
              </h3>
              <div>{quote}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
    );
  }
}
