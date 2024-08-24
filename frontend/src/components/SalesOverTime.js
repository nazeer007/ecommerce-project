import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesOverTime = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/sales/total-sales-over-time')
            .then(response => setSalesData(response.data))
            .catch(error => console.error('Error fetching sales data:', error));
    }, []);

    const data = {
        labels: salesData.map(sale => `${sale._id.year}-${sale._id.month}-${sale._id.day}`),
        datasets: [
            {
                label: 'Total Sales',
                data: salesData.map(sale => sale.totalSales),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default SalesOverTime;
