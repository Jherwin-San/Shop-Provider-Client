import ViewActiveProducts from "../component/ViewActiveProducts";

export default function Products({ darkMode }) {
  return (
    <div className=" bg-nahida-300 dark:bg-shogun-300 ">
      <ViewActiveProducts darkMode={darkMode} />
    </div>
  );
}
