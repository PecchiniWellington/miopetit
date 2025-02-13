const SubCategory = async (props: {
  params: Promise<{ category: string; slug: string }>;
}) => {
  const { category, slug } = await props.params;
  return (
    <div>
      {category} - {slug}
    </div>
  );
};

export default SubCategory;
