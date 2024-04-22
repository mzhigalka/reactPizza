import { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="134" r="125" />
    <rect x="1" y="276" rx="10" ry="10" width="270" height="22" />
    <rect x="1" y="316" rx="10" ry="10" width="270" height="88" />
    <rect x="2" y="425" rx="10" ry="10" width="95" height="30" />
    <rect x="116" y="417" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
