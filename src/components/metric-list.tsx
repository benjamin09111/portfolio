type Metric = { value: string; label: string; context: string; source: string };

export function MetricList({
  metrics,
  sourceLabel = "Source",
}: {
  metrics: Metric[];
  sourceLabel?: string;
}) {
  if (!metrics.length) return null;
  return (
    <dl className="metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>
            <span className="metric-value">{metric.value}</span>
            <p>
              {metric.context} <a href={metric.source}>{sourceLabel} ↗</a>
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
