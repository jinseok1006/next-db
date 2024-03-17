// import {}

export default function Dynamic({ params }: { params: {dynamic: string[]} }) {
  console.log(params.dynamic);

  

  return <div>dynamic route</div>;
  // return <div>{params.dynamic}</div>;
}
