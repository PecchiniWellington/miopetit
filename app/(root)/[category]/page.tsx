const MainCategory = async (props: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await props.params;
  return <div>{category}</div>;
};

export default MainCategory;
