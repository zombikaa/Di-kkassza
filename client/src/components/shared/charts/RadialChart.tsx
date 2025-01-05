import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [{ month: "january", Ösztöndíj: 8000, Kereset: 250000, Zsebpénz: 25000 }]

const chartConfig = {
    Ösztöndíj: {
    label: "Ösztöndíj",
    color: "hsl(var(--chart-1))",
  },
  Kereset: {
    label: "Kereset",
    color: "hsl(var(--chart-2))",
  },
  Zsebpénz: {
    label: "Zsebpénz",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function RadialChartComponent() {
  const totalVisitors = chartData[0].Ösztöndíj + chartData[0].Kereset + chartData[0].Zsebpénz

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Egyenleged felosztása</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className=" fill-secondarycolor text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Ft
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Ösztöndíj"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-Ösztöndíj)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Kereset"
              fill="var(--color-Kereset)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Zsebpénz"
              fill="var(--color-Zsebpénz)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
              />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
