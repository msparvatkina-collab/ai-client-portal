type CardProps = {
  title: string;
  value: string;
};

export default function Card({ title, value }: CardProps) {
  return (
    <div className="h-full rounded-lg border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2">{value}</p>
    </div>
  );
} 