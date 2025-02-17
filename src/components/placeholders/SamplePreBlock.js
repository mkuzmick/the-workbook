const SamplePreBlock = () => {
    const chartColors = {
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))',
      },
    };
    return (
      <div className="relative bg-black/30 z-30 backdrop-blur-xl">
        <pre>{JSON.stringify(chartColors, null, 4)}</pre>;
      </div>
    )
  }

export default SamplePreBlock;