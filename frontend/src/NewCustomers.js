import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const NewCustomers = () => {
    const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/new-customers')
            .then(response => setCustomersData(response.data))
            .catch(error => console.error(error));
    }, []);

    const data = {
        labels: customersData.map(customer => customer._id),
        datasets: [
            {
                label: 'New Customers',
                data: customersData.map(customer => customer.newCustomers),
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default NewCustomers;
