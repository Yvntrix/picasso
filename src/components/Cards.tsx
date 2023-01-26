import Card from "./Card";

interface Props {
  data: any;
  title: string;
}
const Cards = ({ data, title }: Props) => {
  if (data?.length > 0) {
    return data.map((post: any) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-emerald-500 text-xl uppercase">
      {title}
    </h2>
  );
};

export default Cards;
