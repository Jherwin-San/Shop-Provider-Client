export default function ProductCard({
  imgURL,
  changeBigCardImage,
  bigCardImg,
}) {
  const handleClick = () => {
    if (bigCardImg !== imgURL.big) {
      changeBigCardImage(imgURL.big);
    }
  };

  return (
    <div
      className={` rounded-xl ${
        bigCardImg == imgURL.big
          ? " border-nahida-accentA md:border-4 border-2 dark:border-yellow-700 "
          : "border-transparent opacity-60"
      } cursor-pointer md:mx-2`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover  lg:w-[6rem] lg:h-[6rem] md:w-[4rem] md:h-[4rem]  w-[2rem] h-[2rem] rounded-lg">
        <img
          src={imgURL.thumbnail}
          //   width={127}
          //   height={103.34}
          className="object-cover lg:w-[6rem] lg:h-[6rem] md:w-[4rem] md:h-[4rem]  w-[2rem] h-[2rem] rounded-lg"
        />
      </div>
    </div>
  );
}
