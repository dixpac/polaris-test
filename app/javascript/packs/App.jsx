import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {AppProvider} from "@shopify/polaris";
import "@shopify/polaris/styles.scss"
import CustomersTable from "../components/CustomersTable"

// Mount main React and render CustomersTable from component
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<AppProvider><CustomersTable /></AppProvider>, document.getElementById("customers-table"));
})
