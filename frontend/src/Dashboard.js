import React from 'react';
import SalesOverTime from './components/SalesOverTime';
import NewCustomers from './NewCustomers';

const Dashboard = () => {
    return (
        <div>
            <h1>Sales and Customer Analytics</h1>
            <SalesOverTime />
            <NewCustomers />
            {/* Add more components here */}
        </div>
    );
};

export default Dashboard;
