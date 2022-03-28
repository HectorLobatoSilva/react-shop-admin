import { Chart as CharJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

CharJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Chart = ({ chartData }) => {
    return (
        <>
            <Bar
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: "Category",
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: "right",
                    },
                }}
            />
        </>
    );
};
