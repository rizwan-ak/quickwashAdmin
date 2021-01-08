import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function date(val) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() - val);
  return tomorrow.getDate() + " " + monthNames[tomorrow.getMonth()];
}

var data = [
  {
    name: date(6),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(5),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(4),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(3),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(2),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(1),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
  {
    name: date(0),
    WashAndFold: 0,
    WashAndIron: 0,
    DryClean: 0,
    PremiumWash: 0,
  },
];

var showChart = false;
export default class Charts extends PureComponent {
  getChartData = () => {
    const { orders } = this.props;
    if (orders) {
      orders.filter((o) => {
        data.filter((d) => {
          switch (d.name === o.date && o.category) {
            case "Wash & Fold":
              d.WashAndFold++;
              break;
            case "Wash & Iron":
              d.WashAndIron++;
              break;
            case "Dry Clean":
              d.DryClean++;
              break;
            case "Premium Wash":
              d.PremiumWash++;
              break;
            default:
              break;
          }
        });
      });
      showChart = true;
    }
  };

  render() {
    this.getChartData();

    return (
      showChart && (
        <BarChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="WashAndFold" fill="#8880d8" />
          <Bar dataKey="WashAndIron" fill="#4884d8" />
          <Bar dataKey="DryClean" fill="#82ca9d" />
          <Bar dataKey="PremiumWash" fill="#2000d8" />
        </BarChart>
      )
    );
  }
}
