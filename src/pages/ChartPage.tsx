import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "./ChartPage.css"; // Import custom CSS

const data = [{ week: "W1", gmDollars: 100, gmPercent: 30 }];

const ChartPage = () => {
  return (
    <div className="chart-container">
      <h2 className="chart-title">GM Dollars Over Weeks</h2>
      <LineChart width={500} height={300} data={data} className="chart">
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="gmDollars" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default ChartPage;
