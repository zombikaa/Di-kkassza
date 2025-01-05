import { AreaChartComponent } from "@/components/shared/charts/AreaChart";
import { RadialChartComponent } from "@/components/shared/charts/RadialChart";
import { useUserContext } from "@/context/AuthContext";

const Charts = () => {
  const { user } = useUserContext();
  return (
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
           <AreaChartComponent />
          <RadialChartComponent />
          <AreaChartComponent />
        </div>
      </div>
  );
};

export default Charts;
